import { Selector } from "testcafe";
import { LoaderCtrl } from "./index.ctrl";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Loader").page("http://localhost:6060/#!/Loader");

test("Loader works in standard usage", async (t) => {
  const example = Selector(toTestSelector("Loader-scenario-simple"));
  const loader = new LoaderCtrl(example, t);
  await loader.expectLoader(true);
  await loader.expectText("");
});

test("Loader works in standard usage and has text", async (t) => {
  const example = Selector(toTestSelector("Loader-scenario-simpleText"));
  const loader = new LoaderCtrl(example, t);
  await loader.expectLoader(true);
  await loader.expectText("Loading");
});

test("Loader works in overlay usage", async (t) => {
  const example = Selector(toTestSelector("Loader-scenario-overlay"));
  const loader = new LoaderCtrl(example, t);
  await loader.expectLoader(true);
  await loader.expectText("");
});

test("Loader has text in overlay usage", async (t) => {
  const example = Selector(toTestSelector("Loader-scenario-overlayText"));
  const loader = new LoaderCtrl(example, t);
  await loader.expectLoader(true);
  await loader.expectText("Please wait");
});
