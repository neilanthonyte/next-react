import * as React from "react";

import { ContentOverflowPreview } from ".";
import { PendingStyleDebug } from "../../debug/PendingStyleDebug";
import { VStack } from "../VStack";

export const DemoStandard = () => {
  return (
    <PendingStyleDebug>
      <VStack>
        <div style={{ height: 150 }}>
          <ContentOverflowPreview>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut optio
            autem nulla, quo maiores eius molestiae dicta quae nesciunt, libero
            voluptates voluptatum laudantium labore rerum error totam voluptatem
            qui? Error. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Id repellat, harum incidunt, hic maiores excepturi nesciunt
            odio consequuntur ducimus et blanditiis veniam repellendus quisquam
            natus commodi necessitatibus quibusdam sequi aspernatur. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Aut optio autem nulla,
            quo maiores eius molestiae dicta quae nesciunt, libero voluptates
            voluptatum laudantium labore rerum error totam voluptatem qui?
            Error. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id
            repellat, harum incidunt, hic maiores excepturi nesciunt odio
            consequuntur ducimus et blanditiis veniam repellendus quisquam natus
            commodi necessitatibus quibusdam sequi aspernatur.
          </ContentOverflowPreview>
        </div>
        <div style={{ height: 100 }}>
          <ContentOverflowPreview>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut optio
            autem nulla, quo maiores eius molestiae dicta quae nesciunt, libero
            voluptates voluptatum laudantium labore rerum error totam voluptatem
            qui? Error. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Id repellat, harum incidunt, hic maiores excepturi nesciunt
            odio consequuntur ducimus et blanditiis veniam repellendus quisquam
            natus commodi necessitatibus quibusdam sequi aspernatur.
          </ContentOverflowPreview>
        </div>
      </VStack>
    </PendingStyleDebug>
  );
};
