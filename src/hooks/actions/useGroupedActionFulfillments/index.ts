import { useMemo } from "react";
import moment from "moment";
import * as _ from "lodash";

import { Action } from "next-shared/src/models/Action";
import { ActionFulfillment } from "next-shared/src/models/ActionFulfillment";

import { useActions } from "../useActions";
import { actionFulfillmentDueAtFormat } from "../../../helpers/momentFormats";

export interface IFulfillmentWithAction {
  action: Action;
  fulfillment: ActionFulfillment;
}

export type TGroupedFulfillmentWithAction = Record<
  string,
  IFulfillmentWithAction[]
>;

export interface IGroupedFulfillmentWithAction {
  groupedFulfillments: TGroupedFulfillmentWithAction;
  isLoading: boolean;
  error: Error;
}

interface IGroupedFulfillmentWithActionOptions {
  actionsFilter?: (a: Action) => boolean;
  fulfillmentsFilter?: (f: ActionFulfillment) => boolean;
}

/**
 * Hook getting actions due in the given date and grouping their fulfillments by dueAt
 * e.g. output { "09:00AM": [{ action, fulfillment }, { action, fulfillment }], "07:00PM": [{ action, fulfillment }] }
 */
export const useGroupedActionFulfillments = (
  patientId: string,
  activeDate: string,
  options?: IGroupedFulfillmentWithActionOptions,
): IGroupedFulfillmentWithAction => {
  const { actions, ...rest } = useActions(patientId, {
    includeResolved: true,
    date: activeDate,
  });

  const groupedFulfillments = useMemo(() => {
    if (!actions) return;
    const group: TGroupedFulfillmentWithAction = {};
    const _actions = actions || [];
    const patientActions = options?.actionsFilter
      ? _actions.filter(options.actionsFilter)
      : _actions;
    const _fulfillments = _.flatten(
      patientActions.map((a) =>
        // filter in case we have not valid fulfillment
        a.fulfillments.filter((f) => !!f.dueAt),
      ),
    );
    const fulfillments = options?.fulfillmentsFilter
      ? _fulfillments.filter(options.fulfillmentsFilter)
      : _fulfillments;
    const sortedFulfillments = fulfillments.sort(
      (f1, f2) => f1.dueAt - f2.dueAt,
    );

    sortedFulfillments.forEach((fulfillment) => {
      const action = actions.find((a) => a.actionId === fulfillment.actionId);
      const formattedDueAt = moment
        .unix(fulfillment.dueAt)
        .format(actionFulfillmentDueAtFormat);
      if (group[formattedDueAt]) {
        group[formattedDueAt].push({ action, fulfillment });
        return;
      }
      group[formattedDueAt] = [{ action, fulfillment }];
    });

    return group;
  }, [actions, options]);

  return useMemo(
    () => ({ groupedFulfillments, ...rest }),
    [groupedFulfillments, rest],
  );
};
