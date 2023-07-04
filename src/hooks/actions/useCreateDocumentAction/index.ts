import { useMemo } from "react";
import { useMutation } from "react-query";

import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { Action, DocumentAction } from "next-shared/src/models/Action";
import { IDocumentDetails } from "next-shared/src/models/DocumentDetails";
import { PatientLetter } from "next-shared/src/models/PatientLetter";
import { EEhrKey } from "next-shared/src/types/EEhrKey";

import { useClient } from "../../useClient";

/**
 * Options required to pass to the createDocumentAction function.
 * @param patientId - the patient's ID, this will be used as the action subject ID
 * @param authorId - the action author's ID. Usually the staff member ID
 * @param documentSource - PatientLetter object
 */
interface ICreateDocumentOptions {
  patientId: string;
  authorId: string;
  documentSource: PatientLetter; // TODO - add more type support (i.e. lab) to make this action more flexible.
}

/**
 * Returned by the useCreateDocumentAction hook
 * @param createDocumentAction a function that will create a document.
 * @param isLoading - whether the required information is still loading.
 * @param error - if any error was encountered after the creation
 */
interface IUseCreateDocumentAction {
  createDocumentAction: (options: ICreateDocumentOptions) => Promise<Action>;
  isLoading: boolean;
  error: Error;
}

/**
 * Transform a patient letter into IDocumentDetail
 * (This is the `resource` portion of the DocumentAction )
 * @param letter
 * @returns
 */
const getDocumentDetailFromLetter = (
  letter: PatientLetter,
): IDocumentDetails => {
  return {
    title: letter.name,
    documentId: letter.id.toString(), // TODO - check with Dan and Torben
    category: "letter",
  };
};

/**
 * Transform a PatientLetter into a DocumentAction
 * @param patientId
 * @param authorId
 * @param locationEhrId - EHR ID of a Next Practice Location.
 * @param letter
 * @returns
 */
const getDocumentActionFromLetter = (
  patientId: string,
  authorId: string,
  locationEhrId: string, // Get this info
  letter: PatientLetter,
  documentIdFormat: EEhrKey = EEhrKey.Helix,
): DocumentAction => {
  const documentDetail = getDocumentDetailFromLetter(letter);
  return DocumentAction.unserialize({
    type: "document",
    title: `New ${letter.name} from your provider`,
    occurrences: [
      {
        type: "single",
        time: letter.date,
      },
    ],
    data: documentDetail,
    authorId,
    subjectId: patientId,
    ownerId: patientId,
    externalSource: locationEhrId,
    // this is the Helix document ID format.
    externalId:
      documentIdFormat === EEhrKey.Helix
        ? `letter:${letter.id}`
        : `${letter.id}`,
    createdAt: currentUnixTimestamp(),
    activeAt: currentUnixTimestamp(),
    updatedAt: currentUnixTimestamp(),
  });
};

/**
 * Hook that creates a document action. This action
 * requires a valid location from `useCurrentLocation()`
 */
export const useCreateDocumentAction = (
  documentIdFormat?: EEhrKey,
): IUseCreateDocumentAction => {
  const client = useClient();

  const [createDocumentAction, { isLoading, error }] = useMutation<
    Action,
    Error,
    ICreateDocumentOptions
  >(({ patientId, authorId, documentSource }) => {
    if (!patientId) {
      console.warn("no active patient");
      return;
    }
    if (!authorId) {
      console.warn("expecting an author ID to create an action");
      return;
    }

    const documentAction = getDocumentActionFromLetter(
      patientId,
      authorId,
      documentSource.ehrId,
      documentSource,
      documentIdFormat,
    );

    return client.actions.createDocumentAction(patientId, documentAction, {
      createAsFulfilled: true,
    });
  });

  return useMemo<IUseCreateDocumentAction>(
    () => ({
      createDocumentAction,
      error,
      isLoading,
    }),
    [createDocumentAction, error, isLoading],
  );
};
