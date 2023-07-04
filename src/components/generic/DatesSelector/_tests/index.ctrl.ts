import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { TFrequencies } from "next-shared/src/types/TFrequencies";
import { THorizontalPositions } from "next-shared/src/types/layouts";
import { CircularIconCtrl } from "../../CircularIcon/_tests/index.ctrl";

export class DatesSelectorCtrl {
  private datesSelector: Selector;
  private displayDate: Selector;
  private frequencies: Selector;
  private nextButton: CircularIconCtrl;
  private previousButton: CircularIconCtrl;
  private selectedFrequency: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.datesSelector = this.selector.find(toTestSelector("datesSelector"));
    this.displayDate = this.datesSelector.find(toTestSelector("displayDate"));
    this.frequencies = this.datesSelector.find(toTestSelector("frequencies"));
    this.nextButton = new CircularIconCtrl(
      this.datesSelector.find(toTestSelector("next")),
      this.t,
    );
    this.previousButton = new CircularIconCtrl(
      this.datesSelector.find(toTestSelector("previous")),
      this.t,
    );
    this.selectedFrequency = this.frequencies.child();
  }

  public async clickFrequency(frequency: TFrequencies): Promise<void> {
    this.selectedFrequency = this.selector.find(toTestSelector(frequency));
    await this.t.click(this.selectedFrequency);
  }

  public async clickPreviousButton(): Promise<void> {
    await this.previousButton.click();
  }

  public async clickNextButton(): Promise<void> {
    await this.nextButton.click();
  }

  public async expectDisplayDate(displayDate: string): Promise<void> {
    await this.t.expect(this.displayDate.innerText).eql(displayDate);
  }

  public async expectNextButtonDisabled(): Promise<void> {
    await this.nextButton.expectDisabled();
  }

  public async expectPosition(position: THorizontalPositions): Promise<void> {
    await this.t
      .expect(await this.datesSelector.getAttribute("data-test-position"))
      .eql(position);
  }

  public async expectSelectedFrequency(frequency: string): Promise<void> {
    await this.t.expect(this.selectedFrequency.innerText).eql(frequency);
  }
}
