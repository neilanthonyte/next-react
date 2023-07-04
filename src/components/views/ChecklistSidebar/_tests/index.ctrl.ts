import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { SideBarCtrl } from "../../../structure/SideBar/_tests/index.ctrl";
export class ChecklistSidebarCtrl {
  static selector: string = "checklistsidebar";
  private checklistSidebar: Selector;
  public sidebar: SideBarCtrl;

  constructor(private s: Selector, private t: TestController) {
    this.checklistSidebar = this.s.find(
      toTestSelector(ChecklistSidebarCtrl.selector),
    );
    this.sidebar = new SideBarCtrl(this.checklistSidebar, this.t);
  }

  public async exists(value: boolean) {
    await this.t.expect(this.checklistSidebar.exists).eql(value);
  }
}
