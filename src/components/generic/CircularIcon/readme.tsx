import * as React from "react";
import { useState } from "react";

import { CircularIcon } from ".";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { VStack } from "../../structure/VStack";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

/**
 * Added background color to divs to test transparent version
 */
export const DemoStandard = () => {
  return (
    <VStack>
      <h3>Variants</h3>
      <div style={{ backgroundColor: "lightcoral" }}>
        {Object.values(TColorVariants).map((v: TColorVariants) => (
          <>
            <CircularIcon
              variant={v}
              size={EStandardSizes.Medium}
              name="close"
              subtle={true}
            />{" "}
          </>
        ))}
      </div>
      <div style={{ backgroundColor: "lightcoral" }}>
        {Object.values(TColorVariants).map((v: TColorVariants) => (
          <>
            <CircularIcon
              variant={v}
              size={EStandardSizes.Medium}
              name="close"
              subtle={false}
            />{" "}
          </>
        ))}
      </div>
      <h3>Standard sizes</h3>
      <div style={{ backgroundColor: "lightcoral" }}>
        {Object.values(EStandardSizes).map((v: EStandardSizes) => (
          <>
            <CircularIcon size={v} name="close" />{" "}
          </>
        ))}
      </div>
      <h3>Font-based sizes</h3>
      <div style={{ backgroundColor: "lightcoral" }}>
        <span style={{ fontSize: "10pt" }}>
          <CircularIcon name="tick" />
        </span>
        <span style={{ fontSize: "20pt" }}>
          <CircularIcon name="cancel" />
        </span>
        <span style={{ fontSize: "40pt" }}>
          <CircularIcon name="cancel" />
        </span>
      </div>
    </VStack>
  );
};

export const DemoToggle = () => {
  const [active, setActive] = useState<any>();

  return (
    <>
      <CircularIcon
        size={EStandardSizes.Medium}
        name="close"
        isActive={active}
      />
      <CircularIcon
        size={EStandardSizes.Medium}
        name="close"
        isActive={!active}
      />
      <p>
        <a onClick={() => setActive(active)}>Toggle active</a>
      </p>
    </>
  );
};

export const DemoClick = () => {
  const [action, setAction] = useState<any>();

  return (
    <div data-test="CircularIcon-scenario-click">
      <CircularIcon
        size={EStandardSizes.Medium}
        name="close"
        onClick={() => setAction("Click")}
      />
      <h4 style={{ marginTop: "32px" }}>
        Selected action: <span data-test="label">{action}</span>
      </h4>
    </div>
  );
};
