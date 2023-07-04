import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export default class CompanionsWidgetCtrl {
  constructor(private selector: Selector, private t: TestController) {}
}
