export interface IMedicalGoalsModule {
  /**
   * Fetch the medical goals supported by the system.
   */
  getMedicalGoalListing(): Promise<fhir3.Goal[]>;
}
