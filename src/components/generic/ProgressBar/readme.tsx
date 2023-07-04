import * as React from "react";

import { ProgressBar } from ".";
import { HStack } from "../../structure/HStack";
import { VStack } from "../../structure/VStack";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { useState } from "react";

export const DemoStandard = () => {
  const sizes = [null, "xs", "sm", "md", "lg"];
  const [, setRerender] = useState<number>(Math.random());
  const rerender = () => setRerender(Math.random());

  return (
    <VStack>
      <p>
        <button onClick={rerender}>Toggle</button>
      </p>
      <>
        <p>Single value</p>
        <ProgressBar progress={Math.random()} />
        <p>Multi value</p>
        <ProgressBar
          progress={[
            { progress: Math.random(), state: TColorVariants.Success },
            { progress: Math.random(), state: TColorVariants.Danger },
            { progress: Math.random(), state: TColorVariants.Info },
            { progress: Math.random(), state: TColorVariants.Warning },
          ]}
        />
      </>
      <>
        <p>Colour variations</p>
        {Object.values(TColorVariants).map((s) => (
          <span key={s}>
            <ProgressBar progress={[{ progress: Math.random(), state: s }]} />
          </span>
        ))}
      </>
      <>
        <p>Size variations</p>
        {sizes.map((s) => (
          <span key={s}>
            <ProgressBar size={s as EStandardSizes} progress={Math.random()} />
          </span>
        ))}
      </>
    </VStack>
  );
};
