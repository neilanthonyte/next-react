import { Selector } from "testcafe";
import { MultiFormCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("MultiForm").page("http://localhost:6060/#/MultiForm");

test("Fill all inputs", async (t) => {
  const example = Selector(toTestSelector("MultiForm-scenario-basic"));
  const multiForm = example.find(toTestSelector("multi-form"));
  const output = example.find(toTestSelector("output"));

  await t.expect(await output.textContent).eql("null");

  const multiFormCtrl = new MultiFormCtrl(multiForm, t);
  await multiFormCtrl.fill(
    {},
    {
      randomFillChance: 1,
    },
  );
  await t.expect(await output.textContent).notEql("null");
});
