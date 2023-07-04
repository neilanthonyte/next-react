import { nextAdminRoutes } from "../../../../components/views/adminRoutes";
import { coursesRoutes } from "../../../../components/views/coursesRoutes";
import { opsActionsRoutes } from "../../../../components/views/opsActionsRoutes";
import {
  opsArticlesRoutes,
  opsResourcesRoutes,
} from "../../../../components/views/opsRoutes";
import { checklistRoutes } from "../../../../components/views/opsTasksRoutes";
import {
  contentRoutes,
  hiddenRoutes,
  homeRoutes,
  systemRoutes,
} from "../../../../components/views/routes";
import { networkNewsRoutes } from "../../../../components/views/routesNews";

export const managerRoutes = [].concat(
  homeRoutes,
  checklistRoutes,
  opsActionsRoutes,
  // performanceRoutes,
  networkNewsRoutes,
  opsArticlesRoutes,
  opsResourcesRoutes,
  coursesRoutes,
  contentRoutes,
  systemRoutes,
  nextAdminRoutes,
  hiddenRoutes,
);
