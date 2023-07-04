import {
  helixConsultNotesNextClass,
  helixConsultNotesObsNextClass,
} from "../../../../helpers/helixDomIdentifiers";

/**
 * Helper method removing html notes for the given observations from Helix dom
 */
export const removeObsContentFromConsultNotes = (
  observations: fhir3.Observation[],
): void => {
  observations.forEach((obs) => {
    const observationNotes = document.getElementsByClassName(`${obs.id}`);
    while (observationNotes[0]) {
      observationNotes[0].parentNode.removeChild(observationNotes[0]);
    }
  });
  // check if there are any other obs added by next, if not remove container
  const nextHtmlNotesContainer = document.getElementsByClassName(
    helixConsultNotesNextClass,
  );
  const nextObservations = nextHtmlNotesContainer[0].querySelector(
    `.${helixConsultNotesObsNextClass}`,
  );
  if (nextObservations) {
    return;
  }
  nextHtmlNotesContainer[0].remove();
};
