import * as React from "react";
import { useCallback, useMemo } from "react";
import * as _ from "lodash";

import { PatientLetter } from "next-shared/src/models/PatientLetter";
import { PatientLabResult } from "next-shared/src/models/PatientLabResult";
import { IReleasableData } from "next-shared/src/types/IReleasableData";
import { usePatientActions } from "next-react/src/hooks/actions/usePatientActions";
import { useCreateDocumentAction } from "next-react/src/hooks/actions/useCreateDocumentAction";
import { useRemoveAction } from "next-react/src/hooks/actions/useRemoveAction";

import {
  NextBarContent,
  NextBarContentBody,
  NextBarContentFooter,
} from "../NextBarContent";
import { NextBarReleasableTableRow } from "./components/NextBarReleasableTableRow";
import { usePager } from "../../../hooks/usePager";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
} from "../../structure/Table";
import { useClient } from "../../../hooks/useClient";
import { usePatientLetters } from "../../../hooks/patient/usePatientLetters";
import { usePatientLabResults } from "../../../hooks/patient/usePatientLabResults";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { LoadingBlock } from "../../structure/LoadingBlock";

const PAGE_SIZE = 8;

export interface INextDocumentsTableProps<T extends IReleasableData> {
  results: T[];
  release: (letter: T) => Promise<void>;
  unrelease: (letter: T) => Promise<void>;
}

export const NextDocumentsTable: React.FC<
  INextDocumentsTableProps<IReleasableData>
> = ({ results, release, unrelease }) => {
  const [Pager, pageContent] = usePager(PAGE_SIZE, results || []);
  return (
    <>
      <NextBarContent>
        <NextBarContentBody>
          <Table type="pinStripe" sizing="compact" preset="standard">
            <TableHeader>
              <TableRow>
                <TableHeaderCell width="40%">Name</TableHeaderCell>
                <TableHeaderCell width="20%">Created</TableHeaderCell>
                <TableHeaderCell width="20%">Released at</TableHeaderCell>
                <TableHeaderCell width="10%">Released</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageContent.map((result) => (
                <NextBarReleasableTableRow
                  result={result}
                  key={result.id}
                  onRelease={release}
                  onUnrelease={unrelease}
                />
              ))}
            </TableBody>
          </Table>
        </NextBarContentBody>
        <NextBarContentFooter>
          <Pager />
        </NextBarContentFooter>
      </NextBarContent>
    </>
  );
};

export const NextLettersTable = () => {
  const { nextPatient } = useSyncedSessionData();
  const patientId = nextPatient ? nextPatient.patientId : null;

  // letters will be re-fetched automatically after we have patient synced resources handler
  const { patientLetters, ...patientLettersRest } =
    usePatientLetters(patientId);

  const { documentActions } = usePatientActions(patientId);

  const { createDocumentAction } = useCreateDocumentAction();
  const { removeAction } = useRemoveAction();

  const releaseLetter = async (letter: PatientLetter) => {
    await createDocumentAction({
      patientId,
      authorId: letter.staffMemberId,
      documentSource: letter,
    });
    return;
  };

  const unreleaseLetter = async (letter: PatientLetter) => {
    const matchingAction = documentActions.find((action) => {
      return (
        action.resource.documentId === letter.id.toString() &&
        action.resource.category === "letter"
      );
    });

    if (matchingAction) {
      // delete the matching letter document action
      await removeAction(matchingAction);
      return;
    }
  };

  return (
    <LoadingBlock {...patientLettersRest}>
      {patientLetters && (
        <NextDocumentsTable
          results={_.sortBy(patientLetters, ["date", "letterTemplateName"])}
          release={releaseLetter}
          unrelease={unreleaseLetter}
        />
      )}
    </LoadingBlock>
  );
};

export const NextLabResultsTable: React.FC = () => {
  const client = useClient();
  const { nextPatient } = useSyncedSessionData();

  const patientId = useMemo(
    () => (nextPatient ? nextPatient.patientId : null),
    [nextPatient],
  );

  const {
    refetch: fetchPatientLabResults,
    patientLabResults,
    ...patientLabResultsRest
  } = usePatientLabResults(patientId);

  const releaseLabResult = useCallback(
    async (labResult: PatientLabResult) => {
      await client.patients.releaseLabResult(
        patientId,
        labResult.id,
        labResult.ehrId,
      );
      fetchPatientLabResults();
    },
    [client.patients, patientId, fetchPatientLabResults],
  );

  const unreleaseLabResult = useCallback(
    async (labResult: PatientLabResult) => {
      await client.patients.unreleaseLabResult(
        patientId,
        labResult.id,
        labResult.ehrId,
      );
      fetchPatientLabResults();
    },
    [client.patients, fetchPatientLabResults],
  );

  return (
    <LoadingBlock refetch={fetchPatientLabResults} {...patientLabResultsRest}>
      {patientLabResults && (
        <NextDocumentsTable
          results={patientLabResults}
          release={releaseLabResult}
          unrelease={unreleaseLabResult}
        />
      )}
    </LoadingBlock>
  );
};
