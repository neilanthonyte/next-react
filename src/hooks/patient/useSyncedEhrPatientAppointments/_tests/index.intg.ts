import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("useSyncedEhrPatientAppointments").page(
  "http://localhost:6060/#/useSyncedEhrPatientAppointments",
);

/**
 * To run:
 *
 * ```
 * PATTERN=./src/hooks/patient/useSyncedEhrPatientAppointments/index.tsx yarn dev
 * yarn testcafe ./src/hooks/patient/useSyncedEhrPatientAppointments/_tests/index.intg.ts
 * ```
 */
test("something happens", async (t) => {
  const selector = Selector(
    toTestSelector("useSyncedEhrPatientAppointments-scenario-standard"),
  );
  const output = selector.find(toTestSelector("output"));
  const reset = selector.find(toTestSelector("reset"));

  // await t.expect(output.innerText).contains("Foo");
  // await t.click(reset);
  // await t.expect(output.innerText).contains("null");
});
