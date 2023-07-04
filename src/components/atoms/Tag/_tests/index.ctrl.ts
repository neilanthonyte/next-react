import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { IconCtrl } from "../../../generic/Icon/_tests/index.ctrl";

export class TagCtrl {
  public element: Selector;
  public label: Selector;
  public clearBtn: IconCtrl;
  public collapsibleDecoration: IconCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.element = this.selector.find(toTestSelector("tag"));
    this.label = this.element.find(toTestSelector("label"));
    this.clearBtn = new IconCtrl(
      this.selector.find(toTestSelector("componentSelector")),
      this.t,
    );
    this.collapsibleDecoration = new IconCtrl(
      this.selector.find(toTestSelector("collapsible-decoration")),
      this.t,
    );
  }

  public async exists(exists: boolean) {
    await this.t.expect(this.element.exists).eql(exists);
    await this.t.expect(this.label.exists).eql(exists);
  }

  public async expectLabel(text: string) {
    await this.t.expect(this.label.innerText).eql(text);
  }

  public async expectCollapsibleDecoration(exists: boolean) {
    await this.t.expect(this.collapsibleDecoration.selector.exists).eql(exists);
  }

  public async expectClearButton(exists: boolean) {
    await this.t.expect(this.clearBtn.selector.exists).eql(exists);
  }

  public async clear() {
    await this.clearBtn.click();
  }

  public async click() {
    await this.t.click(this.element);
  }
}
