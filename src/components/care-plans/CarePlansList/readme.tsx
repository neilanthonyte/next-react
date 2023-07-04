import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";
import {
  mockDraftCarePlansWithAssociatedData,
  mockMultipleCarePlansWithAssociatedData,
  mockRevisionsCarePlansWithAssociatedData,
} from "./mockData";
import { CarePlansList } from ".";

export const DemoEmpty = () => {
  useDebug({
    test: {
      componentName: "CarePlansList",
      scenario: "empty",
    },
  });

  return <CarePlansList carePlansWithAssociatedData={[]} />;
};

export const DemoDraft = () => {
  useDebug({
    test: {
      componentName: "CarePlansList",
      scenario: "draft",
    },
  });

  return (
    <CarePlansList
      carePlansWithAssociatedData={mockDraftCarePlansWithAssociatedData}
    />
  );
};

export const DemoRevisions = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "CarePlansList",
      scenario: "revisions",
    },
  });

  return (
    <CarePlansList
      carePlansWithAssociatedData={mockRevisionsCarePlansWithAssociatedData}
      onDelete={(carePlanId) => setOutput(`Delete ${carePlanId}`)}
      onEdit={(carePlanId) => setOutput(`Edit ${carePlanId}`)}
      onOpenDocument={(carePlanId) => setOutput(`Open ${carePlanId}`)}
      onReview={(carePlanId) => setOutput(`Review ${carePlanId}`)}
    />
  );
};

export const DemoMultiple = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "CarePlansList",
      scenario: "multiple",
    },
  });

  return (
    <CarePlansList
      carePlansWithAssociatedData={mockMultipleCarePlansWithAssociatedData}
      onDelete={(carePlanId) => setOutput(`Delete ${carePlanId}`)}
      onEdit={(carePlanId) => setOutput(`Edit ${carePlanId}`)}
      onOpenDocument={(carePlanId) => setOutput(`Open ${carePlanId}`)}
      onReview={(carePlanId) => setOutput(`Review ${carePlanId}`)}
    />
  );
};
