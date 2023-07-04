import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ECarePlanCellActions } from "..";
import { OptionsPopoverCtrl } from "../../../atoms/OptionsPopover/_tests/index.ctrl";
import { IconCtrl } from "../../../generic/Icon/_tests/index.ctrl";
import { CollapsibleBlockCtrl } from "../../../structure/CollapsibleBlock/_tests/index.ctrl";

export class CarePlanCellCtrl {
  public element: Selector;
  public collapsibleElement: CollapsibleBlockCtrl;
  public title: Selector;
  public revisionsCount: Selector;
  public author: Selector;
  public authoredAt: Selector;
  public status: Selector;
  public actions: Selector;
  public subCarePlans: Selector;
  public actionsOptions: IconCtrl;
  public actionsOpenDocument: IconCtrl;
  public actionsEdit: IconCtrl;
  public actionsReview: IconCtrl;
  public optionsPopover: OptionsPopoverCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("care-plan-cell"));
    this.title = this.selector.find(toTestSelector("title"));
    this.revisionsCount = this.selector.find(toTestSelector("revisions-count"));
    this.author = this.selector.find(toTestSelector("author-name"));
    this.authoredAt = this.selector.find(toTestSelector("authored-at"));
    this.status = this.selector.find(toTestSelector("status"));
    this.subCarePlans = this.selector.find(toTestSelector("sub-care-plans"));
    this.actions = this.selector.find(toTestSelector("actions"));
    this.actionsOpenDocument = new IconCtrl(
      this.selector.find(
        toTestSelector(`action-${ECarePlanCellActions.Document}`),
      ),
      this.t,
    );
    this.actionsEdit = new IconCtrl(
      this.selector.find(toTestSelector(`action-${ECarePlanCellActions.Edit}`)),
      this.t,
    );
    this.actionsReview = new IconCtrl(
      this.selector.find(
        toTestSelector(`action-${ECarePlanCellActions.Review}`),
      ),
      this.t,
    );
    this.actionsOptions = new IconCtrl(
      this.selector.find(
        toTestSelector(`action-${ECarePlanCellActions.Options}`),
      ),
      this.t,
    );
    this.collapsibleElement = new CollapsibleBlockCtrl(
      this.selector.find(toTestSelector("collapsible")),
      this.t,
    );
    this.optionsPopover = new OptionsPopoverCtrl(
      this.selector.find(toTestSelector("options-popover")),
      this.t,
    );
  }

  public async exists() {
    await this.t.expect(this.element.exists).ok();
    await this.hasTitle();
    await this.hasAuthor();
    await this.hasAuthoredAt();
    await this.hasStatus();
    await this.hasActions();
  }

  public async hasTitle() {
    await this.t.expect(this.title.exists).ok();
  }

  public async hasAuthor() {
    await this.t.expect(this.author.exists).ok();
  }

  public async hasAuthoredAt() {
    await this.t.expect(this.authoredAt.exists).ok();
  }

  public async hasStatus() {
    await this.t.expect(this.status.exists).ok();
  }

  public async hasActions() {
    await this.t.expect(this.actions.exists).ok();
  }

  public async expectTitle(title: string) {
    await this.t.expect(this.title.innerText).eql(title);
  }

  public async expectRevisionCount(count: number) {
    await this.t.expect(this.revisionsCount.innerText).eql(count.toString());
  }

  public async expectSubCarePlansCount(count: number) {
    await this.t.expect(this.subCarePlans.childElementCount).eql(count);
  }

  public async expectStatus(status: string) {
    await this.t.expect(this.status.innerText).eql(status);
  }

  public async expectEditAction(exists: boolean) {
    await this.t.expect(this.actionsEdit.selector.exists).eql(exists);
  }

  public async clickEdit() {
    await this.actionsEdit.click();
  }

  public async expectReviewAction(exists: boolean) {
    await this.t.expect(this.actionsReview.selector.exists).eql(exists);
  }

  public async clickReview() {
    await this.actionsReview.click();
  }

  public async expectOpenDocumentAction(exists: boolean) {
    await this.t.expect(this.actionsOpenDocument.selector.exists).eql(exists);
  }

  public async clickOpenDocument() {
    await this.actionsOpenDocument.click();
  }

  public async clickOptions() {
    await this.actionsOptions.click();
  }

  public async hasOptionPopoverOpen() {
    await this.optionsPopover.exists();
  }

  public async hasCollapsibleContent() {
    await this.collapsibleElement.exists();
  }

  public async openCollapsibleContent() {
    await this.t.click(this.title);
  }

  public async getSubCarePlan(index: number): Promise<CarePlanCellCtrl> {
    const selector = await this.subCarePlans.child().nth(index);
    return new CarePlanCellCtrl(selector, this.t);
  }
}
