import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export default class CompanionsSectionCtrl {
  constructor(private selector: Selector, private t: TestController) {}
}
