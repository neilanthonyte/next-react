import { Selector } from "testcafe";
import {
  selectAction,
  selectDemo,
} from "next-shared/src/helpers/toTestSelector";

import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { MODAL_SHOW_ACTION } from "../readme";
import { ModalCtrl } from "./index.ctrl";

fixture("Modal").page("http://localhost:6060/#/Modal");

test("If status is closed, modal should be hidden", async (t) => {
  const component = new ModalCtrl(t);

  await component.expectVisibleModal(false);
  await component.hasRenderedHeader(false);
  await component.hasRenderedBody(false);
});

test("If status is open, modal should be shown", async (t) => {
  const selector = Selector(selectDemo("Modal", "standard"));

  const modal = new ModalCtrl(t);

  const showModalBtn = new ButtonCtrl(
    selector.find(selectAction(MODAL_SHOW_ACTION)),
    t,
  );

  await showModalBtn.click();

  await modal.expectVisibleModal(true);
});

test("If modal has children they should render", async (t: TestController) => {
  const selector = Selector(selectDemo("Modal", "standard"));

  const modal = new ModalCtrl(t);

  const showModalBtn = new ButtonCtrl(
    selector.find(selectAction(MODAL_SHOW_ACTION)),
    t,
  );

  await showModalBtn.click();

  await modal.expectVisibleModal(true);
  await modal.hasRenderedHeader(true);
  await modal.hasRenderedBody(true);
  await modal.hasRenderedFooter();
});

test("If size prop is supplied, modal should have size class", async (t: TestController) => {
  const selector = Selector(selectDemo("Modal", "standard"));

  const modal = new ModalCtrl(t);

  const showModalBtn = new ButtonCtrl(
    selector.find(selectAction(MODAL_SHOW_ACTION)),
    t,
  );

  const toggleSizeBtn = new ButtonCtrl(
    selector.find(selectAction(MODAL_SHOW_ACTION)),
    t,
  );

  await toggleSizeBtn.click();
  await showModalBtn.click();

  await modal.expectVisibleModal(true);
  await modal.expectModalClass("size-sm");
});
