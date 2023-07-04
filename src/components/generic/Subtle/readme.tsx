import * as React from "react";

import { Subtle } from ".";
import { VStack } from "../../structure/VStack";

export const DemoStandard = () => {
  return (
    <VStack>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
        blanditiis consectetur voluptatem consequatur voluptate hic, ipsa autem
        quidem reiciendis et eum mollitia exercitationem sunt beatae at
        laudantium quia! Perferendis, necessitatibus.
      </p>
      <h4>Subtle:</h4>
      <Subtle>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
          blanditiis consectetur voluptatem consequatur voluptate hic, ipsa
          autem quidem reiciendis et eum mollitia exercitationem sunt beatae at
          laudantium quia! Perferendis, necessitatibus.
        </p>
      </Subtle>
    </VStack>
  );
};
