import { Selector } from "testcafe";
import { InlineOptionsCtrl } from "./index.ctrl";

fixture("InlineOptions").page("http://localhost:6060/#!/InlineOptions");

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { delay } from "../../../../helpers/delay";

test("Selects option - single", async (t) => {
  const example = Selector(toTestSelector("example-single-input"));
  const inlineOptionsCtrl = new InlineOptionsCtrl(example, t);

  await inlineOptionsCtrl.expectValue(["foo"]);

  await inlineOptionsCtrl.clickOption("wiz");
  await inlineOptionsCtrl.expectValue(["wiz"]);

  await inlineOptionsCtrl.clickOption("bar");
  await inlineOptionsCtrl.expectValue(["bar"]);
});

test("Selects options - multi", async (t) => {
  const example = Selector(toTestSelector("example-multi-input"));
  const inlineOptionsCtrl = new InlineOptionsCtrl(example, t);

  await inlineOptionsCtrl.expectValue(["foo"]);

  await inlineOptionsCtrl.clickOption("wiz");
  await inlineOptionsCtrl.expectValue(["foo", "wiz"]);

  await inlineOptionsCtrl.clickOption("bar");
  await inlineOptionsCtrl.expectValue(["foo", "wiz", "bar"]);

  await inlineOptionsCtrl.clickOption("foo");
  await inlineOptionsCtrl.expectValue(["wiz", "bar"]);
});

test("Can get all available options", async (t) => {
  const example = Selector(toTestSelector("example-single-input"));
  const inlineOptionsCtrl = new InlineOptionsCtrl(example, t);

  const allOptions = await inlineOptionsCtrl.getAllOptions();
  await t.wait(500);
  await t.expect(allOptions).eql(["foo", "bar", "wiz"]);
});
