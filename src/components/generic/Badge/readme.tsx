import * as React from "react";
import * as _ from "lodash";

import { Badge, TBadgeSize } from ".";
import { VStack } from "../../structure/VStack";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

const sizes: TBadgeSize[] = [null, "sm", "md", "lg"];
const colours: string[] = [
  "#404040",
  "#1F85DE",
  "#09C727",
  "#DD3838",
  "#DDD038",
  "#7438DD",
  "#EA9108",
  "#08D1EA",
];

export const DemoStandard = () => {
  return (
    <VStack>
      <p>Variants</p>
      <div>
        {Object.values(TColorVariants).map((v) => (
          <>
            <Badge variant={v}>{_.capitalize(v) || "Default"}</Badge>{" "}
          </>
        ))}
      </div>
      <p>Variants with icons</p>
      <div>
        {Object.values(TColorVariants).map((v) => (
          <>
            <Badge icon={"close"} variant={v}>
              {_.capitalize(v) || "Default"}
            </Badge>{" "}
          </>
        ))}
      </div>
      <p>Custom colours - for special cases only</p>
      <div>
        {colours.map((c) => (
          <>
            <Badge icon={"close"} hexColor={c}>
              Colour: {c}
            </Badge>{" "}
          </>
        ))}
      </div>
      <p>Sizes</p>
      <div>
        {sizes.map((s) => (
          <Badge key={s} size={s}>
            {_.capitalize(s) || "Default"}
          </Badge>
        ))}
      </div>
    </VStack>
  );
};
