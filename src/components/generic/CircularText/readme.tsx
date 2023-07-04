import * as React from "react";

import { CircularText } from ".";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

export const Demo = () => {
  return (
    <>
      <h4>Adaptive</h4>
      <div>
        <CircularText>Hello</CircularText>
      </div>
      <br />
      <h4>Standard sizes</h4>
      <div>
        <CircularText size={EStandardSizes.ExtraSmall}>Hello</CircularText>
        <CircularText size={EStandardSizes.Small}>Hello</CircularText>
        <CircularText size={EStandardSizes.Medium}>Hello</CircularText>
        <CircularText size={EStandardSizes.Large}>Hello</CircularText>
      </div>
    </>
  );
};
