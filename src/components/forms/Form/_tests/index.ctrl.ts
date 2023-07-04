import * as _ from "lodash";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { ButtonCtrl } from "../../../generic/Button/_tests/index.ctrl";
import { InputControlsCtrl } from "../../../generic/InputControls/_tests/index.ctrl";
import { IInputCtrl } from "../../../inputs/BaseInput/_tests/IInputCtrl";
import { DialogFooterCtrl } from "../../../structure/Dialog/_tests/index.ctrl";
import { inputCtrlLookup } from "./helpers/inputCtrlLookup";

export interface IFillOptions {
  randomFillChance?: number;
  mustFill?: string[];
  mustSkip?: string[];
}

interface IInputInstance {
  controls: InputControlsCtrl;
  input: IInputCtrl<any>;
}

/**
 * Determine if we fill in the input
 */
const shouldFillInput = (
  inputMap: string,
  fillOptions: IFillOptions,
  isRequired: boolean,
) => {
  // skips overrule
  if (fillOptions.mustSkip.indexOf(inputMap) > -1) {
    return false;
  }

  if (fillOptions.mustFill.indexOf(inputMap) > -1 || isRequired) {
    return true;
  }
  // random chance
  return Math.random() < fillOptions.randomFillChance;
};

export class FormCtrl {
  public footer: DialogFooterCtrl;

  private header: Selector;
  private customError: Selector;
  private genericError: Selector;

  // quick access variables
  public submit: ButtonCtrl;
  public cancel: ButtonCtrl;

  constructor(private selector: Selector, private t: TestController) {
    this.header = selector.find(toTestSelector("header"));
    this.customError = selector.find(toTestSelector("customError"));
    this.genericError = selector.find(toTestSelector("genericError"));
    this.footer = new DialogFooterCtrl(selector, this.t);

    // quick access
    this.submit = this.footer.acceptButton;
    this.cancel = this.footer.cancelButton;
  }

  /**
   * Finds all inputs within the form
   */
  private async getInputSelectors(): Promise<Selector[]> {
    const example = this.selector.find("[data-test-component-type]");
    const count = await example.count;
    const inputs: Selector[] = [];
    for (let i = 0; i < count; i++) {
      inputs.push(await example.nth(i));
    }
    return inputs;
  }

  /**
   * Get a testcafe selector for a given input map.
   */
  private async mapToSelector(map: string) {
    // the full input, including controls
    const selector = this.selector.find(toTestSelector(map, "data-test-map"));

    if (await !selector.exists) {
      throw new Error(`cannot find input by map, ${map}`);
    }
    return selector;
  }

  /**
   * Get an input controller for a given input map.
   */
  private async mapToController(map: string) {
    return await this.selectorToController(await this.mapToSelector(map));
  }

  /**
   * Gets the controller for a known input map
   */
  private async selectorToController(
    selector: Selector,
  ): Promise<IInputInstance> {
    // the name of the input test controller to use
    const inputType = await selector.getAttribute("data-test-component-type");

    // the dynamically selected input component
    const inputComponent = selector.find(toTestSelector("input-component"));
    const InputCtrl = inputCtrlLookup[inputType];

    if (!InputCtrl) {
      this.t.debug();
      throw new Error(`unknown input type, ${inputType}`);
    }
    const inputDetails: IInputInstance = {
      controls: new InputControlsCtrl(selector, this.t),
      input: new InputCtrl(inputComponent, this.t),
    };
    return inputDetails;
  }

  async getInputValue(map: string) {
    const inputCtrl = await this.mapToController(map);
    return await inputCtrl.input.getValue();
    ``;
  }

  async validateInputExists(map: string) {
    const sel = await this.mapToSelector(map);
    return await sel.exists;
  }

  /**
   * Fills the form using passed values. Options can be passed to dynamically fill
   * the remaining fields.
   */
  async fill(values: { [key: string]: any }, fillOptions: IFillOptions = {}) {
    // provide defaults
    fillOptions = {
      randomFillChance: 0,
      mustFill: [],
      mustSkip: [],
      ...fillOptions,
    };

    // manually fill some fields
    const keys = Object.keys(values);
    for (let i = 0; i < keys.length; i++) {
      const map = keys[i];
      const value = values[map];
      const inputCtrl = await this.mapToController(map);
      await inputCtrl.input.setValue(value);
    }

    const generatedValues: any = {};

    let currentIndex = 0;
    // current list of inputs - updated each cycle
    let formArray = await this.getInputSelectors();

    while (formArray.length > currentIndex) {
      const inputEl = formArray[currentIndex];
      const inputMap = await inputEl.getAttribute("data-test-map");
      const inputCtrl = await this.mapToController(inputMap);
      const isRequired =
        (await inputEl.getAttribute("data-required")) === "true";

      if (shouldFillInput(inputMap, fillOptions, isRequired)) {
        const value = await inputCtrl.input.appendRandom();
        _.set(generatedValues, inputMap, value);
      }

      // move onto next input
      currentIndex++;
      // cater for if more inputs have appeared due to our previous choices
      formArray = await this.getInputSelectors();
    }
    return generatedValues;
  }

  public async clickSubmit(): Promise<void> {
    await this.submit.click();
  }

  public async clickCancel(): Promise<void> {
    await this.cancel.click();
  }

  async expectTitle(title: string) {
    await this.t.expect(await this.header.innerText).contains(title);
  }

  /**
   * Checks how many input errors are showing.
   */
  async expectValidationErrorCount(count: number = 0) {
    let errorCount = 0;
    const inputs = await this.getInputSelectors();
    for (let i = 0; i < inputs.length; i++) {
      const inputCtrl = await this.selectorToController(inputs[i]);
      errorCount += await inputCtrl.controls.getErrorCount();
    }
    await this.t.expect(await errorCount).eql(count);
  }

  /**
   * Clears the form using the clear button for all inputs
   */
  async clearForm() {
    const inputs = await this.getInputSelectors();
    for (let i = 0; i < inputs.length; i++) {
      const inputCtrl = await this.selectorToController(inputs[i]);
      await inputCtrl.controls.clickClear();
    }
  }
}
