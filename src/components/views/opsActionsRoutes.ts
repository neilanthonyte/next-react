import { ActionsSideBar } from "../ops-actions/OpsActionsSideBar";
import { IMainViewRoute } from "../structure/MainView";
import { OpsActionsView } from "./OpsActionsView";

export const opsActionsPaths = {
  actions: "/issues",
};

export const opsActionsRoutes: IMainViewRoute[] = [
  {
    icon: "nav-issues",
    label: "Issues",
    path: opsActionsPaths.actions,
    component: OpsActionsView,
    menu: ActionsSideBar,
  },
];
