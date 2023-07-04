import * as React from "react";
import { useState } from "react";
import * as faker from "faker";

import { ContentOverflowPreview } from "../../structure/ContentOverflowPreview";
import { PendingStyleDebug } from "../../debug/PendingStyleDebug";
import { NoDataFallback } from "../../structure/NoDataFallback";
import { SelectableListWithDetail } from ".";

const mockData = [
  {
    title: faker.lorem.words(2),
    description: faker.lorem.lines(3),
  },
  {
    title: faker.lorem.words(2),
    description: faker.lorem.lines(3),
  },
  {
    title: faker.lorem.words(2),
    description: faker.lorem.lines(3),
  },
  {
    title: faker.lorem.words(2),
    description: faker.lorem.lines(3),
  },
];

export const DemoStandard = () => {
  return (
    <div data-test="SelectableListWithDetail-scenario-standard">
      <div data-test="component">
        <SelectableListWithDetail
          data={mockData}
          renderListItem={(item) => (
            <div>
              <h5>{item.title}</h5>
              {item.description}
            </div>
          )}
          renderSelectedItem={(item) => (
            <div>
              <h5>{item.title}</h5>
              {item.description}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export const DemoListActions = () => {
  const [result, setResult] = useState<string>();
  return (
    <div data-test="SelectableListWithDetail-scenario-list-options">
      <div data-test="component" style={{ height: "300px" }}>
        <SelectableListWithDetail
          data={mockData}
          renderListItem={(item) => (
            <div>
              <h5>{item.title}</h5>
              {item.description}
            </div>
          )}
          renderSelectedItem={(item) => (
            <div>
              <h5>{item.title}</h5>
              {item.description}
            </div>
          )}
          listActions={[
            {
              label: "Primary",
              onClick: () => setResult("Primary"),
              variant: "primary",
            },
            {
              label: "Secondary",
              onClick: () => setResult("Secondary"),
              variant: "secondary",
            },
          ]}
        />
      </div>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export const DemoEmpty = () => {
  return (
    <div data-test="SelectableListWithDetail-scenario-empty">
      <div data-test="component">
        <SelectableListWithDetail
          data={[]}
          renderListItem={(item) => (
            <div>
              <h5>{item.title}</h5>
              {item.description}
            </div>
          )}
          renderSelectedItem={(item) => (
            <ContentOverflowPreview>
              <h5>{item.title}</h5>
              {item.details}
            </ContentOverflowPreview>
          )}
        />
      </div>
    </div>
  );
};

export const DemoEmptyCustom = () => {
  const [result, setResult] = useState<string>();
  return (
    <div data-test="SelectableListWithDetail-scenario-empty-custom">
      <div data-test="component">
        <SelectableListWithDetail
          data={[]}
          renderListItem={(item) => (
            <div>
              <h5>{item.title}</h5>
              {item.description}
            </div>
          )}
          renderSelectedItem={(item) => (
            <ContentOverflowPreview>
              <h5>{item.title}</h5>
              {item.details}
            </ContentOverflowPreview>
          )}
          renderEmptyListFallback={() => (
            <NoDataFallback
              message="Custom fallback message for empty lists"
              actions={[
                { label: "Action label", onClick: () => setResult("Clicked") },
              ]}
            />
          )}
        />
      </div>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

const mockData2 = [
  {
    title: faker.lorem.words(2),
    description: faker.lorem.lines(3),
    details: faker.lorem.paragraphs(3),
  },
];

export const DemoConstrained = () => {
  return (
    <PendingStyleDebug>
      <div data-test="SelectableListWithDetail-scenario-constrained">
        <div data-test="component" style={{ height: "200px" }}>
          <SelectableListWithDetail
            data={mockData2}
            renderListItem={(item) => (
              <div>
                <h5>{item.title}</h5>
                {item.description}
              </div>
            )}
            renderSelectedItem={(item) => (
              <ContentOverflowPreview>
                <h5>{item.title}</h5>
                {item.details}
              </ContentOverflowPreview>
            )}
          />
        </div>
      </div>
    </PendingStyleDebug>
  );
};
