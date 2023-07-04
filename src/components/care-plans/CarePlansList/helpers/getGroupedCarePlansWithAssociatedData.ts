import { ECarePlanStatus } from "next-shared/src/models/CarePlan";
import { CarePlanWithAssociatedData } from "next-shared/src/models/CarePlanWithAssociatedData";

export interface IGroupedCarePlansWithAssociatedData {
  latest: CarePlanWithAssociatedData;
  revisions: CarePlanWithAssociatedData[];
}

type TGroupedCarePlansWithAssociatedData = {
  [rootCarePlanId: string]: IGroupedCarePlansWithAssociatedData;
};

/**
 * Helper function restructuring the data to be displayed in a care plans list
 * It receives a flat array of care plans and it groups them by rootCarePlanId (or carePlanId if no revisions yet available)
 * For each group, it returns a top level care plan (draft or latest revision) and an array with any revisions
 * @example
 * input:
 * [carePlan1, carePlan2, carePlan2, carePlan3, carePlan4]
 * output:
 * {
 *  carePlan3Id: {
 *    latest: carePlan1,
 *    revisions: [carePlan2, carePlan3]
 *  },
 *  carePlan4Id: {
 *    latest: carePlan4,
 *    revisions: [],
 *  }
 * }
 *
 */
export const getGroupedCarePlansWithAssociatedData = (
  carePlansWithAssociatedData: CarePlanWithAssociatedData[],
): TGroupedCarePlansWithAssociatedData => {
  return carePlansWithAssociatedData.reduce<TGroupedCarePlansWithAssociatedData>(
    (groupedPlans, current) => {
      const swapLatestWithCurrent = (carePlanId: string) => {
        const updatedRevisionsList = groupedPlans[carePlanId].revisions
          .concat([groupedPlans[carePlanId].latest])
          .sort(
            (cp1, cp2) =>
              (cp2.carePlan.finalisedAt as number) -
              (cp1.carePlan.finalisedAt as number),
          );
        groupedPlans[carePlanId] = {
          latest: current,
          revisions: updatedRevisionsList,
        };
      };

      const addToRevisionListAndSort = (carePlanId: string) => {
        const updatedRevisionsList = groupedPlans[carePlanId].revisions
          .concat([current])
          .sort(
            (cp1, cp2) =>
              (cp2.carePlan.finalisedAt as number) -
              (cp1.carePlan.finalisedAt as number),
          );
        groupedPlans[carePlanId] = {
          ...groupedPlans[carePlanId],
          revisions: updatedRevisionsList,
        };
      };

      // fetched from db, safe to assume there is a carePlanId
      const carePlanId = current.carePlan.carePlanId as string;
      const rootCarePlanId = current.carePlan.rootCarePlanId;
      const isDraft = current.carePlan.status === ECarePlanStatus.Draft;

      // if no rootCarePlanId this is the initial original revision
      if (!rootCarePlanId) {
        //  check if there is already an entry with the carePlanId
        if (groupedPlans[carePlanId]) {
          addToRevisionListAndSort(carePlanId);
        } else {
          groupedPlans[carePlanId] = { latest: current, revisions: [] };
        }
        return groupedPlans;
      }

      // we have a rootCarePlanId, this is a revision

      // no entry yet, create new
      if (!groupedPlans[rootCarePlanId]) {
        groupedPlans[rootCarePlanId] = { latest: current, revisions: [] };
      } else {
        // there is already an entry for this root care id
        if (isDraft) {
          swapLatestWithCurrent(rootCarePlanId);
        } else {
          // not a draft, check if we should swap latest based on releasedAt or add to revisions
          const existingGroupLatest = groupedPlans[rootCarePlanId].latest;
          if (
            (current.carePlan.finalisedAt as number) >
            (existingGroupLatest.carePlan.finalisedAt as number)
          ) {
            swapLatestWithCurrent(rootCarePlanId);
          } else {
            addToRevisionListAndSort(rootCarePlanId);
          }
        }
      }
      return groupedPlans;
    },
    {},
  );
};
