import * as React from "react";
import { useState } from "react";

import { ScopeMainViewDecoration } from ".";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { IMainViewDecorationAction } from "../../structure/MainViewDecoration";

interface IInnerProps {
  actions: null | IMainViewDecorationAction[];
}

const Inner: React.FC<IInnerProps> = ({ actions }) => {
  return <ScopeMainViewDecoration actions={actions} />;
};

export const Demo = () => {
  return (
    <MockNextApiClient>
      <Inner actions={null} />
    </MockNextApiClient>
  );
};

export const DemoActions = () => {
  const [click, setClick] = useState(0);
  const actions = [
    {
      icon: "plus",
      onClick: () => setClick(click + 1),
    },
  ];

  return (
    <MockNextApiClient>
      <Inner actions={actions} />
      <div className="debug">
        Action button has been clicked <b data-test="counter">{click}</b> times!
      </div>
    </MockNextApiClient>
  );
};

export const DemoMultipleActions = () => {
  const [clickCount, setClickCount] = useState(0);
  const [width, setWidth] = useState(250);
  const actions = [
    {
      icon: "otoscope",
      onClick: () => setClickCount(clickCount + 1),
    },
    {
      icon: "logout",
      onClick: () => setClickCount(clickCount + 1),
    },
  ];

  return (
    <MockNextApiClient>
      <div data-test="Session-width-changes">
        <div style={{ width: `${width}px` }}>
          <Inner actions={actions} />
        </div>
        <div className="debug">
          <label htmlFor="width">Session Bar width (200-1000):</label>
          <input
            data-test="input"
            type="range"
            id="width"
            name="width"
            min="250"
            max="1000"
            onChange={(ev) => {
              const value = ev.target.value;
              setWidth(Number(value));
            }}
            value={width}
          />
          <div>
            Action button has been clicked <b>{clickCount}</b> times!
          </div>
        </div>
      </div>
    </MockNextApiClient>
  );
};
