import * as React from "react";

import { LinearViews } from "../components/LinearViews";
import { SidePanelViews } from "../components/SidePanelViews";

export const prepViews = (routes: any, fixedPositioning: boolean = false) =>
  routes.map((route: any) => {
    if (route.routes) {
      // pre-process and pull out panels
      const subRoutes = route.routes.map((r: any) => {
        if (r.routes) {
          const Component = () => (
            <>
              {r.component()}
              <SidePanelViews
                routes={r.routes}
                fixedPositioning={fixedPositioning}
              />
            </>
          );
          return {
            ...r,
            component: Component,
          };
        }
        return r;
      });

      const SubViews = () => (
        <LinearViews routes={subRoutes} routingLevel={2} />
      );
      return {
        ...route,
        component: SubViews,
      };
    }
    return { ...route };
  });
