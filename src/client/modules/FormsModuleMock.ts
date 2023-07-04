import { injectable, inject } from "inversify";

import { IFormsModule } from "../modules/FormsModule";
import { ICompanyHelpers } from "../CompanyHelpers";
import { IFormDetailsMixed } from "next-shared/src/types/formTypes";
import {
  mockAssignableForms,
  mockFormSchemas,
} from "next-shared/src/mockData/mockFormSchemas";
import { delay } from "../../helpers/delay";
import { IHttpConnection } from "../connections/HttpConnection";

@injectable()
export class MockFormsModule implements IFormsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
    @inject("CompanyHelpers") private _companyHelpers: ICompanyHelpers,
  ) {}

  public async retrieveFormBySlug(
    formSlug: string,
  ): Promise<IFormDetailsMixed> {
    await delay(1000);
    return mockFormSchemas[formSlug];
  }

  public async retrievePatientFormsForLocation(locationSlug: string) {
    await delay(1000);
    return mockAssignableForms;
  }
}
