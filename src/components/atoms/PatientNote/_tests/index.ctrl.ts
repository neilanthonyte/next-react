import { toTestSelector } from "next-shared/src/helpers/toTestSelector";
import { noteToFormattedStr } from "next-shared/src/helpers/noteToFormattedStr";

import { standardizeNote } from "../../../../helpers/standardizeNote";

interface INoteElement extends Selector {
  innerHTML: any;
}

export class PatientNoteCtrl {
  private noteElement: INoteElement;
  constructor(public selector: Selector, private t: TestController) {
    this.noteElement = this.selector
      .find(toTestSelector("html-note"))
      .addCustomDOMProperties({
        innerHTML: (el) => el.innerHTML,
      }) as INoteElement;
  }

  public async checkNote(data: any) {
    // our custom noteToFormattedStr formats html in a particular way, and browsers add extra non breaking spaces, and changes the way <br /> is rendered.
    const noteHTML = noteToFormattedStr(standardizeNote(data))
      .replace(/&nbsp;/gi, "")
      .replace(/<br\/>/gi, "<br>");
    const domHTML = await this.noteElement.innerHTML;
    // format dom output to be consistent.
    const domHTMLStripped = domHTML.replace(/&nbsp;/gi, "");
    await this.t.expect(noteHTML).eql(domHTMLStripped);
  }
}
