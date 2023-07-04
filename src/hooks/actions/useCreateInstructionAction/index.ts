import { useCallback, useMemo } from "react";
import { IAction, InstructionAction } from "next-shared/src/models/Action";
import { IHtmlMessage } from "next-shared/src/models/HtmlMessage";
import { useCreateAction } from "../useCreateAction";
import { currentUnixTimestamp } from "next-react/src/helpers/currentUnixTimestamp";

// TODO - merge with interface with the same name
interface ICreateActionOptions {
  createAsFulfilled?: boolean;
}

interface IUseCreateInstructionActionResult {
  createInstructionAction: (
    actionData: Partial<IAction<IHtmlMessage>>,
    options?: ICreateActionOptions,
  ) => Promise<InstructionAction>;
  isLoading: boolean;
  error: Error | null;
}

/**
 * A useMutation hook that will create an Instruction Action. This hook uses
 * useCreateAction as basis.
 */
export const useCreateInstructionAction = (
  onSuccess?: (data: InstructionAction) => void,
  onError?: (error?: Error) => void,
): IUseCreateInstructionActionResult => {
  const { createAction, isLoading, error } = useCreateAction(
    onSuccess,
    onError,
  );

  const createInstructionAction = useCallback(
    async (
      actionData: Partial<IAction<IHtmlMessage>>,
      options?: ICreateActionOptions,
    ) => {
      const { subjectId, authorId, data } = actionData;

      if (!subjectId || !authorId || !data?.message) {
        throw new Error("Missing required information for InstructionActions");
      }

      const defaultInstruction: IAction<IHtmlMessage> = {
        subjectId,
        authorId,
        ownerId: authorId,
        type: "instruction" as const,
        title: "Note to patient",
        data: {
          message: "",
        },
        occurrences: [
          {
            type: "single",
            time: currentUnixTimestamp(),
          },
        ],
        activeAt: currentUnixTimestamp(),
      };

      const instructionAction = InstructionAction.unserialize({
        ...defaultInstruction,
        ...actionData,
      });

      const response = await createAction({
        action: instructionAction,
        options,
      });
      return response as InstructionAction;
    },
    [createAction],
  );

  return useMemo<IUseCreateInstructionActionResult>(
    () => ({
      createInstructionAction,
      isLoading,
      error,
    }),
    [createInstructionAction, error, isLoading],
  );
};
