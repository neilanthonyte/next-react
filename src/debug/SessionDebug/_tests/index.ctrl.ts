import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

export class SessionDebugCtrl {
  public sessionId: Selector;
  public loginButton: Selector;
  public logoutButton: Selector;

  constructor(private selector: Selector, private t: TestController) {
    this.sessionId = this.selector.find(toTestSelector("session"));
    this.loginButton = this.selector.find(toTestSelector("login"));
    this.logoutButton = this.selector.find(toTestSelector("logout"));
  }
}
