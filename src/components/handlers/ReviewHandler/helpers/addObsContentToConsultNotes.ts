import moment from "moment";

import { noteToFormattedStr } from "next-shared/src/helpers/noteToFormattedStr";

import {
  helixConsultNotesBoxId,
  helixConsultNotesNextClass,
  helixConsultNotesObsNextClass,
} from "../../../../helpers/helixDomIdentifiers";

import { standardizeNote } from "../../../../helpers/standardizeNote";

const prefillPrefix = `
<strong>--- Patient provided content - Please edit to save ---</strong>
<br /><br />
`;

/**
 * Helper method formatting observation components into html content and inject it in Helix dom
 */
export const addObsContentToConsultNotes = (
  observations: fhir3.Observation[],
) => {
  const prefillNoteItems: string[] = [];

  observations.forEach((obs) => {
    try {
      const onboardingFormJson = JSON.parse(obs.component[0].valueString);
      let obsHtml = noteToFormattedStr(standardizeNote(onboardingFormJson));

      const issuedDate = moment(obs.issued);
      // this is an old reason for visit, add the date Submitted
      const dateStr = issuedDate.format("DD/MM/YYYY @ h:mma");
      obsHtml = `<div class='${helixConsultNotesObsNextClass} ${obs.id}'>${obsHtml}--<br/>Submitted ${dateStr}<br/><br/></div>`;
      prefillNoteItems.push(obsHtml);
    } catch (e) {
      console.error(e);
      console.warn("Failed to parse transcribe item data");
    }
  });

  // add to helix notes container in UI. We've already checked for its existence
  const notesContainer = document.getElementById(helixConsultNotesBoxId);

  // check if we already have added prefill notes
  const nextHtmlNotesContainer = notesContainer.getElementsByClassName(
    helixConsultNotesNextClass,
  );

  let prefillNoteHtml;

  if (nextHtmlNotesContainer.length === 0) {
    // first items we add to notes, prepare container div with nph class name
    const nextHtmlNotesContainer = document.createElement("div");
    nextHtmlNotesContainer.className = helixConsultNotesNextClass;
    // prepare html and inject in container
    prefillNoteHtml = prefillPrefix + prefillNoteItems.join("<br />");
    nextHtmlNotesContainer.innerHTML = prefillNoteHtml;
    notesContainer.prepend(nextHtmlNotesContainer);
  } else {
    // there is already a nph note container injected, just add notes to existing
    prefillNoteHtml = prefillNoteItems.join("<br />");
    nextHtmlNotesContainer[0].innerHTML =
      nextHtmlNotesContainer[0].innerHTML.concat(prefillNoteHtml);
  }
};
