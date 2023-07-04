import * as React from "react";
import { useState } from "react";
import faker from "faker";

import { ELayoutVariant } from "next-shared/src/types/layouts";

import {
  TabbedContent,
  TabbedContentPanel,
  TabbedContentPanels,
  TabbedContentTab,
  TabbedContentTabs,
} from ".";
import { ContentOverflowPreview } from "../ContentOverflowPreview";
import { PendingStyleDebug } from "../../debug/PendingStyleDebug";

export const DemoStandard = () => {
  const [result, setResult] = useState(null);
  const [counter, setCounter] = useState<number>(2);
  return (
    <div data-test="TabbedContent-scenario-standard">
      <div data-test="component">
        <TabbedContent>
          <TabbedContentTabs>
            <TabbedContentTab label="Tab with index 1" counter={counter} />
            <TabbedContentTab label="Tab 2" counter={2} />
            <TabbedContentTab label="Tab 3" />
          </TabbedContentTabs>
          <TabbedContentPanels>
            <TabbedContentPanel>Tab 1 content</TabbedContentPanel>
            <TabbedContentPanel>Tab 2 content</TabbedContentPanel>
            <TabbedContentPanel>Tab 3 content</TabbedContentPanel>
          </TabbedContentPanels>
        </TabbedContent>
      </div>

      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        {" | "}
        <a
          data-test="decrease-counter"
          onClick={() => setCounter((c) => (c > 0 ? c - 1 : 0))}
        >
          Decrease counter
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export const DemoLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div data-test="TabbedContent-scenario-standard">
      <div data-test="component">
        <TabbedContent>
          <TabbedContentTabs>
            <TabbedContentTab
              isLoading={isLoading}
              label="Tab with index 1"
              counter={4}
            />
            <TabbedContentTab isLoading={isLoading} label="Tab 2" />
            <TabbedContentTab isLoading={isLoading} label="Tab 3" />
          </TabbedContentTabs>
          <TabbedContentPanels>
            <TabbedContentPanel>Tab 1 content</TabbedContentPanel>
            <TabbedContentPanel>Tab 2 content</TabbedContentPanel>
            <TabbedContentPanel>Tab 3 content</TabbedContentPanel>
          </TabbedContentPanels>
        </TabbedContent>
      </div>

      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setIsLoading(true)}>
          Reset
        </a>
        {" | "}
        <a data-test="stop-loading" onClick={() => setIsLoading(false)}>
          Stop loading
        </a>
      </div>
    </div>
  );
};

export const DemoConstrained = () => {
  return (
    <PendingStyleDebug>
      <div data-test="TabbedContent-scenario-standard">
        <div data-test="component" style={{ height: "300px" }}>
          <TabbedContent variant={ELayoutVariant.Compact}>
            <TabbedContentTabs>
              <TabbedContentTab label="Tab with index 1" counter={4} />
              <TabbedContentTab label="Tab 2" />
              <TabbedContentTab label="Tab 3" />
            </TabbedContentTabs>
            <TabbedContentPanels>
              <TabbedContentPanel>
                <ContentOverflowPreview>
                  {faker.lorem.paragraphs(11)}
                </ContentOverflowPreview>
              </TabbedContentPanel>
              <TabbedContentPanel>
                <ContentOverflowPreview>
                  {faker.lorem.paragraphs(11)}
                </ContentOverflowPreview>
              </TabbedContentPanel>
              <TabbedContentPanel>
                <ContentOverflowPreview>
                  {faker.lorem.paragraphs(11)}
                </ContentOverflowPreview>
              </TabbedContentPanel>
            </TabbedContentPanels>
          </TabbedContent>
        </div>
      </div>
    </PendingStyleDebug>
  );
};
