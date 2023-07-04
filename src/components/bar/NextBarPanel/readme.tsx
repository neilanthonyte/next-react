import * as React from "react";
import * as faker from "faker";
import { useState, useMemo } from "react";

import {
  NextBarPanel,
  NextBarPanelInfoPane,
  NextBarPanelInfoPaneTitle,
  NextBarPanelInfoPaneBody,
  NextBarPanelContentPane,
  IBarAction,
} from ".";
import { Grid } from "../../structure/Grid";
import { Card, CardBody } from "../../structure/Card";
import { Cell, CellHeader, CellDescription } from "../../structure/Cell";
import { DebugPosition } from "../../../debug/DebugPosition";

export const Inner = () => {
  const [action, setAction] = useState<string>(null);

  const actions: IBarAction[] = [
    {
      label: "Action 1",
      disabled: false,
      onClick: () => setAction("first button"),
    },
    {
      label: "Action 2",
      variant: "primary",
      disabled: false,
      onClick: () => setAction("second button"),
    },
    {
      label: "You won't see me",
      disabled: true,
      onClick: () => setAction(faker.hacker.phrase()),
    },
  ];

  const randomText = useMemo(() => faker.lorem.words(10), []);
  const [isFixed, setIsFixed] = useState(false);

  const toggleFixed = () => {
    setIsFixed(!isFixed);
  };

  return (
    <>
      <DebugPosition fixed={isFixed}>
        <NextBarPanel>
          <NextBarPanelInfoPane actions={actions}>
            <NextBarPanelInfoPaneTitle>The Bar Title</NextBarPanelInfoPaneTitle>
            <NextBarPanelInfoPaneBody>{randomText}</NextBarPanelInfoPaneBody>
          </NextBarPanelInfoPane>
          <NextBarPanelContentPane>
            <Grid fullHeight={true}>
              <Card>
                <CardBody>
                  <Cell>
                    <CellHeader>My Card</CellHeader>
                    <CellDescription>
                      Quis ullamco occaecat dolore dolore.
                    </CellDescription>
                  </Cell>
                </CardBody>
              </Card>
              <Card>
                <CardBody>
                  <Cell>
                    <CellHeader>My Card</CellHeader>
                    <CellDescription>
                      Quis ullamco occaecat dolore dolore.
                    </CellDescription>
                  </Cell>
                </CardBody>
              </Card>
            </Grid>
          </NextBarPanelContentPane>
        </NextBarPanel>
      </DebugPosition>
      <div className="debug">
        <p>Action: {action}</p>
        <p>
          Position:{" "}
          <button onClick={toggleFixed}>
            {isFixed ? "relative" : "fixed"}
          </button>
        </p>
      </div>
    </>
  );
};

export const DemoStandard = () => <Inner />;

export const DemoEmpty = () => {
  return (
    <NextBarPanel>
      <NextBarPanelInfoPane>
        <NextBarPanelInfoPaneTitle>
          {faker.lorem.words(8)}
        </NextBarPanelInfoPaneTitle>
      </NextBarPanelInfoPane>
      <NextBarPanelContentPane>
        {faker.lorem.words(100)}
      </NextBarPanelContentPane>
    </NextBarPanel>
  );
};
