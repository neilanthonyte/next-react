import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export default class ToolsSectionCtrl {
  constructor(private selector: Selector, private t: TestController) {}
}
