import { injectable } from "inversify";
import { ILegalsModule } from "next-shared/src/types/ILegalsModule";

@injectable()
export class MockLegalsModule implements ILegalsModule {
  public async retrieveTermsAndConditions() {
    return {
      title: "This is a terms and conditions title",
      lead: "this is a lead",
      version: "0.12.3",
      sections: [
        {
          body: "this is a terms and conditions body",
          heading: "this is a terms and conditions heading",
        },
      ],
    };
  }
}
