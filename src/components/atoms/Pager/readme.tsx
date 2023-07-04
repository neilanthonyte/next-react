import * as React from "react";
import { useState } from "react";

import { useDebug } from "../../../debug/DemoWrapper";
import { Pager, PagerFrame, PagerFrameBody, PagerFrameFooter } from ".";
import { VStack } from "../../structure/VStack";

export const DemoStandard = () => {
  useDebug({
    test: {
      componentName: "Pager",
      scenario: "standard",
    },
  });
  const [index, setIndex] = useState<number>(0);

  return (
    <VStack>
      <div style={{ border: "1px solid blue", height: "400px" }}>
        <PagerFrame>
          <PagerFrameBody>
            <div style={{ background: "#bbb", height: "100%" }} />
          </PagerFrameBody>
          <PagerFrameFooter>
            <Pager pageCount={100} index={index} onChange={setIndex} />
          </PagerFrameFooter>
        </PagerFrame>
      </div>
      <div style={{ border: "1px solid blue", height: "400px" }}>
        <PagerFrame>
          <PagerFrameBody>
            <div style={{ background: "#bbb", height: "100%" }} />
          </PagerFrameBody>
        </PagerFrame>
      </div>
    </VStack>
  );
};
