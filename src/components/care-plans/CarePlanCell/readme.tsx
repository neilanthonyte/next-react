import React, { useEffect, useState } from "react";

import { mockHcps } from "next-shared/src/mockData/mockHcps";
import { generateMockCarePlan } from "next-shared/src/mockData/generateMockCarePlan";
import { CarePlan } from "next-shared/src/models/CarePlan";
import { useDebug } from "../../../debug/DemoWrapper";
import { VStack } from "../../structure/VStack";

import { CarePlanCell } from ".";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";

// used for integration tests
export const CARE_PLAN_CELL_EDIT_OUTPUT = "Edit";
export const CARE_PLAN_CELL_DELETE_OUTPUT = "Delete";
export const CARE_PLAN_CELL_REVIEW_OUTPUT = "Review";
export const CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT = "Open document";

const mockCarePlanDraft = new CarePlan(
  generateMockCarePlan({ createdAt: currentUnixTimestamp() }),
);
const mockCarePlanInitial = new CarePlan(
  generateMockCarePlan({ finalisedAt: currentUnixTimestamp() }),
);
const mockCarePlanReview = new CarePlan(
  generateMockCarePlan({
    rootCarePlanId: mockCarePlanDraft.carePlanId,
    finalisedAt: currentUnixTimestamp(),
  }),
);

export const DemoStandard = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "CarePlanCell",
      scenario: "standard",
    },
  });

  const [callbacksActive, setCallbacksActive] = useState<boolean>(true);

  useEffect(() => {
    setActions([
      {
        label: "Toggle callbacks",
        action: () => setCallbacksActive((s) => !s),
      },
    ]);
  }, []);

  return (
    <VStack>
      <CarePlanCell
        carePlan={mockCarePlanDraft}
        authorDisplayName={mockHcps[0].fhirDisplayName}
        onEdit={
          callbacksActive
            ? () => setOutput(CARE_PLAN_CELL_EDIT_OUTPUT)
            : undefined
        }
        onDelete={
          callbacksActive
            ? () => setOutput(CARE_PLAN_CELL_DELETE_OUTPUT)
            : undefined
        }
      />
      <CarePlanCell
        carePlan={mockCarePlanInitial}
        authorDisplayName={mockHcps[0].fhirDisplayName}
        onOpenDocument={
          callbacksActive
            ? () => setOutput(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT)
            : undefined
        }
        onReview={
          callbacksActive
            ? () => setOutput(CARE_PLAN_CELL_REVIEW_OUTPUT)
            : undefined
        }
      />
      <CarePlanCell
        carePlan={mockCarePlanReview}
        authorDisplayName={mockHcps[0].fhirDisplayName}
        onOpenDocument={
          callbacksActive
            ? () => setOutput(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT)
            : undefined
        }
        onReview={
          callbacksActive
            ? () => setOutput(CARE_PLAN_CELL_REVIEW_OUTPUT)
            : undefined
        }
      />
    </VStack>
  );
};

export const DemoDraft = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "CarePlanCell",
      scenario: "draft",
    },
  });

  return (
    <CarePlanCell
      carePlan={mockCarePlanDraft}
      authorDisplayName={mockHcps[0].fhirDisplayName}
      onEdit={() => setOutput(CARE_PLAN_CELL_EDIT_OUTPUT)}
      onDelete={() => setOutput(CARE_PLAN_CELL_DELETE_OUTPUT)}
    />
  );
};

export const DemoInitial = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "CarePlanCell",
      scenario: "initial",
    },
  });

  return (
    <CarePlanCell
      carePlan={mockCarePlanInitial}
      authorDisplayName={mockHcps[0].fhirDisplayName}
      onReview={() => setOutput(CARE_PLAN_CELL_REVIEW_OUTPUT)}
      onOpenDocument={() => setOutput(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT)}
    />
  );
};

export const DemoReview = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "CarePlanCell",
      scenario: "review",
    },
  });

  return (
    <CarePlanCell
      carePlan={mockCarePlanReview}
      authorDisplayName={mockHcps[0].fhirDisplayName}
      onReview={() => setOutput(CARE_PLAN_CELL_REVIEW_OUTPUT)}
      onOpenDocument={() => setOutput(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT)}
    >
      <CarePlanCell
        carePlan={mockCarePlanInitial}
        authorDisplayName={mockHcps[0].fhirDisplayName}
        onOpenDocument={() => setOutput(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT)}
      />
    </CarePlanCell>
  );
};

export const DemoMultipleReviews = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "CarePlanCell",
      scenario: "multiple-reviews",
    },
  });

  return (
    <CarePlanCell
      carePlan={mockCarePlanReview}
      authorDisplayName={mockHcps[0].fhirDisplayName}
      onReview={() => setOutput(CARE_PLAN_CELL_REVIEW_OUTPUT)}
      onOpenDocument={() => setOutput(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT)}
    >
      <CarePlanCell
        carePlan={mockCarePlanReview}
        authorDisplayName={mockHcps[0].fhirDisplayName}
        onOpenDocument={() => setOutput(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT)}
      />
      <CarePlanCell
        carePlan={mockCarePlanReview}
        authorDisplayName={mockHcps[0].fhirDisplayName}
        onOpenDocument={() => setOutput(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT)}
      />
      <CarePlanCell
        carePlan={mockCarePlanInitial}
        authorDisplayName={mockHcps[0].fhirDisplayName}
        onOpenDocument={() => setOutput(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT)}
      />
    </CarePlanCell>
  );
};

export const DemoReviewsDraft = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "CarePlanCell",
      scenario: "reviews-draft",
    },
  });

  return (
    <CarePlanCell
      carePlan={mockCarePlanDraft}
      authorDisplayName={mockHcps[0].fhirDisplayName}
      onEdit={() => setOutput(CARE_PLAN_CELL_EDIT_OUTPUT)}
      onDelete={() => setOutput(CARE_PLAN_CELL_DELETE_OUTPUT)}
    >
      <CarePlanCell
        carePlan={mockCarePlanReview}
        authorDisplayName={mockHcps[0].fhirDisplayName}
        onOpenDocument={() => setOutput(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT)}
      />
      <CarePlanCell
        carePlan={mockCarePlanReview}
        authorDisplayName={mockHcps[0].fhirDisplayName}
        onOpenDocument={() => setOutput(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT)}
      />
      <CarePlanCell
        carePlan={mockCarePlanInitial}
        authorDisplayName={mockHcps[0].fhirDisplayName}
        onOpenDocument={() => setOutput(CARE_PLAN_CELL_OPEN_DOCUMENT_OUTPUT)}
      />
    </CarePlanCell>
  );
};
