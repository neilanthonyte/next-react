import { injectable } from "inversify";

export interface IMockConfigValues {
  sessionType: "none" | "staffMember" | "medicalStaffMember";
}

const defaultConfig: IMockConfigValues = {
  sessionType: "none", //"staffMember"
};

export interface IMockConfiguration {
  setConfig(newConfig: IMockConfigValues): void;
}

@injectable()
export class MockConfiguration implements IMockConfiguration {
  public config: IMockConfigValues = defaultConfig;

  public setConfig(newConfig: IMockConfigValues) {
    this.config = { ...defaultConfig, ...newConfig };
  }
}
