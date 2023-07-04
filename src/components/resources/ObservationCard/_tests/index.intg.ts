import { ObservationCardCtrl } from "./index.ctrl";
import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { mockObservationsSmokingNoData } from "next-shared/src/mockData/mockFhirPatientResources";

fixture("ObservationCard").page("http://localhost:6060/#!/ObservationCard");

test("If obs with no readings, the correct cell type and empty message is rendered", async (t: TestController) => {
  const observationCardCtrl = new ObservationCardCtrl(
    Selector(toTestSelector("ObservationCard-scenario-empty")),
    t,
  );
  await observationCardCtrl.checkObservation(mockObservationsSmokingNoData);
});
