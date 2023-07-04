import * as React from "react";
import { useEffect, useState } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { useDebug } from "../../../debug/DemoWrapper";
import { VStack } from "../../structure/VStack";
import { TextInput } from "../../inputs/TextInput";
import { InputDecoration } from "../InputDecoration";
import { AvatarInitials } from ".";

export const AVATAR_INITIALS_INPUT_TEST_SELECTOR = "initials-test-input";

export const DemoStandard = () => {
  const { setDebugElement } = useDebug({
    test: {
      componentName: "AvatarInitials",
      scenario: "standard",
    },
  });

  const [initials, setInitials] = useState<string>("RM");

  useEffect(() => {
    setDebugElement(
      <InputDecoration label="Initials">
        <div data-test={AVATAR_INITIALS_INPUT_TEST_SELECTOR}>
          <TextInput value={initials} onInputChange={setInitials} />
        </div>
      </InputDecoration>,
    );
  }, [initials]);

  return (
    <VStack>
      {Object.values(EStandardSizes).map((size) => (
        <AvatarInitials initials={initials} stdSize={size} key={size} />
      ))}
    </VStack>
  );
};
