import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";

export class CreditCardSummaryCtrl {
  public setCard: ButtonCtrl;
  public changeCard: ButtonCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.setCard = new ButtonCtrl(selector.find(toTestSelector("setCard")), t);
    this.changeCard = new ButtonCtrl(
      selector.find(toTestSelector("changeCard")),
      t,
    );
  }
}
