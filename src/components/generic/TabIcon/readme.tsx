import * as React from "react";
import { TabIcon } from ".";
import { useState } from "react";

const Inner: React.FC = ({}) => {
  const [selected, setSelected] = useState(0);
  const [badgePayments, setBadgePayments] = useState(0);
  const [badgeInstructions, setBadgeInstructions] = useState(0);

  const icons = [
    {
      icon: "ipad-2",
      label: "Companions",
      disabled: false,
    },
    {
      icon: "lotus",
      label: "Payments",
      disabled: false,
      badge: badgePayments,
    },
    {
      icon: "faqs",
      label: "Settings",
      disabled: true,
    },
    {
      icon: "pencil",
      label: "Instructions",
      disabled: false,
      badge: badgeInstructions,
    },
    {
      icon: "drawer",
      label: "Letters",
      disabled: false,
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", backgroundColor: "black" }}>
        {icons.map((item, i) => (
          <div
            onClick={() => {
              if (!item.disabled) setSelected(i);
            }}
            key={i}
          >
            <TabIcon
              isSelected={selected == i}
              badge={item.badge}
              label={item.label}
              icon={item.icon}
              disabled={item.disabled}
            />
          </div>
        ))}
      </div>
      <div className={"debug"}>
        <button onClick={() => setBadgePayments(badgePayments + 1)}>
          Add outstanding payment
        </button>
        <button onClick={() => setBadgeInstructions(badgeInstructions + 1)}>
          Add outstanding instruction
        </button>
      </div>
    </div>
  );
};

export const Demo = () => {
  return <Inner />;
};
