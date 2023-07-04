// TODO remove and replace when official mock data is available

import { times } from "lodash";

import { generateMockCarePlan } from "next-shared/src/mockData/generateMockCarePlan";
import { CarePlan, ECarePlanTypes } from "next-shared/src/models/CarePlan";
import { CarePlanWithAssociatedData } from "next-shared/src/models/CarePlanWithAssociatedData";
import { WlhPatient } from "next-shared/src/models/WlhPatient";
import { WlhProvider } from "next-shared/src/models/WlhProvider";
import {
  generateMockWlhPatient,
  generateMockWlhProvider,
} from "next-shared/src/mockData/generateMockWlhPerson";
import { generateMockCarePlanRevisionsForPatient } from "next-shared/src/mockData/generateMockCarePlanRevisionsForPatient";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";

// TODO remove when official mock data available
const mockProvider = new WlhProvider(generateMockWlhProvider());
const mockPatient = new WlhPatient(generateMockWlhPatient());

export const mockDraftCarePlansWithAssociatedData: CarePlanWithAssociatedData[] =
  [
    new CarePlanWithAssociatedData({
      carePlan: new CarePlan(
        generateMockCarePlan({ createdAt: currentUnixTimestamp() }),
      ),
      provider: new WlhProvider(generateMockWlhProvider()),
      patient: new WlhPatient(generateMockWlhPatient()),
    }),
  ];

export const mockReviewedCarePlansWithAssociatedData: CarePlanWithAssociatedData[] =
  generateMockCarePlanRevisionsForPatient({
    patientId: mockPatient.patientId,
    carePlanType: ECarePlanTypes.TCA,
    omitDraft: true,
  }).map(
    (carePlan) =>
      new CarePlanWithAssociatedData({
        carePlan: new CarePlan(carePlan),
        provider: mockProvider,
        patient: mockPatient,
      }),
  );

export const mockCarePlansRevisions = generateMockCarePlanRevisionsForPatient({
  patientId: mockPatient.patientId,
  carePlanType: ECarePlanTypes.TCA,
});

export const mockRevisionsCarePlansWithAssociatedData: CarePlanWithAssociatedData[] =
  mockCarePlansRevisions.map(
    (carePlan) =>
      new CarePlanWithAssociatedData({
        carePlan: new CarePlan(carePlan),
        provider: mockProvider,
        patient: mockPatient,
      }),
  );

export const mockMultipleCarePlansWithAssociatedData: CarePlanWithAssociatedData[] =
  times(3)
    .map(() => {
      const mockRevisions = generateMockCarePlanRevisionsForPatient({
        patientId: mockPatient.patientId,
        carePlanType: ECarePlanTypes.TCA,
      });
      return mockRevisions.map(
        (carePlan) =>
          new CarePlanWithAssociatedData({
            carePlan: new CarePlan(carePlan),
            provider: mockProvider,
            patient: mockPatient,
          }),
      );
    })
    .flat()
    .concat(
      mockDraftCarePlansWithAssociatedData,
      mockReviewedCarePlansWithAssociatedData,
    );
