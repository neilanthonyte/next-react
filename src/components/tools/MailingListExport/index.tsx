import * as React from "react";
import { Card, CardBody, CardFooter } from "../../structure/Card";
import { Cell, CellHeader, CellDescription } from "../../structure/Cell";
import { BlockButton } from "../../generic/Button";
import { useCallback } from "react";
import { NextClient } from "../../../client/NextClient";
import { useClient } from "../../../hooks/useClient";

/**
 * Given the contents of a csv, this returns the encoding required for the browser to initiate a download.
 */
const getEncodedCSV = (csvContent: string): string => {
  return encodeURI("data:text/csv;charset=utf-8," + csvContent);
};

/**
 * Initiates a file download in the browser.
 */
const downloadCSV = (encodedCSV: string): void => {
  const link = document.createElement("a");
  link.setAttribute("href", encodedCSV);
  link.setAttribute("download", "patients.csv");

  /**
   * See @link https://stackoverflow.com/questions/32225904/programmatical-click-on-a-tag-not-working-in-firefox
   * Essentially firefox does not allow programmatic use of element.click() to being a download.
   * Dispatching a synthetic event like we have below works on chrome, ff, and safari, probs not IE though 🤷🏼‍♂️
   */
  link.dispatchEvent(
    new MouseEvent("click", { bubbles: true, cancelable: true, view: window }),
  );
};

export interface IMailingListExportProps {}

export const MailingListExport: React.FC<IMailingListExportProps> = ({}) => {
  const client = useClient();

  const handleClick = useCallback(async () => {
    const { csv } = await client.patients.retrieveAllPatientsAsCsv();
    downloadCSV(getEncodedCSV(csv));
  }, []);

  return (
    <Card>
      <CardBody>
        <Cell decorationIcon="file">
          <CellHeader>Mailing list</CellHeader>
          <CellDescription>
            Click the export button below to receive a CSV containing patients
            information. This operation may take a few minutes.
          </CellDescription>
        </Cell>
      </CardBody>
      <CardFooter>
        <BlockButton onClick={handleClick}>Export</BlockButton>
      </CardFooter>
    </Card>
  );
};
