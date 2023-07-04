import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class InteractionBlockerCtrl {
  static selector: string = "interaction-blocker";
  private interactionBlocker: Selector;
  private interactionBlockerOverlay: Selector;

  constructor(private s: Selector, private t: TestController) {
    this.interactionBlocker = this.s.find(
      toTestSelector(InteractionBlockerCtrl.selector),
    );
    this.interactionBlockerOverlay = this.interactionBlocker.find(
      toTestSelector("interaction-blocker-overlay"),
    );
  }

  public async exists(value: boolean) {
    await this.t.expect(this.interactionBlocker.exists).eql(value);
  }

  public async isBlockingInteraction(value: boolean) {
    await this.t.expect(this.interactionBlockerOverlay.exists).eql(value);
  }
}
