import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { FormCtrl } from "../../Form/_tests/index.ctrl";

export class ActiveFormViewCtrl {
  public form: FormCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.form = new FormCtrl(
      this.selector.find(toTestSelector("form")),
      this.t,
    );
  }
}
