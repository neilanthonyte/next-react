import * as React from "react";

import { HStack, Solid } from ".";
import { Card, CardBody } from "../Card";

export const DemoStandard = () => {
  return (
    <HStack>
      <input type="text" value="Hello" />
      <input type="text" value="Hello" />
    </HStack>
  );
};

export const DemoSolid = () => {
  return (
    <HStack>
      <input type="text" value="Hello" />
      <Solid>
        <input type="text" value="Hello" />
      </Solid>
    </HStack>
  );
};

export const DemoCard = () => {
  return (
    <Card>
      <CardBody>
        <HStack>
          <input type="text" value="Hello" />
          <input type="text" value="Hello" />
        </HStack>
      </CardBody>
    </Card>
  );
};
