import { injectable } from "inversify";

// team submodules
import { IMedicalGoalsModule } from "../modules/MedicalGoalsModule";

/**
 * subscriptions module
 */
@injectable()
export class MockMedicalGoalsModule implements IMedicalGoalsModule {
  public async getMedicalGoalListing(): Promise<fhir3.Goal[]> {
    return [];
  }
}
