import { inject, injectable } from "inversify";
import { IHttpConnection } from "../connections/HttpConnection";
import * as root from "window-or-global";

export interface ISSOModule {
  generateSignInUrl(): Promise<{
    error: null | string;
    signInUrl: null | string;
  }>;

  logoutFromIdentityProvider(redirectUrl?: string): void;
}

@injectable()
export class SSOModule implements ISSOModule {
  constructor(
    @inject("HttpConnection") protected _httpConnection: IHttpConnection,
  ) {}

  public async generateSignInUrl(): Promise<{
    error: null | string;
    signInUrl: null | string;
  }> {
    const returnUrl = root.location?.href || null;
    if (returnUrl === null) {
      // we may be running this outside the context of a browser, SSO won't work
      throw new Error("Unable to determine current page URL");
    }

    const { error, signInUrl } = await this._httpConnection.makeRequest({
      url: "sso/generate-sign-in-url",
      method: "post",
      data: { returnUrl },
    });

    return { error, signInUrl };
  }

  public logoutFromIdentityProvider(redirectUrl?: string): void {
    if (!redirectUrl) {
      redirectUrl = root.location?.href || null;

      if (redirectUrl === null) {
        // we may be running this outside the context of a browser, SSO won't work
        throw new Error("Unable to determine current page URL");
      }
    }

    // navigate to the azure sign out page, they will automatically redirect back once complete
    location.href = `https://login.microsoftonline.com/common/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(
      redirectUrl,
    )}`;
  }
}
