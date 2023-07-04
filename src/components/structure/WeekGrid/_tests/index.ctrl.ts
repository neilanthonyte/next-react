import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export default class WeekGridCtrl {
  constructor(private selector: Selector, private t: TestController) {}
}
