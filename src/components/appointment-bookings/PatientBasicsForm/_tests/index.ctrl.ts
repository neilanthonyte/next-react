import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export default class PatientBasicsFormCtrl {
  constructor(private selector: Selector, private t: TestController) {}
}
