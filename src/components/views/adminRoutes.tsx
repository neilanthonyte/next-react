import * as React from "react";

import { TPermissions } from "next-shared/src/types/permissions";
import { IMainViewRoute } from "../structure/MainView";
import { NextAdminSideBar } from "./NextAdminSideBar";
import { NextAdminUsersView } from "./NextAdminUsersView";
import { NextAdminUtilsView } from "./NextAdminUtilsView";
import { StaffMemberPanel } from "./StaffMemberPanel";

export const nextAdminPaths = {
  root: "/admin",
  tools: "/tools",
  users: "/users",
};

export const nextAdminRoutes: IMainViewRoute[] = [
  {
    icon: "nav-system",
    label: "Admin",
    path: nextAdminPaths.root,
    menu: NextAdminSideBar,
    permission: TPermissions.SystemAdmin,
    routes: [
      // {
      //   path: nextAdminPaths.tools,
      //   component: NextAdminUtilsView,
      // },
      {
        path: nextAdminPaths.users,
        // HACK required to have the panel work
        component: () => <NextAdminUsersView />,
        routes: [
          {
            path: "/:id",
            component: () => <StaffMemberPanel />,
          },
        ],
      },
    ],
  },
];
