import * as React from "react";

import { InputDecoration } from ".";
import { InputControls } from "../InputControls";
import { TLayoutDirections } from "next-shared/src/types/layouts";

export const DemoFull: React.FC = () => (
  <div data-test="InputDecoration-scenario-full">
    <InputDecoration
      label={"My input"}
      isRequired={true}
      description={"Some text to describe the purpose of the input"}
    >
      <InputControls
        onClearValue={() => {
          // TODO do something
        }}
      >
        <input type="text" />
      </InputControls>
    </InputDecoration>
  </div>
);

export const DemoMinimal: React.FC = () => (
  <div data-test="InputDecoration-scenario-minimal">
    <InputDecoration label={"My input"}>
      <input type="text" />
    </InputDecoration>
  </div>
);

export const DemoLayout: React.FC = () => {
  const layouts = Object.keys(TLayoutDirections);

  return (
    <div data-test="InputDecoration-scenario-layoutDirection">
      {layouts.map((layout: "Row" | "Column") => (
        <>
          <div>
            <b data-test={`label-${TLayoutDirections[layout]}`}>{layout}</b>
          </div>
          <span data-test={`input-decoration-${TLayoutDirections[layout]}`}>
            <InputDecoration
              label={"My input"}
              description={"Some text to describe the purpose of the input"}
              layout={TLayoutDirections[layout]}
            >
              <input type="text" />
            </InputDecoration>
          </span>
        </>
      ))}
    </div>
  );
};

export const DemoImage: React.FC = () => (
  <div>
    <InputDecoration
      label="My input"
      description="My description. Dolor esse consequat et eiusmod dolor quis deserunt. Occaecat incididunt nulla duis mollit sunt aute est veniam elit id. Officia elit aliquip eu qui et culpa laboris ipsum veniam cupidatat eu. Amet sit eu cillum cupidatat ad officia. Dolor esse consequat et eiusmod dolor quis deserunt. Occaecat incididunt nulla duis mollit sunt aute est veniam elit id. Officia elit aliquip eu qui et culpa laboris. Dolor esse consequat et eiusmod dolor quis deserunt. Occaecat incididunt nulla duis mollit sunt aute est veniam elit id. Officia elit aliquip eu qui et culpa laboris ipsum veniam cupidatat eu. Amet sit eu cillum cupidatat ad officia."
      descriptionImageUrl="https://d1qr34qzhiwpdo.cloudfront.net/form-instructions-medicare-card.png"
    >
      <input type="text" />
    </InputDecoration>
  </div>
);
