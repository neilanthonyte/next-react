import { Selector } from "testcafe";
import { Screen } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Screen").page("http://localhost:6060/#!/Screen");

test("Details text is as expected", async (t) => {
  const example = Selector(toTestSelector("Screen-scenario-detailsExists"));
  const screen = new Screen(example, t);
  await screen.expectDetails("Companion 101");
});

test("Children are present", async (t) => {
  const example = Selector(toTestSelector("Screen-scenario-childrenExists"));
  const screen = new Screen(example, t);
  const children = screen.selector.find(toTestSelector("heading"));
  await screen.expectChildren(children);
});
