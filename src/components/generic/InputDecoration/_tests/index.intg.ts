import { Selector } from "testcafe";

import { InputDecorationCtrl } from "./index.ctrl";
import { TLayoutDirections } from "next-shared/src/types/layouts";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("InputDecoration").page("http://localhost:6060/#!/InputDecoration");

test("Shows all details", async (t) => {
  const example = Selector(toTestSelector("InputDecoration-scenario-full"));
  const testCtrl = new InputDecorationCtrl(example, t);

  await testCtrl.expectLabel("My input");
  await testCtrl.expectRequired();
  await testCtrl.expectDescription(
    "Some text to describe the purpose of the input",
  );
});

test("Shows minimal details", async (t) => {
  const example = Selector(toTestSelector("InputDecoration-scenario-minimal"));
  const testCtrl = new InputDecorationCtrl(example, t);

  await testCtrl.expectLabel("My input");
  await testCtrl.expectRequired(false);
  await testCtrl.expectNoDescription();
});

test("Displays in the right layout direction.", async (t) => {
  const layouts = Object.keys(TLayoutDirections);

  const example = Selector(
    toTestSelector("InputDecoration-scenario-layoutDirection"),
  );

  for (const layout of layouts) {
    const label = example.find(
      toTestSelector(`label-${(TLayoutDirections as any)[layout]}`),
    ).innerText;
    await t.expect(label).eql(layout);
    const inputDecorationCtrl = new InputDecorationCtrl(
      example.find(
        toTestSelector(
          `input-decoration-${(TLayoutDirections as any)[layout]}`,
        ),
      ),
      t,
    );
    await inputDecorationCtrl.expectLayoutDirection(
      (TLayoutDirections as any)[layout],
    );
  }
});
