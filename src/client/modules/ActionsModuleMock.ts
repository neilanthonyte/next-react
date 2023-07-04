import { inject, injectable } from "inversify";
import * as uuid from "uuid";

import {
  ActionFulfillment,
  EActionFulfillmentResolution,
} from "next-shared/src/models/ActionFulfillment";
import {
  Action,
  DocumentAction,
  MedicationAction,
} from "next-shared/src/models/Action";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";
import { NotFoundError } from "next-shared/src/helpers/errorTypes";
import { filterActionsByDate } from "next-shared/src/helpers/filterActionsByDate";

import { generateMockAction } from "next-shared/src/mockData/generateMockActions";
import { generateMockActionSummary } from "next-shared/src/mockData/generateMockActionSummary";
import { IRetrieveActionsOptions } from "next-shared/src/types/IRetrieveActionsOptions";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { ISyncMetadata } from "next-shared/src/types/ISyncMetadata";
import { SimpleEventEmitter } from "next-shared/src/lib/SimpleEventEmitter";
import { ICreateActionOptions } from "next-shared/src/types/ICreateActionOptions";

import { IHttpConnection } from "../connections/HttpConnection";
import { IActionsModule, serializeActions } from "../modules/ActionsModule";
import { delay } from "../../helpers/delay";
import { IAuthModule } from "./AuthModule";
import {
  IActionFulfillmentSummary,
  ISummaryDateStringRange,
} from "next-shared/src/types/actionSummary";
import { flatten, random, times } from "lodash";

const filterActionsByOptions = (
  actions: Action[],
  options?: IRetrieveActionsOptions,
) => {
  let filtered = [...actions];
  if (!options?.includeResolved) {
    filtered = filtered.filter((a) => !a.resolvedAt);
  }
  if (options?.typeFilter) {
    filtered = filtered.filter((a) => a.type === options.typeFilter);
  }
  if (options?.date) {
    filtered = filterActionsByDate(filtered, options.date);
  }
  return filtered;
};

type FulfillmentQueue = {
  [key: string]: {
    source: ActionFulfillment;
    update: Promise<ActionFulfillment>;
  };
};

/**
 * A patient connection, as defined by its options. We hold data specifically for this
 * connection.
 */
interface IActionConnectionBase {
  // quickly identify matching connections
  type: string;
  hash: string;
  emitter: SimpleEventEmitter;
}
interface IActionConnectionActions extends IActionConnectionBase {
  type: "actions";
  options?: IRetrieveActionsOptions;
}
interface IActionConnectionSummary extends IActionConnectionBase {
  type: "summary";
  options?: ISummaryDateStringRange;
}

type IActionConnection = IActionConnectionActions | IActionConnectionSummary;

type IActionConnections = { [patientId: string]: IActionConnection[] };

@injectable()
export class ActionsModuleMock implements IActionsModule {
  private fulfillmentsQueue: FulfillmentQueue = {};
  private connections: IActionConnections = {};
  private subjectActions: { [subjectId: string]: Action[] } = {};

  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("AuthModule") private _authModule: IAuthModule,
  ) {
    // HACK the synced action emitter register and emit if not in the list of emit
    // it does not unregister itself on logout
    this._authModule.on("beforeLogout", () => {
      delete this.connections[this._authModule.session.patientId];
    });
  }

  public async retrieveActions(
    subjectId: string,
    options: IRetrieveActionsOptions,
  ): Promise<Action[]> {
    await delay(500);
    return filterActionsByOptions(
      this.subjectActions[subjectId] || [],
      options,
    );
  }

  private assignActionToSubject(action: Action) {
    const { subjectId } = action;

    // do we know this person?
    if (!this.subjectActions[subjectId]) {
      this.subjectActions[subjectId] = [];
    }

    // determine add or update
    if (this.subjectActions[subjectId].find((a) => a.id === action.id)) {
      // replace with the new action
      this.subjectActions[subjectId] = this.subjectActions[subjectId].map((a) =>
        a.id === action.id ? action : a,
      );
    } else {
      // add action
      this.subjectActions[subjectId].push(action);
    }
  }

  private removeAction(action: Action) {
    const { subjectId } = action;
    if (!this.subjectActions[subjectId]) {
      console.error("removing action for unknown patient");
      return;
    }
    this.subjectActions[subjectId] = this.subjectActions[subjectId].filter(
      (a) => a.id !== action.id,
    );
  }

  private emitForSubject(subjectId: string) {
    // HACK emit event picked up by PatientRecordHandler to refetch
    this.connections?.[subjectId]?.map((connection) => {
      // filter down based on the connection settings
      switch (connection.type) {
        case "actions":
          const actions = filterActionsByOptions(
            this.subjectActions[subjectId] || [],
            connection.options,
          );
          connection.emitter.emit(`sync_data`, {
            actions,
          });
          break;
        case "summary":
          // TODO Rolf add in something more useful
          const actionSummary = generateMockActionSummary({
            dateFrom: connection.options?.fromDate,
            dateTo: connection.options?.toDate,
          });
          connection.emitter.emit(`sync_data`, {
            actionSummary,
          });
          break;
      }
    });
  }

  public async createAction(
    action: Action,
    options?: ICreateActionOptions,
  ): Promise<Action> {
    const newAction = cloneModelObject(action);
    newAction.actionId = uuid.v4();
    newAction.createdAt = currentUnixTimestamp();
    newAction.updatedAt = currentUnixTimestamp();
    newAction.activeAt = currentUnixTimestamp();
    newAction.fulfillments = newAction.generateNextFulfillments().map((f) => {
      // pretend this was already created
      f.fulfillmentId = f.uniqueId();
      if (options?.createAsFulfilled) {
        f.resolution = EActionFulfillmentResolution.Success;
        f.resolvedAt = currentUnixTimestamp();
      }
      return f;
    });
    if (options?.createAsFulfilled) {
      newAction.concludedAt = currentUnixTimestamp();
      newAction.resolvedAt = currentUnixTimestamp();
    }

    // add to the current action list
    this.assignActionToSubject(newAction);
    this.emitForSubject(action.subjectId);
    return newAction;
  }

  public async updateAction(action: Action): Promise<Action> {
    const existingAction = (this.subjectActions[action.subjectId] || []).find(
      (a) => a.id === action.id,
    );
    if (!existingAction) {
      throw new NotFoundError();
    }
    const newAction = cloneModelObject(action);
    newAction.fulfillments = newAction.generateNextFulfillments();

    this.assignActionToSubject(newAction);
    this.emitForSubject(action.subjectId);

    return newAction;
  }

  public async deleteAction(action: Action): Promise<void> {
    this.removeAction(action);
    this.emitForSubject(action.subjectId);
  }

  public async updateActionFulfillment(
    fulfillment: ActionFulfillment,
  ): Promise<ActionFulfillment> {
    // pretend to update fulfillment and its action
    const existingAction = flatten(Object.values(this.subjectActions)).find(
      (a) => a.id === fulfillment.actionId,
    );
    if (!existingAction) {
      throw new NotFoundError();
    }
    // ensure it belongs to the current action
    if (
      !existingAction.fulfillments.find(
        (f) => f.fulfillmentId === fulfillment.fulfillmentId,
      )
    ) {
      throw new NotFoundError();
    }

    const newAction = cloneModelObject(existingAction);
    const newFulfillment = cloneModelObject(fulfillment);

    // this would typically be set by the server, so we replicate here
    if (newFulfillment.resolution && !newFulfillment.resolvedAt) {
      newFulfillment.resolvedAt = currentUnixTimestamp();
    }
    newAction.fulfillments = newAction.fulfillments.map((f) =>
      f.fulfillmentId === newFulfillment.fulfillmentId ? newFulfillment : f,
    );
    // TODO generate a new fulfillment if periodic
    // this will prevent the logic below treating a periodic task as being complete when the current
    // fulfillments are complete

    // determine if the action is now complete
    const isComplete = newAction.fulfillments.reduce(
      (complete, f) => complete && !!f.resolvedAt,
      true,
    );

    // if (existingAction.getStatus() !== "success" && isComplete) {
    //   newAction.concludedAt = currentUnixTimestamp();
    //   newAction.resolvedAt = currentUnixTimestamp();
    // }

    this.assignActionToSubject(newAction);
    this.emitForSubject(newAction.subjectId);
    return fulfillment;
  }

  public async updateActionFulfillments(
    subjectId: string,
    fulfillments: ActionFulfillment[],
  ): Promise<ActionFulfillment[]> {
    // first filter by subject
    const subjectActions = this.subjectActions?.[subjectId];
    if (!subjectActions) {
      throw new Error("Subject not found");
    }
    const updatedActions = {} as { [actionId: string]: Action };

    fulfillments.map((fulfillment) => {
      const existingAction =
        updatedActions?.[fulfillment.actionId] ||
        subjectActions.find((a) => a.actionId === fulfillment.actionId);
      // update, if there's a matching action
      if (existingAction) {
        const updatedFulfillments = existingAction.fulfillments.map(
          (actionFulfillment) => {
            if (actionFulfillment.fulfillmentId === fulfillment.fulfillmentId) {
              return fulfillment;
            }
            return actionFulfillment;
          },
        );
        const newAction = cloneModelObject(existingAction);
        newAction.fulfillments = updatedFulfillments;
        this.assignActionToSubject(newAction);
      }
    });

    this.emitForSubject(subjectId);
    return fulfillments;
  }

  public async retrieveActionSummary(
    patientId: string,
    options: ISummaryDateStringRange,
  ): Promise<IActionFulfillmentSummary> {
    const mockSummary = generateMockActionSummary({
      dateFrom: options.fromDate,
      dateTo: options.toDate,
    });
    return { ...mockSummary };
  }

  public async createMissingPatientMedicationActions(): Promise<
    MedicationAction[]
  > {
    // not mocked because the endpoint requires calling the EHR for it to be useful
    return [];
  }

  public setAuthToken(token: string) {
    console.warn("mock module - no token required");
  }

  private getEmitter(
    subjectId: string,
    options: IRetrieveActionsOptions | ISummaryDateStringRange,
    type: "actions" | "summary",
  ) {
    let emitter: SimpleEventEmitter = null;

    // for new connections, add some data
    if (!this.subjectActions[subjectId]) {
      // start with a simple set of actions
      this.subjectActions[subjectId] = times(random(1, 3), () =>
        generateMockAction({
          subjectId,
        }),
      );
    }

    // identifier based on all properties
    const hash = JSON.stringify({ subjectId, type, options });

    if (!this.connections[subjectId]) {
      this.connections[subjectId] = [];
    } else {
      // have we received these options before?
      const pastConnection = this.connections[subjectId].find(
        (c) => c.hash === hash,
      );
      if (pastConnection) {
        emitter = pastConnection.emitter;
        console.warn("passing existing emitter");
      } else {
        // need to create another emitter
      }
    }

    if (emitter === null) {
      console.warn(
        `creating emitter ${this.connections[subjectId].length} for ${subjectId}`,
      );
      emitter = new SimpleEventEmitter();

      switch (type) {
        case "actions":
          this.connections[subjectId].push({
            hash,
            type,
            emitter,
            options: options as IRetrieveActionsOptions,
          });
          break;
        case "summary":
          this.connections[subjectId].push({
            hash,
            type,
            emitter,
            options: options as ISummaryDateStringRange,
          });
      }
    }
    return emitter;
  }

  public retrieveSyncedActions(
    subjectId: string,
    options: IRetrieveActionsOptions = {},
  ): ISyncMetadata<{ actions: Action[] }> {
    const emitter: SimpleEventEmitter = this.getEmitter(
      subjectId,
      options,
      "actions",
    );

    // TODO if the client tries to refetch the socket connection, this will cause a loop
    setTimeout(() => {
      this.emitForSubject(subjectId);
    }, 500);

    return {
      endpoint: "actions",
      action: "retrieveSyncedActions",
      parameters: {
        options,
        subjectId,
      },
      unseralizeData: serializeActions,
      emitter,
    };
  }

  public retrieveSyncedActionSummary(
    subjectId: string,
    options?: ISummaryDateStringRange,
  ): ISyncMetadata<{ actionSummary: IActionFulfillmentSummary }> {
    const emitter: SimpleEventEmitter = this.getEmitter(
      subjectId,
      options,
      "summary",
    );

    // TODO if the client tries to refetch the socket connection, this will cause a loop
    setTimeout(() => {
      this.emitForSubject(subjectId);
    }, 500);

    return {
      endpoint: "actionSummary",
      action: "retrieveSyncedActions",
      parameters: {
        subjectId,
        options,
      },
      emitter,
    };
  }

  public async createDocumentAction(
    patientId: string,
    action: DocumentAction,
    options?: ICreateActionOptions,
  ): Promise<DocumentAction> {
    action.subjectId = patientId;
    const newAction = cloneModelObject(action);
    newAction.actionId = uuid.v4();
    newAction.createdAt = currentUnixTimestamp();
    newAction.updatedAt = currentUnixTimestamp();
    newAction.activeAt = currentUnixTimestamp();
    newAction.fulfillments = newAction.generateNextFulfillments().map((f) => {
      // pretend this was already created
      f.fulfillmentId = f.uniqueId();
      if (options?.createAsFulfilled) {
        f.resolution = EActionFulfillmentResolution.Success;
        f.resolvedAt = currentUnixTimestamp();
      }
      return f;
    });
    if (options?.createAsFulfilled) {
      newAction.concludedAt = currentUnixTimestamp();
      newAction.resolvedAt = currentUnixTimestamp();
    }

    // add to the current action list
    this.assignActionToSubject(newAction);
    this.emitForSubject(action.subjectId);
    return newAction;
  }
}
