import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { PopoverCtrl } from "../../../generic/Popover/_tests/index.ctrl";

export class OptionsPopoverCtrl {
  public element: PopoverCtrl;
  // public subcomponent: SubcomponentCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.element = new PopoverCtrl(
      selector.find(toTestSelector("elementSelector")),
      t,
    );
    // this.subcomponent = new SubcomponentCtrl(
    //   this.selector.find(toTestSelector("componentSelector")),
    //   this.t,
    // );
  }

  public async exists() {
    await this.element.exists();
  }

  public async pickOption(index: number) {
    await this.t.click((await this.element.findInBody("option")).nth(index));
  }

  public async expectSectionLabel(sectionIndex: number, label: string) {
    const sectionsSelector = await this.element.findInBody("section");
    const sectionSelector = await sectionsSelector.nth(sectionIndex);
    const labelSelector = await sectionSelector.find(
      toTestSelector("section_label"),
    );
    await this.t.expect(await labelSelector.innerText).eql(label);
  }
}
