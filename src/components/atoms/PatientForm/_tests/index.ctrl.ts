import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ActiveFormViewCtrl } from "../../../forms/ActiveFormView/_tests/index.ctrl";

export class PatientFormCtrl {
  public activeForm: ActiveFormViewCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.activeForm = new ActiveFormViewCtrl(
      this.selector.find(toTestSelector("form")),
      this.t,
    );
  }
}
