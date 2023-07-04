import * as React from "react";
import { random } from "lodash";

import { useDebug } from "../../../debug/DemoWrapper";

import { ImageObservation } from ".";
import { mockImageObservations } from "next-shared/src/mockData/mockFhirPatientResources";
import { VStack } from "../../structure/VStack";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "ImageObservation",
      scenario: "standard",
    },
  });

  return (
    <VStack>
      {mockImageObservations.map((obs) => (
        <ImageObservation
          observation={obs}
          signedUrl={`https://picsum.photos/${random(300, 400)}/${random(
            300,
            400,
          )}`}
        />
      ))}
    </VStack>
  );
};
