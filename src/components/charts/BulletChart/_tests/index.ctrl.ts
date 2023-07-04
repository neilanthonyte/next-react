import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class BulletChart {
  constructor(private selector: Selector, private t: TestController) {}
}
