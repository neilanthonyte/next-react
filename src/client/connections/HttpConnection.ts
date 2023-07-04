import axios from "axios";
import { AxiosRequestConfig } from "axios";
import { injectable } from "inversify";
import {
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
} from "next-shared/src/helpers/errorTypes";

/**
 * network request args interface
 */
export interface INetworkRequestArgs {
  url: string;
  method: "get" | "post" | "put" | "patch" | "delete";
  params?: { [key: string]: string };
  data?: any;
  allow404?: boolean;
  allow403?: boolean;
  overrideBearerToken?: string;
  handleOwnError?: boolean;
}

/**
 * http connection interface
 */
export interface IHttpConnection {
  url: string;
  bearerToken: string;
  makeRequest(args: INetworkRequestArgs): Promise<any>;
  // returns the generated axios request config without making any network requests
  getRawRequestConfig(args: INetworkRequestArgs): Promise<AxiosRequestConfig>;
}

/**
 * http connection class
 */
@injectable()
export class HttpConnection implements IHttpConnection {
  // url to make request to
  public url: string = null;
  // token for authentication
  public bearerToken: string = null;

  private getRequestConfigForArgs(
    args: INetworkRequestArgs,
  ): AxiosRequestConfig {
    // cannot make a request without a url to hit
    if (!this.url) {
      throw new Error("Url not set, cannot make request");
    }

    // content will always be json
    const headers: any = {
      "Content-Type": "application/json",
    };

    // add authentication
    const bearerToken = args.overrideBearerToken || this.bearerToken;
    if (bearerToken) {
      headers.Authorization = `Bearer ${bearerToken}`;
    }

    const axiosRequestConfig = {
      url: this.url + args.url,
      method: args.method,
      params: args.params,
      data: args.data,
      withCredentials: false,
      headers,
    };
    return axiosRequestConfig;
  }

  public async getRawRequestConfig(
    args: INetworkRequestArgs,
  ): Promise<AxiosRequestConfig> {
    const requestConfig = this.getRequestConfigForArgs(args);
    return requestConfig;
  }

  /**
   * make http request
   *
   * @param {INetworkRequestArgs} args
   * @returns {Promise<any>}
   */
  public async makeRequest(args: INetworkRequestArgs): Promise<any> {
    const requestConfig = this.getRequestConfigForArgs(args);

    try {
      // make the request
      const res = await axios.request(requestConfig);
      // return response
      return res.data;
    } catch (e) {
      if (args.handleOwnError) {
        throw e;
      }

      if (e.response) {
        // try and throw appropriate error
        if (e.response.status === 404) {
          // not found error
          if (args.allow404) {
            return e.response.data;
          }
          throw new NotFoundError(
            (e.response.data.error || `Not found `) + args.url,
          );
        }

        // forbidden error
        if (e.response.status === 403) {
          if (args.allow403) {
            return e.response.data;
          }
          throw new ForbiddenError(
            (e.response.data.error || `Forbidden `) + args.url,
          );
        }

        // unauthorized error
        if (e.response.status === 401) {
          throw new UnauthorizedError(
            (e.response.data.error || `Unauthorized `) + args.url,
          );
        }
      }

      // services threw an unexpected error
      console.error("services request error:", e, args);
      throw new Error(e.response.data.error);
    }
  }
}
