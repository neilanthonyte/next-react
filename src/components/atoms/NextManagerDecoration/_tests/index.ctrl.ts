import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export default class NextManagerDecorationCtrl {
  constructor(private selector: Selector, private t: TestController) {}
}