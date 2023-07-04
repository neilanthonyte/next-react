import * as React from "react";
import { useState } from "react";
import * as faker from "faker";

import {
  FlowSummary,
  FlowSummaryDestopHeader,
  FlowSummaryExpanded,
  FlowInlineSummaryMobile,
} from "./";
import { Button } from "../../generic/Button";
import { Icon } from "../../generic/Icon";
import { CardBody, Card } from "../Card";
import { CellBody, CellHeader, CellDescription, Cell } from "../Cell";
import { VStack } from "../VStack";

const Item = ({ content = faker.lorem.words(10) }) => (
  <Card>
    <CardBody>
      <Cell>
        <CellBody>
          <CellHeader>{faker.lorem.words(5)}</CellHeader>
          <CellDescription>{content}</CellDescription>
        </CellBody>
      </Cell>
    </CardBody>
  </Card>
);

/**
 * Includes back button, one section and icons. Auto-reverts to mobile on small window widths.
 */
export const DemoDesktop = () => {
  // This is a helper to demonstrate element positioning in desktop usage
  const [positioning, setPositioning] = useState(false);
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div data-test="scenario-basic-next">
      <FlowSummary open={open} fixedPositioning={positioning} variant="desktop">
        <FlowSummaryDestopHeader>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </FlowSummaryDestopHeader>
        <FlowSummaryExpanded>
          <VStack>
            <Item content={"Location"} />
            <Item />
            <Item />
          </VStack>
        </FlowSummaryExpanded>
      </FlowSummary>
      <div className="debug">
        <button onClick={() => setPositioning(!positioning)}>
          Fixed / absolute
        </button>{" "}
        <button onClick={() => setOpen(!open)}>Open / closed</button>
      </div>
    </div>
  );
};

export const DemoMobile = () => {
  // This is a helper to demonstrate element positioning in desktop usage
  const [positioning, setPositioning] = useState(false);
  const [open, setOpen] = useState<boolean>(true);

  return (
    <div data-test="scenario-basic-next">
      <FlowSummary open={open} fixedPositioning={positioning} variant="mobile">
        <FlowSummaryDestopHeader>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </FlowSummaryDestopHeader>
        <FlowSummaryExpanded>
          <VStack>
            <Item />
            <Item />
            <Item />
          </VStack>
        </FlowSummaryExpanded>
        <FlowInlineSummaryMobile>
          <Icon name="chevron-right" />
          <Icon name="chevron-right" />
          <Icon name="chevron-right" />
        </FlowInlineSummaryMobile>
      </FlowSummary>
      <div className="debug">
        <button onClick={() => setPositioning(!positioning)}>
          Fixed / absolute
        </button>{" "}
        <button onClick={() => setOpen(!open)}>Open / closed</button>
      </div>
    </div>
  );
};
