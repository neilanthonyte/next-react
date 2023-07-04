import { injectable } from "inversify";
import { ISSOModule } from "../modules/SSOModule";

@injectable()
export class MockSSOModule implements ISSOModule {
  public async generateSignInUrl(): Promise<{
    error: null | string;
    signInUrl: null | string;
  }> {
    return {
      error: null,
      signInUrl: "https://google.com.au/",
    };
  }

  public logoutFromIdentityProvider(redirectUrl?: string): void {}
}
