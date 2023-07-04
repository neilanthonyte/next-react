import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export default class HcpsPerformanceSectionCtrl {
  constructor(private selector: Selector, private t: TestController) {}
}
