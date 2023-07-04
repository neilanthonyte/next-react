import * as React from "react";
import { useCallback } from "react";

import { mapObservationTypeToIcon } from "../../../helpers/mapObservationTypeToIcon";
import Slider from "../../generic/Slider";
import { Cell, CellHeader } from "../../structure/Cell";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { fhirUtil } from "next-shared/src/fhirUtil";
import {
  FhirGoalUtil,
  goalMinValueExtensionUrl,
  goalMaxValueExtensionUrl,
} from "next-shared/src/fhirUtil/utilClasses/FhirGoalUtil";
const css = cssComposer(styles);

// TODO: the goal structure here is still based on version STU3, it would probably make sense to update to R4 (fhir4 namespace)

export interface IGoalEditorProps {
  onChange: (updatedGoal: fhir3.Goal) => void;
  goal: fhir3.Goal;
}

export const GoalEditor: React.FC<IGoalEditorProps> = ({ goal, onChange }) => {
  const handleValueChange = useCallback(
    (newValue) => {
      const modifiedGoal: fhir3.Goal = {
        ...goal,
        target: {
          ...goal.target,
          detailQuantity: {
            ...goal.target.detailQuantity,
            value: newValue,
          },
        },
      };

      onChange(modifiedGoal);
    },
    [goal],
  );

  const goalUtil = fhirUtil<FhirGoalUtil>(goal);
  if (goalUtil.getObsResourceType() === "observation:BloodPressure") {
    return <BloodPressureGoalEditor goal={goal} onChange={onChange} />;
  }

  return (
    <div className={css("goalEditor")}>
      <div className={css("goalEditor_header")}>
        <Cell
          isLead
          hasGoal
          decorationIcon={mapObservationTypeToIcon(
            goalUtil.getObsResourceType(),
          )}
        >
          <CellHeader>{goalUtil.getGoalObsDisplayName()}</CellHeader>
        </Cell>
      </div>
      <div className={css("goalEditor_slider")}>
        <Slider
          min={goalUtil.getGoalMinValue()}
          max={goalUtil.getGoalMaxValue()}
          value={goal.target.detailQuantity.value}
          onChange={handleValueChange}
          showValue={true}
          showControls={true}
        />
      </div>
    </div>
  );
};

export const BloodPressureGoalEditor: React.FC<IGoalEditorProps> = ({
  goal,
  onChange,
}) => {
  const handleSystolicChange = useCallback(
    (system, newValue) => {
      const modifiedGoal: fhir3.Goal = {
        ...goal,
        target: {
          ...goal.target,
          detailCodeableConcept: {
            ...goal.target.detailCodeableConcept,
            coding: goal.target.detailCodeableConcept.coding.map((coding) => {
              if (coding.system === system) {
                return {
                  ...coding,
                  code: newValue.toString(),
                };
              }
              return coding; // don't modify, not systolic value
            }),
          },
        },
      };

      onChange(modifiedGoal);
    },
    [goal],
  );

  // TODO: memo all this
  const systolicDetails = goal.target.detailCodeableConcept.coding.find(
    (x) => x.system === "http://nextpracticehealth.com/BloodPressure/Systolic",
  );
  const diastolicDetails = goal.target.detailCodeableConcept.coding.find(
    (x) => x.system === "http://nextpracticehealth.com/BloodPressure/Diastolic",
  );

  const systolicMin = fhirUtil(systolicDetails).getExtensionIntegerValue(
    goalMinValueExtensionUrl,
  );
  const systolicMax = fhirUtil(systolicDetails).getExtensionIntegerValue(
    goalMaxValueExtensionUrl,
  );
  const systolicValue = parseInt(systolicDetails.code, 10);

  const diastolicMin = fhirUtil(diastolicDetails).getExtensionIntegerValue(
    goalMinValueExtensionUrl,
  );
  const diastolicMax = fhirUtil(diastolicDetails).getExtensionIntegerValue(
    goalMaxValueExtensionUrl,
  );
  const diastolicValue = parseInt(diastolicDetails.code, 10);

  return (
    <div className={css("goalEditor")}>
      <div className={css("goalEditor_header")}>
        <Cell
          isLead
          hasGoal
          decorationIcon={mapObservationTypeToIcon("observation:BloodPressure")}
        >
          <CellHeader>Blood pressure</CellHeader>
        </Cell>
      </div>
      <div className={css("goalEditor_slider")}>
        <Slider
          min={systolicMin}
          max={systolicMax}
          value={systolicValue}
          onChange={(v) =>
            handleSystolicChange(
              "http://nextpracticehealth.com/BloodPressure/Systolic",
              v,
            )
          }
          showValue={true}
          showControls={true}
        />
        <Slider
          min={diastolicMin}
          max={diastolicMax}
          value={diastolicValue}
          onChange={(v) =>
            handleSystolicChange(
              "http://nextpracticehealth.com/BloodPressure/Diastolic",
              v,
            )
          }
          showValue={true}
          showControls={true}
        />
      </div>
    </div>
  );
};
