import moment from "moment";
import { noteToFormattedStr } from "next-shared/src/helpers/noteToFormattedStr";
import { standardizeNote } from "./standardizeNote";

export const convertObservationsToPlainTextNotes = (
  observations: fhir3.Observation[],
) => {
  const textNotes = observations
    .map((observation) => {
      const observationJson = JSON.parse(observation.component[0].valueString);
      const plainTextNote = noteToFormattedStr(
        standardizeNote(observationJson),
        false,
      );

      const issuedDate = moment(observation.issued);
      const dateStr = issuedDate.format("DD/MM/YYYY @ h:mma");
      return `${plainTextNote}--\nSubmitted ${dateStr}`;
    })
    .join("\n\n");

  return `--- Patient provided content ---\n${textNotes}`;
};
