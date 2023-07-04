import * as _ from "lodash";
import { inject, injectable } from "inversify";

import { ISSOModule } from "./modules/SSOModule";
import { IWebSocketConnection } from "./connections/WebSocketConnection";
import { IOpsResourcesModule } from "./modules/OpsResourcesModule";
import { IOpsArticlesModule } from "./modules/OpsArticlesModule";
import { ITasksModule } from "./modules/TasksModule";
import { IOpsActionsModule } from "./modules/OpsActionsModule";
import { IFilesModule } from "./modules/FilesModule";
import { ICmsModule } from "./modules/CmsModule";
import { ISuggestionsModule } from "./modules/SuggestionsModule";
import { ISyncModule } from "./modules/SyncModule";
import { IGeoModule } from "./modules/GeoModule";
import { ICoursesModule } from "./modules/CoursesModule";
import { ICacheModule } from "./modules/CacheModule";
import { ILocationsModule } from "./modules/LocationsModule";
import { IHcpsModule } from "./modules/HcpsModule";
import { IAppointmentsModule } from "./modules/AppointmentsModule";
import { IAuthModule } from "./modules/AuthModule";
import { IPatientsModule } from "./modules/PatientsModule";
import { IScopesModule } from "./modules/ScopesModule";
import { IAppsModule } from "./modules/AppsModule";
import { IStaffMembersModule } from "./modules/StaffMembersModule";
import { IStorageModule } from "./modules/StorageModule";
import { IMedicalArticlesModule } from "./modules/MedicalArticlesModule";
import { IPatientAppModule } from "./modules/PatientAppModule";
import { IAnatomiesModule } from "./modules/AnatomiesModule";
// import { IMedicalGoalsModule } from "./modules/MedicalGoalsModule";
// import { IPatientGoalsModule } from "./modules/PatientGoalsModule";
// import { IPatientAppointmentRemindersModule } from "./modules/PatientAppointmentRemindersModule";
import { IActionsModule } from "./modules/ActionsModule";
import { IStatisticsModule } from "./modules/StatisticsModule";
import { IAppointmentBookingsModule } from "./modules/AppointmentBookingsModule";
import { IFormsModule } from "./modules/FormsModule";
import { IPaymentsModule } from "./modules/PaymentsModule";
import { INetworkSearchModule } from "./modules/NetworkSearchModule";
import { IDynamicStatisticsModule } from "./modules/DynamicStatisticsModule";
import { ILegalsModule } from "next-shared/src/types/ILegalsModule";
import { IAgentModule } from "./modules/AgentModule";
import { IHttpConnection } from "./connections/HttpConnection";
import { INewsArticlesModule } from "./modules/NewsArticlesModule";
import { IBlogArticlesModule } from "./modules/BlogArticlesModule";
import { IMockDataCacheModule } from "./modules/MockDataCacheModule";
import { IMockConfiguration } from "./MockConfiguration";

@injectable()
export class NextClient {
  @inject("HttpConnection") public httpConnection: IHttpConnection;
  @inject("WebSocketConnection")
  public webSocketConnection: IWebSocketConnection;

  @inject("AuthModule") public auth: IAuthModule;
  @inject("LocationsModule") public locations: ILocationsModule;
  @inject("HcpsModule") public hcps: IHcpsModule;
  @inject("AppointmentsModule") public appointments: IAppointmentsModule;
  @inject("PatientsModule") public patients: IPatientsModule;
  @inject("StaffMembersModule") public staffMembers: IStaffMembersModule;
  @inject("ScopesModule") public scopes: IScopesModule;
  @inject("AppsModule") public apps: IAppsModule;
  @inject("StorageModule") public storage: IStorageModule;
  @inject("OpsResourcesModule") public opsResources: IOpsResourcesModule;
  @inject("OpsArticlesModule") public opsArticles: IOpsArticlesModule;
  @inject("MedicalArticlesModule")
  public medicalArticles: IMedicalArticlesModule;
  @inject("PatientAppModule") public patientApp: IPatientAppModule;
  @inject("OpsActionsModule") public opsActions: IOpsActionsModule;
  @inject("TasksModule") public tasks: ITasksModule;
  @inject("AnatomiesModule") public anatomies: IAnatomiesModule;
  @inject("FilesModule") public files: IFilesModule;
  @inject("LegalsModule") public legals: ILegalsModule;
  @inject("CmsModule") public cms: ICmsModule;
  @inject("SuggestionsModule") public suggestions: ISuggestionsModule;
  @inject("AppointmentBookingsModule")
  public bookings: IAppointmentBookingsModule;
  // action planning
  @inject("ActionsModule") public actions: IActionsModule;
  // @inject("MedicalGoalsModule") public medicalGoals: IMedicalGoalsModule;
  // @inject("PatientGoalsModule") public patientGoals: IPatientGoalsModule;
  // @inject("PatientAppointmentRemindersModule")
  // public patientAppointmentReminders: IPatientAppointmentRemindersModule;
  @inject("StatisticsModule")
  public statistics: IStatisticsModule;
  @inject("SyncModule")
  public sync: ISyncModule;
  @inject("NewsModule") public news: INewsArticlesModule;
  @inject("CoursesModule") public courses?: ICoursesModule;
  @inject("BlogModule") public blog: IBlogArticlesModule;
  @inject("GeoModule") public geo?: IGeoModule;
  @inject("FormsModule") public forms?: IFormsModule;
  @inject("PaymentsModule") public payments?: IPaymentsModule;
  @inject("CacheModule") public cache?: ICacheModule;
  @inject("NetworkSearchModule") public networkSearch: INetworkSearchModule;
  @inject("DynamicStatisticsModule")
  public dynamicStatistics: IDynamicStatisticsModule;
  @inject("AgentModule") public agent: IAgentModule;
  @inject("SSOModule") public sso: ISSOModule;
  @inject("MockConfiguration") public mockConfiguration: IMockConfiguration;
  @inject("MockDataCacheModule")
  public mockDataCacheModule: IMockDataCacheModule;

  /**
   * The named functions will be replaced with a function that throws.
   * Upon invoking, the original method will be reinstated to help demonstrate
   * how the code recovers.
   */
  public mockErrorResponse(functionNames: string[]) {
    // replace function with our own
    functionNames.map((name: string) => {
      const originalFunc = _.get(this, name);
      // replace with a function that restores
      _.set(this, name, async () => {
        _.set(this, name, originalFunc);
        throw new Error(name);
      });
    });
  }
}
