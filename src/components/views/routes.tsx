import * as React from "react";
import { TPermissions } from "next-shared/src/types/permissions";
import {
  MedicalArticlesSideBar,
  MedicalArticlesView,
} from "../medical-articles/MedicalArticlesView";
import {
  MedicalArticleSideBar,
  MedicalArticleView,
} from "../medical-articles/MedicalArticleView";
import { IMainViewRoute } from "../structure/MainView";
import { BookingView } from "./BookingView";
import { ContentEditorView } from "./ContentEditorView";
import { ManagerDashboardView } from "./ManagerDashboardView";
import { NextLocationContentView } from "./NextLocationContentView";
import { NextPerformanceView } from "./NextPerformanceView";
import { NextSystemView } from "./NextSystemView";
import { operationsPaths } from "./opsRoutes";
import { ScopeView } from "./ScopeView";

export const nextPaths = {
  medicalArticles: "/medical-articles",
  appointments: "/bookings",
  hcps: "/hcps",
  performance: "/performance",
};

/**
 * Next paths relating to the system view.
 */
export const nextSystemPaths = {
  systemRoot: "/system",
  systemScopes: "/scopes",
  systemScope: "/:scopeId",
  generateSystemScopePath: (scopeId: string) => `/system/scopes/${scopeId}`,
};

export const hiddenRoutes = [
  {
    hidden: true,
    path: nextPaths.medicalArticles,
    menu: MedicalArticlesSideBar,
    routes: [
      {
        path: "/",
        component: MedicalArticlesView,
      },
      {
        path: "/:slug",
        menu: MedicalArticleSideBar,
        component: MedicalArticleView,
      },
    ],
  },
  {
    hidden: true,
    path: nextPaths.appointments,
    component: BookingView,
  },
];

export const contentRoutes = [
  {
    icon: "nav-content",
    label: "Content",
    path: "/cms",
    routes: [
      {
        path: "/",
        component: NextLocationContentView,
      },
      {
        path: "/:type/:slug?",
        component: () => <ContentEditorView backPath="/cms" />,
        focus: {
          path: "/cms",
        },
      },
    ],
  },
];

export const systemRoutes = [
  {
    icon: "nav-system",
    label: "System management",
    path: nextSystemPaths.systemRoot,
    permission: TPermissions.EhrStaffOnly,
    routes: [
      {
        path: nextSystemPaths.systemScopes,
        component: () => <NextSystemView />,
        routes: [
          {
            path: nextSystemPaths.systemScope,
            component: () => <ScopeView />,
          },
        ],
      },
    ],
  },
];

export const homeRoutes = [
  {
    icon: "nav-home",
    label: "Home",
    path: operationsPaths.home,
    component: ManagerDashboardView,
  },
];

export const performanceRoutes: IMainViewRoute[] = [
  {
    icon: "nav-performance",
    label: "Performance",
    path: nextPaths.performance,
    component: NextPerformanceView,
    permission: TPermissions.SystemAdmin,
  },
];
