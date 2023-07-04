import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { TableOfContentsCtrl } from "../../../structure/TableOfContents/_tests/index.ctrl";
import { ProgressTrackerStackedCtrl } from "../../../generic/ProgressTrackerStacked/_tests/index.ctrl";

export class CourseArticleSidebarCtrl {
  public backButton: ButtonCtrl;
  public tableOfContents: TableOfContentsCtrl;
  public progressTracker: ProgressTrackerStackedCtrl;
  private title: Selector;

  constructor(public selector: Selector, private t: TestController) {
    this.backButton = new ButtonCtrl(
      selector.find(toTestSelector("courseArticleSidebar-back-button")),
      t,
    );
    this.tableOfContents = new TableOfContentsCtrl(
      selector.find(toTestSelector("courseArticleSidebar-toc")),
      t,
    );
    this.progressTracker = new ProgressTrackerStackedCtrl(
      selector.find(toTestSelector("courseArticleSidebar-progress")),
      t,
    );
    this.title = selector.find(toTestSelector("courseArticleSidebar-title"));
  }

  public async checkContents() {
    await this.t.expect(await this.selector.exists).ok();
    await this.t.expect(await this.backButton.exists()).ok();
    await this.t.expect(await this.progressTracker.exists()).ok();
    await this.t.expect(await this.title.exists).ok();
    await this.tableOfContents.exists(true);
  }

  public async expectTitle(text: string) {
    return this.t.expect(await this.title.innerText).eql(text);
  }
}
