import { inject, injectable } from "inversify";

import { IHttpConnection } from "../connections/HttpConnection";
import {
  IFormDetailsMixed,
  IFormSummary,
} from "next-shared/src/types/formTypes";

export interface IFormsModule {
  /**
   * Retrieve a specific form by its slug
   * e.g. sydney-reason-for-visit
   */
  retrieveFormBySlug(formSlug: string): Promise<IFormDetailsMixed>;

  retrievePatientFormsForLocation(
    locationSlug: string,
  ): Promise<IFormSummary[]>;
}

@injectable()
export class FormsModule implements IFormsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public retrieveFormBySlug(formSlug: string): Promise<IFormDetailsMixed> {
    return this._httpConnection.makeRequest({
      url: `forms/form-schemas/${formSlug}`,
      method: "get",
    });
  }

  /**
   * Retrieve a list of assignable forms for the given location.
   */
  public async retrievePatientFormsForLocation(
    locationSlug: string,
  ): Promise<IFormSummary[]> {
    return this._httpConnection.makeRequest({
      url: `forms/location-forms/${locationSlug}`,
      method: "get",
    });
  }
}
