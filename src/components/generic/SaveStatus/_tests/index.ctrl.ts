import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ButtonCtrl } from "../../Button/_tests/index.ctrl";
import { IconCtrl } from "../../Icon/_tests/index.ctrl";
import { LoaderCtrl } from "../../Loader/_tests/index.ctrl";

export class SaveStatusCtrl {
  public element: Selector;
  public idleIcon: IconCtrl;
  public successIcon: IconCtrl;
  public failIcon: IconCtrl;
  public loader: LoaderCtrl;
  public retryButton: ButtonCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("save-status"));
    this.idleIcon = new IconCtrl(
      this.selector.find(toTestSelector("idle-icon")),
      this.t,
    );
    this.successIcon = new IconCtrl(
      this.selector.find(toTestSelector("success-icon")),
      this.t,
    );
    this.failIcon = new IconCtrl(
      this.selector.find(toTestSelector("fail-icon")),
      this.t,
    );
    this.successIcon = new IconCtrl(
      this.selector.find(toTestSelector("success-icon")),
      this.t,
    );
    this.loader = new LoaderCtrl(
      this.selector.find(toTestSelector("loader")),
      this.t,
    );
  }

  public async exists() {
    await this.t.expect(this.element.exists).ok();
  }

  public async expectSuccessIcon() {
    await this.t.expect(this.successIcon.selector.exists).ok();
  }

  public async expectFailIcon() {
    await this.t.expect(this.failIcon.selector.exists).ok();
  }

  public async expectIdleIcon() {
    await this.t.expect(this.idleIcon.selector.exists).ok();
  }

  public async expectLoader() {
    await this.loader.expectLoader(true);
  }

  public async expectRetryButton() {
    await this.retryButton.exists();
  }

  public async clickRetryButton() {
    await this.retryButton.click();
  }
}
