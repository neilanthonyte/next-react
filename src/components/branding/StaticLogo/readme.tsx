import React from "react";

import { useDebug } from "../../../debug/DemoWrapper";
import { VStack } from "../../structure/VStack";
import { StaticLogo } from ".";

export const DemoStandard = () => {
  useDebug({
    test: {
      componentName: "StaticLogo",
      scenario: "standard",
    },
  });

  const styleDefault = { height: "300px", padding: "10px" };
  const styleLight = { ...styleDefault, backgroundColor: "#eee" };
  const styleMid = { ...styleDefault, backgroundColor: "#ccc" };
  const styleDark = { ...styleDefault, backgroundColor: "#444" };

  return (
    <VStack>
      <h3>Landscape</h3>
      <div style={styleMid}>
        <StaticLogo variant="landscape" colorScheme="white" />
      </div>
      <div style={styleLight}>
        <StaticLogo variant="landscape" />
      </div>
      <h3>Square, SVG</h3>
      <div style={styleDark}>
        <StaticLogo colorScheme="light" />
      </div>
      <div style={styleMid}>
        <StaticLogo colorScheme="color" />
      </div>
      <div style={styleLight}>
        <StaticLogo colorScheme="dark" />
      </div>
      <h3>Square, PNG</h3>
      <div style={styleDark}>
        <StaticLogo colorScheme="light" fileType="png" />
      </div>
      <div style={styleMid}>
        <StaticLogo colorScheme="color" fileType="png" />
      </div>
      <div style={styleLight}>
        <StaticLogo colorScheme="dark" fileType="png" />
      </div>
      <h3>Thumb, SVG</h3>
      <div style={styleLight}>
        <StaticLogo
          variant="thumb"
          colorScheme="color"
          fileType="svg"
          responsive={true}
        />
      </div>
    </VStack>
  );
};
