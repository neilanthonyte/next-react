import { Selector } from "testcafe";
import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { TitleCtrl } from "./index.ctrl";

fixture("Section / Title").page("http://localhost:6060/#/Title");

test("Displays the text correctly", async (t) => {
  const example = Selector(toTestSelector("Title-basic-scenario"));
  const title = new TitleCtrl(example, t);

  await title.checkContents("Lorem ipsum foo bar baz testing!");
});

test("Applies custom classes", async (t) => {
  const example = Selector(toTestSelector("Title-custom-classnames-scenario"));
  const title = new TitleCtrl(example, t);

  await title.checkClassNameWasApplied("testing-this-applies-no-styling");
});

test("Applies sizing correctly", async (t) => {
  const example = Selector(toTestSelector("Title-sizing-scenario"));

  const titleSize1 = new TitleCtrl(example.find(toTestSelector("size-1")), t);
  await titleSize1.checkSizeIsCorrect(1);

  const titleSize2 = new TitleCtrl(example.find(toTestSelector("size-2")), t);
  await titleSize2.checkSizeIsCorrect(2);

  const titleSize3 = new TitleCtrl(example.find(toTestSelector("size-3")), t);
  await titleSize3.checkSizeIsCorrect(3);

  const titleSize4 = new TitleCtrl(example.find(toTestSelector("size-4")), t);
  await titleSize4.checkSizeIsCorrect(4);
});
