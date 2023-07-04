import { PatientCardCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import * as examplePatient from "../_example/patient.json";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("PatientCard").page("http://localhost:6060/#!/PatientCard");

test("Test flow 1", async (t: TestController) => {
  const patientCardCtrl = new PatientCardCtrl(
    Selector(toTestSelector("component-PatientCard")),
    t,
  );

  await patientCardCtrl.checkPatient(examplePatient);
});
