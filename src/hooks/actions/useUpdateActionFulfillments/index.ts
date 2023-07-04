import { BadRequestError } from "next-shared/src/helpers/errorTypes";
import { ActionFulfillment } from "next-shared/src/models/ActionFulfillment";
import { useMemo } from "react";
import { useMutation } from "react-query";

import { useClient } from "../../useClient";

export interface IUpdateActionFulfillmentsVariables {
  subjectId: string;
  fulfillments: ActionFulfillment[];
  subjectTimezone: string;
}

export interface IUseUpdateActionFulfillments {
  updateActionFulfillments: (
    updateOptions: IUpdateActionFulfillmentsVariables,
  ) => Promise<ActionFulfillment[]>;
  isLoading: boolean;
  error: Error;
}

/**
 * Update pre-existing action fulfillments limit by specific action subject ID
 */
export const useUpdateActionFulfillments = (): IUseUpdateActionFulfillments => {
  const client = useClient();

  const [updateActionFulfillments, { isLoading, error }] = useMutation<
    ActionFulfillment[],
    Error,
    IUpdateActionFulfillmentsVariables
  >(
    ({
      subjectId,
      fulfillments,
      subjectTimezone,
    }: IUpdateActionFulfillmentsVariables) => {
      if (!subjectId) {
        throw new BadRequestError(
          "Update action fulfillments requires subject ID. ",
        );
      }
      if (!fulfillments || fulfillments?.length <= 0) {
        throw new BadRequestError(
          "Empty fulfillments is disallowed when doing action fulfillments update",
        );
      }
      return client.actions.updateActionFulfillments(
        subjectId,
        fulfillments,
        subjectTimezone,
      );
    },
  );

  return useMemo(
    () => ({
      updateActionFulfillments,
      error,
      isLoading,
    }),
    [updateActionFulfillments, error, isLoading],
  );
};
