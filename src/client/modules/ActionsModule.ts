import { inject, injectable } from "inversify";

import {
  Action,
  DocumentAction,
  IAction,
  MedicationAction,
} from "next-shared/src/models/Action";
import {
  ActionFulfillment,
  IActionFulfillment,
} from "next-shared/src/models/ActionFulfillment";
import { IRetrieveActionsOptions } from "next-shared/src/types/IRetrieveActionsOptions";
import { ICreateActionOptions } from "next-shared/src/types/ICreateActionOptions";
import {
  EServiceNames,
  ISyncMetadata,
} from "next-shared/src/types/ISyncMetadata";
import {
  IActionFulfillmentSummary,
  ISummaryDateStringRange,
} from "next-shared/src/types/actionSummary";
import { IMedicationDetails } from "next-shared/src/models/MedicationDetails";
import { IUpdateActionFulfillmentRequest } from "next-shared/src/types/IUpdateActionFulfillmentRequest";
import { IHttpConnection } from "../connections/HttpConnection";

interface IRetrieveSyncedActionsResponse {
  actions?: IAction[];
}

export const serializeActions = (data: IRetrieveSyncedActionsResponse) => {
  if (!data?.actions) {
    console.warn("expected actions");
    return null;
  }
  return {
    actions: data.actions.map((a: IAction) => Action.unserialize(a)),
  };
};

export interface IActionsModule {
  retrieveActions(
    patientId: string,
    options?: IRetrieveActionsOptions,
  ): Promise<Action[]>;
  /**
   *
   */
  retrieveSyncedActions(
    patientId: string,
    options?: IRetrieveActionsOptions,
  ): ISyncMetadata<{ actions: Action[] }>;

  retrieveSyncedActionSummary(
    subjectId: string,
    options?: ISummaryDateStringRange,
  ): ISyncMetadata<{ actionSummary: IActionFulfillmentSummary }>;

  createAction(action: Action, options?: ICreateActionOptions): Promise<Action>;
  updateAction(action: Action): Promise<Action>;
  deleteAction(action: Action): Promise<void>;
  updateActionFulfillment(
    fulfillment: ActionFulfillment,
    subjectTimezone: string,
  ): Promise<ActionFulfillment>;

  /**
   * Update multiple action fulfillments for a single subject
   * @param subjectId - The target subject ID
   * @param fulfillments - fulfillments to update.
   */
  updateActionFulfillments(
    subjectId: string,
    fulfillments: ActionFulfillment[],
    subjectTimezone: string,
  ): Promise<ActionFulfillment[]>;

  retrieveActionSummary(
    patientId: string,
    options: ISummaryDateStringRange,
  ): Promise<IActionFulfillmentSummary>;

  createMissingPatientMedicationActions(
    patientId: string,
  ): Promise<MedicationAction[]>;

  /**
   * Create a document action for the patient if the matching document doesn't already exist.
   */
  createDocumentAction(
    patientId: string,
    action: DocumentAction,
    options?: ICreateActionOptions,
  ): Promise<DocumentAction>;
}

@injectable()
export class ActionsModule implements IActionsModule {
  private authToken: string;

  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrieveActions(
    subjectId: string,
    options?: IRetrieveActionsOptions,
  ): Promise<Action[]> {
    const res = await this._httpConnection.makeRequest({
      url: `actions/subject/${subjectId}`,
      method: "get",
      params: {
        typeFilter: options?.typeFilter,
        // TODO need testing on server side as well, axios should stringify anyway
        includeResolved: options?.includeResolved.toString(),
        date: options?.date,
      },
      ...(!!this.authToken ? { overrideBearerToken: this.authToken } : {}),
    });

    return res.actions.map((x: IAction) => Action.unserialize(x));
  }

  public async createAction(
    action: Action,
    options?: ICreateActionOptions,
  ): Promise<Action> {
    const res = await this._httpConnection.makeRequest({
      url: `actions`,
      method: "post",
      data: { action: action.serialize(), options },
    });
    return Action.unserialize(res.action);
  }

  public async updateAction(action: Action): Promise<Action> {
    const res = await this._httpConnection.makeRequest({
      url: `actions/${action.actionId}`,
      method: "put",
      data: {
        action: action.serialize(),
      },
    });
    return Action.unserialize(res.action);
  }

  public async deleteAction(action: Action): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `actions/patient/${action.subjectId}/${action.actionId}`,
      method: "delete",
    });
  }

  public async updateActionFulfillment(
    fulfillment: ActionFulfillment,
    subjectTimezone: string,
  ): Promise<ActionFulfillment> {
    const data: IUpdateActionFulfillmentRequest = {
      actionFulfillment: fulfillment,
      options: {
        latestSubjectTimezone: subjectTimezone,
      },
    };

    const updateFulfillmentResponse = await this._httpConnection.makeRequest({
      url: `actions/${fulfillment.actionId}/fulfillment/${fulfillment.fulfillmentId}`,
      method: "put",
      data,
    });

    const updatedFulfillment = ActionFulfillment.unserialize(
      updateFulfillmentResponse as IActionFulfillment,
    );
    try {
      updatedFulfillment.validate();
    } catch (e) {
      console.error(e);
      return null;
    }
    return updatedFulfillment;
  }

  public async updateActionFulfillments(
    subjectId: string,
    fulfillments: ActionFulfillment[],
    subjectTimezone: string,
  ): Promise<ActionFulfillment[]> {
    const actionFulfillments = fulfillments.map((fulfillment) =>
      fulfillment.serialize(),
    );
    const updateFulfillmentsResponse = await this._httpConnection.makeRequest({
      url: `actions/subject/${subjectId}/fulfillments`,
      method: "put",
      data: {
        actionFulfillments,
        options: {
          latestSubjectTimezone: subjectTimezone,
        },
      },
    });

    const { actionFulfillments: updatedFulfillments } =
      (updateFulfillmentsResponse || {}) as {
        actionFulfillments: IActionFulfillment[];
      };

    const updatedActionFulfillments = updatedFulfillments.map((fulfillment) => {
      try {
        const actionFulfillment = ActionFulfillment.unserialize(fulfillment);
        actionFulfillment.validate();
        return actionFulfillment;
      } catch (error) {
        console.error(error);
        return null;
      }
    });

    return updatedActionFulfillments;
  }

  public async createMissingPatientMedicationActions(
    patientId: string,
  ): Promise<MedicationAction[]> {
    const medicationActionsResponse = await this._httpConnection.makeRequest({
      url: `actions/patient/${patientId}/medications`,
      method: "post",
    });
    if (!medicationActionsResponse) {
      return null;
    }
    const medicationActions: MedicationAction[] = medicationActionsResponse.map(
      (medicationAction: IAction<IMedicationDetails>) =>
        MedicationAction.unserialize(medicationAction),
    );
    return medicationActions;
  }

  public async retrieveActionSummary(
    patientId: string,
    options: ISummaryDateStringRange,
  ): Promise<IActionFulfillmentSummary> {
    const { fromDate, toDate } = options;
    const res = await this._httpConnection.makeRequest({
      url: `actions/summary/${patientId}`,
      method: "get",
      params: { from: fromDate.toString(), to: toDate.toString() },
    });
    return res.actionSummary;
  }

  public retrieveSyncedActions(
    subjectId: string,
    options?: IRetrieveActionsOptions,
  ): ISyncMetadata<{ actions: Action[] }> {
    return {
      serviceName: EServiceNames.Actions,
      endpoint: "actions",
      action: "retrieveSyncedActions",
      parameters: {
        subjectId,
        options,
      },
      unseralizeData: serializeActions,
    };
  }

  public retrieveSyncedActionSummary(
    subjectId: string,
    options?: ISummaryDateStringRange,
  ): ISyncMetadata<{ actionSummary: IActionFulfillmentSummary }> {
    return {
      serviceName: EServiceNames.Actions,
      endpoint: "actions",
      action: "retrieveSyncedActionSummary",
      parameters: {
        subjectId,
        options,
      },
    };
  }

  public async createDocumentAction(
    patientId: string,
    action: DocumentAction,
    options?: ICreateActionOptions,
  ): Promise<DocumentAction> {
    const res = await this._httpConnection.makeRequest({
      url: `actions/patient/${patientId}/document`,
      method: "post",
      data: {
        action: action.serialize(),
        options,
      },
    });

    return DocumentAction.unserialize(res.action);
  }
}
