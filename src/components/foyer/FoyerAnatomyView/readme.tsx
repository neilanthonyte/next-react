import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { FoyerAnatomyView } from ".";
import { useEffect, useState } from "react";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    test: {
      componentName: "FoyerAnatomyView",
      scenario: "standard",
    },
    isFixed: false,
  });

  const [fullscreen, setFullScreen] = useState<boolean>(true);

  useEffect(() => {
    setActions([
      {
        label: `Fullscreen: ${fullscreen ? "yes" : "no"}`,
        action: () => setFullScreen((fs) => !fs),
      },
    ]);
  }, [fullscreen]);

  return (
    <div
      style={{
        height: "800px",
        position: "relative",
        backgroundColor: "lightblue",
      }}
    >
      <FoyerAnatomyView fullScreen={fullscreen} />
    </div>
  );
};
