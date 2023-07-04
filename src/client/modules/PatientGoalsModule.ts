import { inject, injectable } from "inversify";
import { IHttpConnection } from "../connections/HttpConnection";
import { Action } from "next-shared/src/models/Action";

export interface IPatientGoalsModule {
  retrievePatientGoals(patientId: string): Promise<fhir3.Goal[]>;
  setPatientGoal(
    patientId: string,
    goalKey: string,
    goal: fhir3.Goal,
  ): Promise<void>;
}

@injectable()
export class PatientGoalsModule implements IPatientGoalsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async retrievePatientGoals(patientId: string): Promise<fhir3.Goal[]> {
    const res = await this._httpConnection.makeRequest({
      url: `patients/${patientId}/goals`,
      method: "get",
    });
    return res.goals;
  }

  public async setPatientGoal(
    patientId: string,
    goalKey: string,
    goal: fhir3.Goal,
  ): Promise<void> {
    await this._httpConnection.makeRequest({
      url: `patients/${patientId}/goals/${goalKey}`,
      method: "post",
      data: {
        goal,
      },
    });
  }
}
