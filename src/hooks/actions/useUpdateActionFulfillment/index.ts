import { useMemo } from "react";
import { useMutation } from "react-query";
import { ActionFulfillment } from "next-shared/src/models/ActionFulfillment";

import { useClient } from "../../useClient";
import { BadRequestError } from "next-shared/src/helpers/errorTypes";

export interface IUpdateActionFulfillmentOptions {
  fulfillment: ActionFulfillment;
  subjectTimezone: string;
}
interface IUseUpdateActionFulfillment {
  updateActionFulfillment: (
    updateOptions: IUpdateActionFulfillmentOptions,
  ) => Promise<ActionFulfillment>;
  isLoading: boolean;
  error: Error;
}

/**
 * Update a pre-existing action fulfillment.
 */
export const useUpdateActionFulfillment = (): IUseUpdateActionFulfillment => {
  const client = useClient();

  const [updateActionFulfillment, { isLoading, error }] = useMutation<
    ActionFulfillment,
    Error,
    IUpdateActionFulfillmentOptions
  >(({ fulfillment, subjectTimezone }: IUpdateActionFulfillmentOptions) => {
    if (!fulfillment.fulfillmentId) {
      throw new BadRequestError(
        "Empty fulfillment is disallowed when doing action fulfillment update",
      );
    }
    // TODO check older logic and consider reinstating the optimistic logic
    return client.actions.updateActionFulfillment(fulfillment, subjectTimezone);
  });

  return useMemo<IUseUpdateActionFulfillment>(
    () => ({
      updateActionFulfillment,
      error,
      isLoading,
    }),
    [updateActionFulfillment, error, isLoading],
  );
};
