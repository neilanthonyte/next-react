import { Selector } from "testcafe";
import { CaptionCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { data } from "../_example/data";

fixture("Caption").page("http://0.0.0.0:6060/#!/Caption");

test("Renders the correct title and description for a simple example", async (t) => {
  const example = Selector(toTestSelector("Caption-simplescenario-test"));
  const caption = new CaptionCtrl(example, t);
  const description = await caption.getDescription();
  const title = await caption.getTitle();
  await t.expect(description).eql(data.simpleExample.description);
  await t.expect(title).eql(data.simpleExample.title);
});

test("Renders nothing in the description when nothing is passed", async (t) => {
  const example = Selector(toTestSelector("Caption-withoutdescription-test"));
  const caption = new CaptionCtrl(example, t);
  const title = await caption.getTitle();
  await t.expect(title).eql(data.simpleExample.title);
  await caption.expectDescription(false);
});
