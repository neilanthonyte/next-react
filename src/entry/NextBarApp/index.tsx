import * as React from "react";
import { useContext } from "react";
import { HashRouter } from "react-router-dom";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

import { ToastController } from "../../components/generic/Toast";
import { ActiveTimeHandler } from "../../components/handlers/ActiveTimeHandler";
import { NextBarView } from "../../components/views/NextBarView";
import { useNextBarAppTabsForApp } from "./useNextBarAppTabsForApp";
import { useNextBarAppTabsForStaffMember } from "./useNextBarAppTabsForStaffMember";
import {
  NextBarContext,
  NextBarHandler,
} from "../../components/handlers/NextBarHandler";
import { IFilterableRoute } from "next-react/src/components/structure/MainView/helpers/filterOutUnAuthorizedRoutes";

export interface INextBarTab extends IFilterableRoute {
  icon: string;
  label: string;
  component: React.FC;
  disabled?: boolean;
  badge?: string | number;
  badgeVariant?: TColorVariants;
  /** Should be shown in the tab bar */
  hidden?: boolean;
  /** A name to find this tab by */
  name?: string;
}

/**
 * App component rendering a utility bar to aid ehr medical and non-medical staff
 */
export const NextBarApp: React.FC = () => {
  return (
    <>
      {/* used by the Helix watcher - TODO remove */}
      <ToastController />
      <HashRouter>
        <NextBarHandler>
          <ActiveTimeHandler>
            <Inner />
          </ActiveTimeHandler>
        </NextBarHandler>
      </HashRouter>
    </>
  );
};

const Inner: React.FC = () => {
  const { mode } = useContext(NextBarContext);
  switch (mode) {
    case "app":
      return <PractitionerBar />;
    case "staffMember":
      return <ManagerBar />;
    default:
      return <div>Please log into Helix</div>;
  }
};

const PractitionerBar: React.FC = () => {
  const practitionerTabs = useNextBarAppTabsForApp();
  return <NextBarView tabs={practitionerTabs} mode={"app"} />;
};

const ManagerBar: React.FC = () => {
  const staffMemberTabs = useNextBarAppTabsForStaffMember();
  return <NextBarView tabs={staffMemberTabs} mode={"staffMember"} />;
};
