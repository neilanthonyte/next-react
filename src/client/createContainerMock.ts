import { Container, ContainerModule, interfaces } from "inversify";

import { ClientSession as Session } from "next-shared/src/models/ClientSession";

import { NextCompanyHelpers } from "./NextCompanyHelpers";
import { MockConfiguration } from "./MockConfiguration";
import { NextClient } from "./NextClient";

import { HttpConnection } from "./connections/HttpConnection";
import { MockWebSocketConnection } from "./connections/WebSocketConnectionMock";
import { MockWebSocketServer } from "./connections/WebSocketServerMock";

import { StorageModule } from "./modules/StorageModule";
import { MockCacheModule } from "./modules/CacheModuleMock";
import { MockMedicalArticlesModule } from "./modules/MedicalArticlesModuleMock";
import { AnatomiesModule } from "./modules/AnatomiesModule";
import { MockSSOModule } from "./modules/SSOModuleMock";
import { CmsModule } from "./modules/CmsModuleMock";
import { SuggestionsModule } from "./modules/SuggestionssModuleMock";
import { MockFilesModule } from "./modules/FilesModuleMock";
import { MockSyncModule } from "./modules/SyncModuleMock";
import { MockLegalsModule } from "./modules/LegalsModuleMock";
import { MockTasksModule } from "./modules/TasksModuleMock";
import { MockLocationsModule } from "./modules/LocationsModuleMock";
import { MockHcpsModule } from "./modules/HcpsModuleMock";
import { MockAppointmentsModule } from "./modules/AppointmentsModuleMock";
import { MockScopesModule } from "./modules/ScopesModuleMock";
import { MockAuthModule } from "./modules/AuthModuleMock";
// import { MockMedicalGoalsModule } from "./modules/MedicalGoalsModuleMock";
// import { PatientGoalsModule } from "./modules/PatientGoalsModule";
// import { MockPatientAppointmentRemindersModule } from "./modules/PatientAppointmentRemindersModuleMock";
import { MockStaffMembersModule } from "./modules/StaffMembersModuleMock";
import { MockStatisticsModule } from "./modules/StatisticsModuleMock";
import { MockAppsModule } from "./modules/AppsModuleMock";
import { MockPatientsModule } from "./modules/PatientsModuleMock";
import { MockAppointmentBookingsModule } from "./modules/AppointmentBookingsModuleMock";
import { MockFormsModule } from "./modules/FormsModuleMock";
import { MockPaymentsModule } from "./modules/PaymentsModuleMock";
import { MockNetworkSearchModule } from "./modules/NetworkSearchModuleMock";
import { MockDynamicStatisticsModule } from "./modules/DynamicStatisticsModuleMock";
import { MockAgentModule } from "./modules/AgentModuleMock";
import { MockPatientAppModule } from "./modules/PatientAppModuleMock";
import { MockGeoModule } from "./modules/GeoModuleMock";
import { MockCoursesModule } from "./modules/CoursesModuleMock";
import { MockOpsActionsModule } from "./modules/OpsActionsModuleMock";
import { MockOpsArticlesModule } from "./modules/OpsArticlesModuleMock";
import { MockOpsResourcesModule } from "./modules/OpsResourcesModuleMock";
import { ActionsModuleMock } from "./modules/ActionsModuleMock";
import { MockBlogArticlesModule } from "./modules/BlogArticlesModuleMock";
import { MockNewsArticlesModule } from "./modules/NewsArticlesModuleMock";
import { MockDataCacheModule } from "./modules/MockDataCacheModule";

export const modules = new ContainerModule((bind: interfaces.Bind) => {
  bind("NextClient").to(NextClient).inRequestScope();
  bind("interfaces.Newable<Session>").toConstructor(Session);

  bind("HttpConnection").to(HttpConnection).inRequestScope();
  bind("WebSocketConnection").to(MockWebSocketConnection).inRequestScope();
  bind("WebSocketServer").to(MockWebSocketServer).inRequestScope();

  bind("MockTasksModule").to(MockTasksModule).inRequestScope();
  bind("CoursesModule").to(MockCoursesModule).inRequestScope();
  bind("NewsModule").to(MockNewsArticlesModule).inRequestScope();
  bind("OpsActionsModule").to(MockOpsActionsModule).inRequestScope();
  bind("OpsArticlesModule").to(MockOpsArticlesModule).inRequestScope();
  bind("OpsResourcesModule").to(MockOpsResourcesModule).inRequestScope();
  bind("GeoModule").to(MockGeoModule).inRequestScope();
  bind("AuthModule").to(MockAuthModule).inRequestScope();
  bind("LocationsModule").to(MockLocationsModule).inRequestScope();
  bind("HcpsModule").to(MockHcpsModule).inRequestScope();
  bind("AppointmentsModule").to(MockAppointmentsModule).inRequestScope();
  bind("PatientsModule").to(MockPatientsModule).inRequestScope();
  bind("PatientAppModule").to(MockPatientAppModule).inRequestScope();
  bind("ScopesModule").to(MockScopesModule).inRequestScope();
  bind("StaffMembersModule").to(MockStaffMembersModule).inRequestScope();
  bind("StorageModule").to(StorageModule).inRequestScope();
  bind("MedicalArticlesModule").to(MockMedicalArticlesModule).inRequestScope();
  bind("AnatomiesModule").to(AnatomiesModule).inRequestScope();
  bind("PaymentsModule").to(MockPaymentsModule).inRequestScope();
  bind("CompanyHelpers").to(NextCompanyHelpers).inRequestScope();
  bind("LegalsModule").to(MockLegalsModule).inRequestScope();
  bind("CmsModule").to(CmsModule).inRequestScope();
  bind("SuggestionsModule").to(SuggestionsModule);
  bind("ActionsModule").to(ActionsModuleMock).inRequestScope();
  bind("FilesModule").to(MockFilesModule);
  // bind("MedicalGoalsModule").to(MockMedicalGoalsModule).inRequestScope();
  // bind("PatientGoalsModule").to(PatientGoalsModule).inRequestScope();
  // bind("PatientAppointmentRemindersModule")
  //   .to(MockPatientAppointmentRemindersModule)
  //   .inRequestScope();
  bind("StatisticsModule").to(MockStatisticsModule).inRequestScope();
  bind("SyncModule").to(MockSyncModule).inRequestScope();
  bind("AppsModule").to(MockAppsModule).inRequestScope();
  bind("BlogModule").to(MockBlogArticlesModule).inRequestScope();
  bind("AppointmentBookingsModule")
    .to(MockAppointmentBookingsModule)
    .inRequestScope();
  bind("FormsModule").to(MockFormsModule).inRequestScope();
  bind("CacheModule").to(MockCacheModule).inRequestScope();
  bind("NetworkSearchModule").to(MockNetworkSearchModule).inRequestScope();
  bind("DynamicStatisticsModule")
    .to(MockDynamicStatisticsModule)
    .inRequestScope();
  bind("AgentModule").to(MockAgentModule).inRequestScope();
  bind("SSOModule").to(MockSSOModule).inRequestScope();
  bind("TasksModule").to(MockTasksModule).inRequestScope();

  bind("MockConfiguration").to(MockConfiguration).inRequestScope();
  bind("MockDataCacheModule").to(MockDataCacheModule).inRequestScope();
});

export function createMockContainer(): Container {
  const container = new Container();
  container.load(modules);

  // apply middleware
  // logger: Displays the dependency tree
  // const inverisfyLogger = makeLoggerMiddleware();
  // container.applyMiddleware(inverisfyLogger);

  return container;
}
