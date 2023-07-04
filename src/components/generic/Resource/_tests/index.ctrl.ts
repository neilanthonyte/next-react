import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

import { ButtonCtrl } from "../../Button/_tests/index.ctrl";
import { ECheckboxStatus } from "../../Checkbox";
import { CheckboxCtrl } from "../../Checkbox/_tests/index.ctrl";

export class ResourceCtrl {
  public element: Selector;
  public footerAction: ButtonCtrl;
  public headerAction: ButtonCtrl;
  public resourceActions: Selector;
  public checkbox: CheckboxCtrl;
  public seeMoreBodyContentButton: ButtonCtrl;

  constructor(public selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("resource"));
    this.footerAction = new ButtonCtrl(
      this.selector.find(toTestSelector("resource-footer-action")),
      t,
    );
    this.headerAction = new ButtonCtrl(
      this.selector.find(toTestSelector("resource-header-action")),
      t,
    );
    this.resourceActions = this.selector.find(
      toTestSelector("resource-actions"),
    );
    this.checkbox = new CheckboxCtrl(
      this.selector.find(toTestSelector("resource-checkbox")),
      t,
    );
    this.seeMoreBodyContentButton = new ButtonCtrl(
      this.selector.find(
        toTestSelector("resource-see-more-body-content-button"),
      ),
      t,
    );
  }

  public async clickHeaderAction() {
    await this.headerAction.click();
  }

  public async clickFooterAction() {
    await this.footerAction.click();
  }

  public async clickCheckbox() {
    await this.checkbox.click();
  }

  public async expectToBeSelectable(isSelectable: boolean) {
    await this.t.expect(this.checkbox.element.exists).eql(isSelectable);
  }

  public async expectToBeSelected(selected: boolean) {
    return await this.checkbox.expectStatus(
      selected ? ECheckboxStatus.Successful : ECheckboxStatus.Unchecked,
    );
  }

  public async expectSeeMoreBodyContentButton() {
    await this.seeMoreBodyContentButton.exists();
  }

  public async clickSeeMoreBodyContentButton() {
    await this.seeMoreBodyContentButton.click;
  }

  public async clickResourceAction(index: number) {
    const actionSelector = this.resourceActions.find(
      toTestSelector(`resource-action-${index}`),
    );
    const action = new ButtonCtrl(actionSelector, this.t);
    await action.click();
  }
}
