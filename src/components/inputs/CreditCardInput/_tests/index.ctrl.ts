import { IInputCtrl } from "../../BaseInput/_tests/IInputCtrl";
import { ICreditCard } from "next-shared/src/types/ICreditCard";
import { FormCtrl } from "../../../forms/Form/_tests/index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { CreditCardSummaryCtrl } from "../../../payments/CreditCardSummary/_tests/index.ctrl";

export class CreditCardInputCtrl implements IInputCtrl<ICreditCard> {
  private summarySelector: Selector;
  public creditCardForm: FormCtrl;
  public creditCardSummary: CreditCardSummaryCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.summarySelector = selector.find(toTestSelector("summary"));
    this.creditCardForm = new FormCtrl(
      selector.find(toTestSelector("creditCardForm")),
      t,
    );
    this.creditCardSummary = new CreditCardSummaryCtrl(this.summarySelector, t);
  }

  /** Enter a value into the input */
  async setValue(value: ICreditCard | null): Promise<void> {
    this.creditCardSummary.setCard.click();
    this.creditCardForm.fill(value);
    this.creditCardForm.clickSubmit();
  }

  /** Gets the current input value */
  async getValue(): Promise<null | ICreditCard | ICreditCard[]> {
    return JSON.parse(
      await this.summarySelector.getAttribute("data-test-card"),
    );
  }

  /** Enter a value into the input */
  async appendValue(value: ICreditCard): Promise<void> {
    this.setValue(value);
  }
  /** Ask the input to generate an appropriate random value */
  async appendRandom(): Promise<ICreditCard> {
    const card = {
      cardType: "visa",
      cardNumberLast4: "1234",
      expirationDate: "02/2020",
      paymentToken: "abcdefg",
    };
    await this.setValue(card);
    return card;
  }

  /** Check the input holds the specified value */
  async expectValue(value: ICreditCard): Promise<void> {
    // TODO do a check
  }
}
