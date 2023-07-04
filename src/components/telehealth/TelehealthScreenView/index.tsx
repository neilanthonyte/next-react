import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { useIsScreenBelowThreshold } from "../../../hooks/useIsScreenBelowThreshold";
import { ITabbedNavItem, TabbedNav } from "../../generic/TabbedNav";
import { CircularIcon } from "../../generic/CircularIcon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "TelehealthScreenView");

// TODO move to a hook to get notifications updates
const telehealthTabs: ITabbedNavItem[] = [
  {
    icon: "manage",
    label: "Manage",
    contentComponent: () => <h2>Manage</h2>,
  },

  {
    icon: "chat",
    label: "Live feed",
    contentComponent: () => <h2>Live feed</h2>,
  },
];

export interface ITelehealthScreenViewProps {
  canToggleSize?: boolean;
}

/**
 * Top level component holding main logic and state of the telehealth screen
 * Manages re-arrangement of layout based on screen size
 */
export const TelehealthScreenView: React.FC<ITelehealthScreenViewProps> = ({
  canToggleSize = false,
}) => {
  const useSmallScreenLayout = useIsScreenBelowThreshold(1024);

  const [activeTabIndex, setActiveTabIndex] = useState<number>();
  const [isMinimised, setIsMinimised] = useState<boolean>(false);

  const showMinifyOption = canToggleSize && !useSmallScreenLayout;

  useEffect(() => {
    if (!useSmallScreenLayout && !activeTabIndex) {
      setActiveTabIndex(0);
    }
  }, [useSmallScreenLayout, activeTabIndex]);

  const handleOnTabClick = useCallback(
    (tabIndex: number) => {
      if (useSmallScreenLayout && tabIndex === activeTabIndex) {
        setActiveTabIndex(undefined);
        return;
      }
      setActiveTabIndex(tabIndex);
    },
    [useSmallScreenLayout, activeTabIndex],
  );

  const activePanel = telehealthTabs[activeTabIndex];

  return (
    <div
      className={css("", { "-minimised": isMinimised })}
      data-test="telehealth-screen-view"
    >
      <div
        className={css("main", {
          "-shrink": useSmallScreenLayout && activeTabIndex >= 0,
        })}
      >
        {showMinifyOption && (
          <div className={css("toggleSize")} data-test="toggle-size">
            <CircularIcon
              name={"close"}
              size={EStandardSizes.ExtraSmall}
              onClick={() => setIsMinimised(!isMinimised)}
            />
          </div>
        )}
        <MainPlaceholder>
          <h2>Placeholder</h2>
        </MainPlaceholder>
      </div>

      <div
        className={css("panel", {
          "-open": useSmallScreenLayout && activeTabIndex >= 0,
        })}
        data-test="panel"
      >
        {useSmallScreenLayout && (
          <div className={css("panels_close")} data-test="close-panel">
            <CircularIcon
              name={"close"}
              size={EStandardSizes.ExtraSmall}
              onClick={() => setActiveTabIndex(undefined)}
            />
          </div>
        )}
        {activePanel && <activePanel.contentComponent />}
      </div>

      <div className={css("tabs")} data-test="tabs">
        <TabbedNav
          tabbedNavItems={telehealthTabs}
          onTabClick={handleOnTabClick}
          activeTabIndex={activeTabIndex}
        />
      </div>
    </div>
  );
};

export const MainPlaceholder: React.FC = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "darkslategray",
        padding: "16px",
        width: "100%",
        height: "100%",
      }}
    >
      {children}
    </div>
  );
};
