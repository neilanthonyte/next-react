import "reflect-metadata";
import { Container, ContainerModule, interfaces } from "inversify";

import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import { NextLocation } from "next-shared/src/models/NextLocation";

import { HttpConnection } from "./connections/HttpConnection";
import { WebSocketConnection } from "./connections/WebSocketConnection";

import { NextClient } from "./NextClient";

import { SSOModule } from "./modules/SSOModule";
import { OpsResourcesModule } from "./modules/OpsResourcesModule";
import { OpsArticlesModule } from "./modules/OpsArticlesModule";
import { FilesModule } from "./modules/FilesModule";
import { OpsActionsModule } from "./modules/OpsActionsModule";
import { TasksModule } from "./modules/TasksModule";
import { CmsModule } from "./modules/CmsModule";
import { SuggestionsModule } from "./modules/SuggestionsModule";
import { SyncModule } from "./modules/SyncModule";
import { CoursesModule } from "./modules/CoursesModule";
import { GeoModule } from "./modules/GeoModule";
import { CacheModule } from "./modules/CacheModule";
import { LocationsModule } from "./modules/LocationsModule";
import { HcpsModule } from "./modules/HcpsModule";
import { AppointmentsModule } from "./modules/AppointmentsModule";
import { AuthModule } from "./modules/AuthModule";
import { PatientsModule } from "./modules/PatientsModule";
import { ScopesModule } from "./modules/ScopesModule";
import { AppsModule } from "./modules/AppsModule";
import { StaffMembersModule } from "./modules/StaffMembersModule";
import { StorageModule } from "./modules/StorageModule";
import { MedicalArticlesModule } from "./modules/MedicalArticlesModule";
import { PatientAppModule } from "./modules/PatientAppModule";
import { AnatomiesModule } from "./modules/AnatomiesModule";
import { PaymentsModule } from "./modules/PaymentsModule";
import { NextCompanyHelpers } from "./NextCompanyHelpers";
import { LegalsModule } from "./modules/LegalsModule";
import { ActionsModule } from "./modules/ActionsModule";
import { PatientGoalsModule } from "./modules/PatientGoalsModule";
import { StatisticsModule } from "./modules/StatisticsModule";
import { AppointmentBookingsModule } from "./modules/AppointmentBookingsModule";
import { FormsModule } from "./modules/FormsModule";
import { NetworkSearchModule } from "./modules/NetworkSearchModule";
import { DynamicStatisticsModule } from "./modules/DynamicStatisticsModule";
import { AgentModule } from "./modules/AgentModule";
import { NewsArticlesModule } from "./modules/NewsArticlesModule";
import { BlogArticlesModule } from "./modules/BlogArticlesModule";
import { MockConfiguration } from "./MockConfiguration";
import { MockDataCacheModule } from "./modules/MockDataCacheModule";

export const modules = new ContainerModule((bind: interfaces.Bind) => {
  bind("NextClient").to(NextClient).inRequestScope();
  bind("HttpConnection").to(HttpConnection).inRequestScope();
  bind("WebSocketConnection").to(WebSocketConnection).inRequestScope();
  bind("interfaces.Newable<Session>").toConstructor(Session);
  bind("interfaces.Newable<Location>").toConstructor(NextLocation);
  bind("CompanyHelpers").to(NextCompanyHelpers).inRequestScope();
  bind("AuthModule").to(AuthModule).inRequestScope();
  bind("LocationsModule").to(LocationsModule).inRequestScope();
  bind("HcpsModule").to(HcpsModule).inRequestScope();
  bind("AppointmentsModule").to(AppointmentsModule).inRequestScope();
  bind("PatientsModule").to(PatientsModule).inRequestScope();
  bind("ScopesModule").to(ScopesModule).inRequestScope();
  bind("AppsModule").to(AppsModule).inRequestScope();
  bind("StaffMembersModule").to(StaffMembersModule).inRequestScope();
  bind("StorageModule").to(StorageModule).inRequestScope();
  bind("MedicalArticlesModule").to(MedicalArticlesModule).inRequestScope();
  bind("PatientAppModule").to(PatientAppModule).inRequestScope();
  bind("OpsResourcesModule").to(OpsResourcesModule).inRequestScope();
  bind("OpsArticlesModule").to(OpsArticlesModule).inRequestScope();
  bind("TasksModule").to(TasksModule).inRequestScope();
  bind("OpsActionsModule").to(OpsActionsModule).inRequestScope();
  bind("AnatomiesModule").to(AnatomiesModule).inRequestScope();
  bind("PaymentsModule").to(PaymentsModule).inRequestScope();
  bind("FilesModule").to(FilesModule).inRequestScope();
  bind("LegalsModule").to(LegalsModule).inRequestScope();
  bind("CmsModule").to(CmsModule).inRequestScope();
  bind("SuggestionsModule").to(SuggestionsModule);
  bind("ActionsModule").to(ActionsModule).inRequestScope();
  bind("PatientGoalsModule").to(PatientGoalsModule).inRequestScope();
  bind("StatisticsModule").to(StatisticsModule).inRequestScope();
  bind("SyncModule").to(SyncModule).inRequestScope();
  bind("NewsModule").to(NewsArticlesModule).inRequestScope();
  bind("CoursesModule").to(CoursesModule).inRequestScope();
  bind("BlogModule").to(BlogArticlesModule).inRequestScope();
  bind("AppointmentBookingsModule")
    .to(AppointmentBookingsModule)
    .inRequestScope();
  bind("GeoModule").to(GeoModule).inRequestScope();
  bind("FormsModule").to(FormsModule).inRequestScope();
  bind("CacheModule").to(CacheModule).inRequestScope();
  bind("NetworkSearchModule").to(NetworkSearchModule).inRequestScope();
  bind("DynamicStatisticsModule").to(DynamicStatisticsModule).inRequestScope();
  bind("AgentModule").to(AgentModule).inRequestScope();
  bind("SSOModule").to(SSOModule).inRequestScope();

  bind("MockConfiguration").to(MockConfiguration).inRequestScope();
  bind("MockDataCacheModule").to(MockDataCacheModule).inRequestScope();
});

export function createContainer(): Container {
  const container = new Container();
  container.load(modules);
  return container;
}
