import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import { TPermissions } from "next-shared/src/types/permissions";

export interface IFilterableRoute {
  path?: string;
  permission?: string;
}

/**
 * Filters out routes based on the session given.
 */
export const filterOutUnauthorizedRoutes = <
  T extends IFilterableRoute = IFilterableRoute,
>(
  routes: T[],
  session: Session,
): T[] => {
  return routes.filter((r) => {
    if (!r.permission) {
      return true;
    }

    if (!session) {
      console.warn(
        `Session not ready, cannot verify that user has permissions to see route: ${r.path}`,
      );
      return false;
    }

    if (!session.permissions) {
      console.warn(
        `No permissions exist on the session, something has likely gone wrong.`,
      );
      return false;
    }

    if (r.permission === TPermissions.EhrStaffOnly) {
      return !!session.staffMember.ehrId;
    }

    const hasPermissionToSeeRoute = session.permissions.includes(r.permission);

    if (!hasPermissionToSeeRoute) {
      // if this becomes a common pattern, we probably don't want to warn!
      console.warn("user does not have permission to see route", r.path);
    }

    return hasPermissionToSeeRoute;
  });
};
