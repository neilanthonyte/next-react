import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export default class RoomsWidgetCtrl {
  constructor(private selector: Selector, private t: TestController) {}
}
