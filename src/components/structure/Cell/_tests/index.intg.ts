import { Selector } from "testcafe";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CellCtrl } from "./index.ctrl";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";

fixture("Cell").page("http://localhost:6060/#!/Cell");

test("Renders icon decoration and heading", async (t) => {
  const example = Selector(toTestSelector("Cell-scenario-simple"));
  const component = new CellCtrl(example.child().nth(0), t);

  await t.expect(await component.hasIconDecoration()).ok();
  await t.expect(await component.hasImageDecoration()).notOk();
  await t.expect(await component.getHeading()).eql("Simple cell");
});

test("Renders image decoration and heading", async (t) => {
  const example = Selector(toTestSelector("Cell-scenario-simple"));
  const component = new CellCtrl(example.child().nth(1), t);

  await t.expect(await component.hasImageDecoration()).ok();
  await t.expect(await component.hasIconDecoration()).notOk();
  await t.expect(await component.getHeading()).eql("Simple cell");
});

test("Renders children content", async (t) => {
  const example = Selector(toTestSelector("Cell-scenario-children"));
  const component = new CellCtrl(example, t);

  await component.expectToShowContent(
    "The quick brown fox jumps over a lazy dog",
  );
});

test("Renders children component", async (t) => {
  const example = Selector(toTestSelector("Cell-scenario-children-component"));
  const component = new CellCtrl(example, t);

  const button = new ButtonCtrl(component.content, t);

  await component.expectToShowContent();
  await button.expectLabel("Click me");
});

test("Renders type label", async (t) => {
  const example = Selector(toTestSelector("Cell-scenario-type"));
  const component = new CellCtrl(example, t);
  await t
    .expect(await component.getTypeLabel())
    .eql("The quick brown fox jumps over a lazy dog".toUpperCase());
});

test("Renders subHeader", async (t) => {
  const example = Selector(toTestSelector("Cell-scenario-subheader"));
  const component = new CellCtrl(example, t);
  await t
    .expect(await component.getSubHeading())
    .eql("The quick brown fox jumps over a lazy dog");
});

test("Renders cell with actions", async (t) => {
  const example = Selector(toTestSelector("Cell-scenario-actions"));
  const component = new CellCtrl(example, t);
  await component.clickAction(0);
  await component.expectAction("Add");
  await component.clickAction(1);
  await component.expectAction("Remove");
});

test("Renders cell with actions label", async (t) => {
  const example = Selector(toTestSelector("Cell-scenario-actions-label"));
  const component = new CellCtrl(example, t);
  await component.clickActionLabel(0);
  await component.expectAction("Add");
  await component.clickActionLabel(1);
  await component.expectAction("Remove");
});

test("Renders cell with goals", async (t) => {
  const example = Selector(toTestSelector("cell-decoration-icon"));
  const component = new CellCtrl(example, t);
  await component.expectGoal();
});
