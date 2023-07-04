import { EStandardSizes } from "next-shared/src/types/standardSizes";
import React, { useEffect, useState } from "react";
import { Checkbox, ECheckboxStatus } from ".";

import { useDebug } from "../../../debug/DemoWrapper";
import { HStack } from "../../structure/HStack";
import { VStack } from "../../structure/VStack";

export const DemoSizing = () => {
  useDebug({
    test: {
      componentName: "Checkbox",
      scenario: "sizing",
    },
  });

  return (
    <HStack>
      <span style={{ fontSize: "20px" }}>
        <Checkbox status={ECheckboxStatus.Unchecked} />
      </span>
      <span style={{ fontSize: "24px" }}>
        <Checkbox status={ECheckboxStatus.Unchecked} />
      </span>
      <span style={{ fontSize: "32px" }}>
        <Checkbox status={ECheckboxStatus.Unchecked} />
      </span>
    </HStack>
  );
};

export const DemoStatusAndStandardSizes = () => {
  useDebug({
    test: {
      componentName: "Checkbox",
      scenario: "status-standard-sizes",
    },
  });

  return (
    <VStack>
      {Object.values(ECheckboxStatus).map((status) => (
        <HStack key={status}>
          {Object.values(EStandardSizes).map((size) => (
            <Checkbox status={status} standardSize={size} key={size} />
          ))}
        </HStack>
      ))}
    </VStack>
  );
};

export const DemoCustomUncheckedIcon = () => {
  useDebug({
    test: {
      componentName: "Checkbox",
      scenario: "custom-unchecked-icon",
    },
  });

  return (
    <VStack>
      <div>
        <Checkbox
          status={ECheckboxStatus.Unchecked}
          standardSize={EStandardSizes.Medium}
        />
        Unchecked
      </div>
      <div>
        <Checkbox
          uncheckedIcon="info"
          status={ECheckboxStatus.Unchecked}
          standardSize={EStandardSizes.Medium}
        />
        Unchecked with custom icon <br />
      </div>
      <div>
        <Checkbox
          uncheckedIcon="info"
          status={ECheckboxStatus.Successful}
          standardSize={EStandardSizes.Medium}
        />
        Successful with custom icon (shouldn&apos;t show custom icon)
      </div>
    </VStack>
  );
};

export const DemoClick = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "Checkbox",
      scenario: "click",
    },
  });

  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    setOutput(isChecked);
  }, [isChecked]);

  return (
    <Checkbox
      status={
        isChecked ? ECheckboxStatus.Successful : ECheckboxStatus.Unchecked
      }
      standardSize={EStandardSizes.Large}
      onClick={() => setIsChecked((s) => !s)}
    />
  );
};
