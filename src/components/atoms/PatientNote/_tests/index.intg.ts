import { PatientNoteCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import { data } from "../_example/data";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("PatientNote").page("http://localhost:6060/#!/PatientNote");

test("Test flow 1", async (t: TestController) => {
  const patientNoteCtrl = new PatientNoteCtrl(
    Selector(toTestSelector("component-PatientNote")),
    t,
  );

  await patientNoteCtrl.checkNote(data);
});
