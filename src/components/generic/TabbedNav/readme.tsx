import * as React from "react";
import { useState } from "react";

import { EColorScheme } from "next-shared/src/types/colorScheme";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

import { useDebug } from "../../../debug/DemoWrapper";
import { ITabbedNavItem, TabbedNav } from ".";

export const testTabbedNavItems: ITabbedNavItem[] = [
  {
    icon: "ipad-2",
    label: "Companions",
    isDisabled: false,
    contentComponent: () => <h2>Companions</h2>,
  },
  {
    icon: "lotus",
    label: "Payments",
    isDisabled: false,
    notifications: 2,
    contentComponent: () => <h2>Payments</h2>,
  },
  {
    icon: "faqs",
    label: "Settings",
    isDisabled: true,
    contentComponent: () => <h2>Settings</h2>,
  },
  {
    icon: "pencil",
    label: "Instructions",
    isDisabled: false,
    notifications: 4,
    contentComponent: () => <h2>Instructions</h2>,
  },
  {
    icon: "drawer",
    label: "Letters",
    isDisabled: false,
    badge: "Message",
    badgeVariant: TColorVariants.Info,
    contentComponent: () => <h2>Letters</h2>,
  },
];

export const DemoStandard = () => {
  useDebug({
    test: {
      componentName: "TabbedNav",
      scenario: "standard",
    },
  });

  const [activetabindex, setActiveTabIndex] = useState<number>();

  return (
    <>
      <div>
        <TabbedNav
          tabbedNavItems={testTabbedNavItems}
          activeTabIndex={activetabindex}
          onTabClick={setActiveTabIndex}
        />
      </div>
      <div>
        <TabbedNav
          activeTabIndex={activetabindex}
          onTabClick={setActiveTabIndex}
          tabbedNavItems={testTabbedNavItems}
          colorScheme={EColorScheme.Dark}
        />
      </div>
    </>
  );
};
