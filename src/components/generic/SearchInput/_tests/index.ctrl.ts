import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class SearchInputCtrl {
  public searchInput: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.searchInput = this.selector.find(toTestSelector("search-input"));
  }

  public async fillText(text: string) {
    await this.t.typeText(this.searchInput, text);
  }
}
