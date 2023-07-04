import * as React from "react";
import { useState } from "react";

import { VStack } from "../../components/structure/VStack";
import { useIsScreenBelowThreshold } from ".";
import { NumberInput } from "../../components/inputs/NumberInput";
import { InputDecoration } from "../../components/generic/InputDecoration";

export const DemoStandard = () => {
  const [threshold, setThreshold] = useState<number>(768);
  const isBelowThreshold = useIsScreenBelowThreshold(threshold);

  return (
    <VStack>
      <InputDecoration label="Size threshold" isRequired>
        <NumberInput onInputChange={setThreshold} value={threshold} />
      </InputDecoration>
      <h2>Below threshold: {String(isBelowThreshold)}</h2>
    </VStack>
  );
};
