import { Selector } from "testcafe";
import { MainViewDecorationCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { randomFromArr, randomNum } from "../../../../helpers/random";

fixture("MainViewDecoration").page(
  "http://localhost:6060/#!/MainViewDecoration",
);

test("Title and description are as expected", async (t) => {
  const example = Selector(
    toTestSelector("MainViewDecoration-titleDescription-correct"),
  );
  const mainViewDecorationCtrl = new MainViewDecorationCtrl(example, t);

  await mainViewDecorationCtrl.expectTitle("Hello world!");
  await mainViewDecorationCtrl.expectDescription(
    "This is some description text.",
  );
});

test("Children content is present", async (t) => {
  const example = Selector(toTestSelector("MainViewDecoration-content-exists"));
  const mainViewDecorationCtrl = new MainViewDecorationCtrl(example, t);

  await mainViewDecorationCtrl.expectContent();
});

test("Avatar is present", async (t) => {
  const example = Selector(toTestSelector("MainViewDecoration-avatar-exists"));
  const mainViewDecorationCtrl = new MainViewDecorationCtrl(example, t);

  await mainViewDecorationCtrl.expectAvatar();
});

test("Actions are present and clickable", async (t) => {
  const example = Selector(
    toTestSelector("MainViewDecoration-actions-clicked"),
  );
  const mainViewDecorationCtrl = new MainViewDecorationCtrl(example, t);

  const clicks = randomNum(10);

  const actions = await mainViewDecorationCtrl.retrieveActions();

  for (let i = 1; i <= clicks; i++) {
    const action = randomFromArr(actions);
    await action.click();
  }

  await mainViewDecorationCtrl.expectCounterValue(clicks);
});

test("Width is as expected", async (t) => {
  const example = Selector(toTestSelector("MainViewDecoration-width-changes"));
  const mainViewDecorationCtrl = new MainViewDecorationCtrl(example, t);

  await mainViewDecorationCtrl.setWidthValue(500);
  await mainViewDecorationCtrl.expectWidthValue(500);

  await mainViewDecorationCtrl.setWidthValue(1000);
  await mainViewDecorationCtrl.expectWidthValue(1000);
});
