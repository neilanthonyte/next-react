import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { createGuid } from "next-shared/src/helpers/guid";

export class RichContentEditorCtrl {
  private editor: Selector;

  private redactorControllerGuid = createGuid();
  private controllerFinishedSettingUpOnWindow = false;

  constructor(private selector: Selector, private t: TestController) {
    this.editor = this.selector.find(toTestSelector("redactor") + " p");
  }

  /**
   * To select a redactor controller you need to pass a querySelector string to window.$R,
   * and because of testcafe's limitation in being able to get the querySelector string out of
   * the selector object that is passed into this test controller, we have to manually append a guid
   * to the selected element inside the selector in the DOM.
   * We can then set a property on the window that references the controller for this particular redactor
   * test controller.
   * Other methods throughout this file should use window[`REDACTOR_CONTROLLER_${guid}`] inside of their
   * client evaluated functions.
   *
   * This is complicated due to limitations of redactor, and the fact we may have multiple instances of redactor
   * on the one page at anytime, we need to use guid's to make sure we aren't controlling another instance of redactor.
   */
  private async setRedactorControllerOnWindow() {
    if (this.controllerFinishedSettingUpOnWindow) {
      return;
    }

    const redactorControllerSelector =
      toTestSelector(this.redactorControllerGuid, "data-test-controller") +
      " * " +
      toTestSelector("redactor");

    await this.t.eval(
      () => {
        // @ts-ignore
        testcafeSelector().setAttribute("data-test-controller", guid);
        // @ts-ignore
        window[`REDACTOR_CONTROLLER_${guid}`] = window.$R(
          redactorControllerSelector,
        );
      },
      {
        dependencies: {
          testcafeSelector: this.selector,
          redactorControllerSelector,
          guid: this.redactorControllerGuid,
        },
      },
    );

    this.controllerFinishedSettingUpOnWindow = true;
  }

  public async focus() {
    await this.t.click(this.editor);
  }

  public async getRawContent() {
    const rawContent = await this.editor.textContent;

    // for some reason the editor outputs non breaking space chars
    const nbsp = String.fromCharCode(160); // non breaking space
    const stdsp = String.fromCharCode(32); // space

    const replace = new RegExp(`${nbsp}`, "g");

    const cleanContent = rawContent.replace(replace, stdsp);

    return cleanContent;
  }

  public async getHtmlContent() {
    await this.setRedactorControllerOnWindow();
    return await this.t.eval(
      () => {
        // @ts-ignore
        return window[`REDACTOR_CONTROLLER_${guid}`].source
          .getCode()
          .replace(/&nbsp;/g, " "); // testcafe inserts text with non breaking spaces, this is not the usual output..
      },
      {
        dependencies: {
          guid: this.redactorControllerGuid,
        },
      },
    );
  }

  public async clearEditorContents() {
    await this.focus();
    await this.t.pressKey("ctrl+a");
    await this.t.pressKey("backspace");
  }

  public async pressKey(keysCommand: string) {
    await this.t.pressKey(keysCommand);
  }

  public async selectBold() {
    await this.setRedactorControllerOnWindow();

    await this.t.eval(
      () => {
        // @ts-ignore
        window[`REDACTOR_CONTROLLER_${guid}`].toolbar
          .getElement()
          .nodes[0].querySelector("a.re-bold")
          .click();
      },
      {
        dependencies: {
          guid: this.redactorControllerGuid,
        },
      },
    );
  }

  public async addContent(content: string) {
    await this.t.typeText(this.editor, content);
  }
}
