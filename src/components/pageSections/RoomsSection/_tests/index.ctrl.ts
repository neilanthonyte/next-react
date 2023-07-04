import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export default class RoomsSectionCtrl {
  constructor(private selector: Selector, private t: TestController) {}
}
