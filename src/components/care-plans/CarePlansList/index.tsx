import React, { useMemo } from "react";

import { CarePlanWithAssociatedData } from "next-shared/src/models/CarePlanWithAssociatedData";
import { ECarePlanStatus } from "next-shared/src/models/CarePlan";

import { NoDataFallback } from "../../structure/NoDataFallback";
import { CarePlanCell, ICarePlanCellCallbacks } from "../CarePlanCell";
import { getGroupedCarePlansWithAssociatedData } from "./helpers/getGroupedCarePlansWithAssociatedData";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "CarePlansList");

export interface ICarePlansListProps extends ICarePlanCellCallbacks {
  carePlansWithAssociatedData: CarePlanWithAssociatedData[];
}

/**
 * Component rendering a list of given patient care plans with associated data
 */
export const CarePlansList: React.FC<ICarePlansListProps> = ({
  carePlansWithAssociatedData,
  onDelete,
  onEdit,
  onOpenDocument,
  onReview,
}) => {
  const groupedCarePlans = useMemo(() => {
    if (!carePlansWithAssociatedData.length) return {};
    return getGroupedCarePlansWithAssociatedData(carePlansWithAssociatedData);
  }, [carePlansWithAssociatedData]);

  return (
    <div data-test="care-plans-list" className={css("")}>
      {!carePlansWithAssociatedData.length ? (
        <div data-test="empty">
          <NoDataFallback message="No care plan found" />
        </div>
      ) : (
        <>
          {Object.keys(groupedCarePlans).map((rootCarePlanId) => {
            const group = groupedCarePlans[rootCarePlanId];
            const rootCarePlan = group.latest;
            return (
              <div
                className={css("item")}
                key={rootCarePlanId}
                data-test="care-plan"
              >
                <CarePlanCell
                  carePlan={rootCarePlan.carePlan}
                  authorDisplayName={rootCarePlan.provider.displayName || ""}
                  onEdit={
                    rootCarePlan.carePlan.status === ECarePlanStatus.Draft
                      ? onEdit
                      : undefined
                  }
                  onDelete={
                    rootCarePlan.carePlan.status === ECarePlanStatus.Draft
                      ? onDelete
                      : undefined
                  }
                  onReview={
                    rootCarePlan.carePlan.status !== ECarePlanStatus.Draft
                      ? onReview
                      : undefined
                  }
                  onOpenDocument={
                    rootCarePlan.carePlan.status !== ECarePlanStatus.Draft
                      ? onOpenDocument
                      : undefined
                  }
                >
                  {(group.revisions || []).map((revision) => (
                    <CarePlanCell
                      key={revision.carePlan.carePlanId}
                      hideTitle={true}
                      carePlan={revision.carePlan}
                      authorDisplayName={revision.provider.displayName || ""}
                      onOpenDocument={
                        revision.carePlan.status !== ECarePlanStatus.Draft
                          ? onOpenDocument
                          : undefined
                      }
                    />
                  ))}
                </CarePlanCell>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
