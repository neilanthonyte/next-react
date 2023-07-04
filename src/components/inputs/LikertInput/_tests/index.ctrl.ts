import { Selector } from "testcafe";

import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class LikertInputCtrl<T> {
  constructor(private selector: Selector, private t: TestController) {}
}
