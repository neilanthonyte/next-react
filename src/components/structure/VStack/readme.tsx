import * as React from "react";

import { VStack } from "./";
import { BlockButton } from "../../generic/Button";

export const Demo = () => (
  <VStack>
    <BlockButton>Top Button</BlockButton>
    <BlockButton>Middle Button</BlockButton>
    <BlockButton>Bottom Button</BlockButton>
  </VStack>
);
