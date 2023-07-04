import { ResourceCtrl } from "./index.ctrl";
import { Selector } from "testcafe";
import {
  selectAttribute,
  selectComponent,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

fixture("RectangulatMetric").page("http://localhost:6060/#/Resource");

test("It handles header action click", async (t: TestController) => {
  const selector = Selector(selectDemo("Resource", "header"));
  const Resource = new ResourceCtrl(selector.find(selectComponent()), t);

  const output = await selector.getAttribute(selectAttribute("output"));

  await Resource.clickHeaderAction();
  await t.expect(output).eql("headerAction");
});

test("It handles selectable state", async (t: TestController) => {
  const selector = Selector(selectDemo("Resource", "selectable"));
  const Resource = new ResourceCtrl(selector.find(selectComponent()), t);

  await Resource.expectToBeSelectable(true);
  await Resource.expectToBeSelected(false);
  await Resource.clickCheckbox();
  await Resource.expectToBeSelected(true);
  await Resource.clickCheckbox();
  await Resource.expectToBeSelected(false);
});

test("It handles footer action click", async (t: TestController) => {
  const selector = Selector(selectDemo("Resource", "footer"));
  const Resource = new ResourceCtrl(selector.find(selectComponent()), t);

  const output = await selector.getAttribute(selectAttribute("output"));

  await Resource.clickFooterAction();

  await t.expect(output).eql("footerAction");
});

test("It handles resource actions click", async (t: TestController) => {
  const selector = Selector(selectDemo("Resource", "actions"));

  const Resource = new ResourceCtrl(selector.find(selectComponent()), t);

  const output = await selector.getAttribute(selectAttribute("output"));

  await Resource.clickResourceAction(0);

  await t.expect(output).eql("accept");
});

test("It handles see more body content", async (t: TestController) => {
  const selector = Selector(selectDemo("Resource", "fill-container"));

  const Resource = new ResourceCtrl(selector.find(selectComponent()), t);

  await Resource.expectSeeMoreBodyContentButton();

  const output = await selector.getAttribute(selectAttribute("output"));

  await Resource.clickSeeMoreBodyContentButton();

  await t.expect(output).eql("See more");
});
