import * as React from "react";

import GoalCard from "../../resources/GoalCard";
import ContentGrid from "../../structure/ContentGrid";
import EmptySlot from "../../generic/EmptySlot";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles);

export interface IGoalsBarProps {
  goalsCollection?: fhir3.Goal[];
  onAdd?: () => void;
  onAccept?: (goal: fhir3.Goal) => void;
  onReject?: (goal: fhir3.Goal) => void;
  onSelect?: (goal: fhir3.Goal) => void;
  selectedGoal?: fhir3.Goal;
}

/**
 * Composite showing Goal Bar with multiple Goal Cards
 */
export const GoalsBar: React.FC<IGoalsBarProps> = ({
  goalsCollection,
  onAdd,
  onAccept,
  onReject,
  onSelect,
  selectedGoal,
}) => {
  // generate goal cards
  const renderElements = goalsCollection.map((goal) => (
    <div className={css("goal-width")} key={goal.id}>
      <GoalCard
        goal={goal}
        actions={[
          onAccept && {
            icon: "tick",
            onClick: onAccept && (() => onAccept(goal)),
          },
          onReject && {
            icon: "cancel",
            onClick: onReject && (() => onReject(goal)),
          },
          onSelect && {
            icon: "select",
            onClick: onSelect && (() => onSelect(goal)),
          },
        ]}
        /*isSelected={goal === selectedGoal}*/
      />
    </div>
  ));

  // generate empty slot for adding new goal card
  if (onAdd) {
    renderElements.push(
      <div className={css("goal-width")}>
        <EmptySlot addCallBack={onAdd} />
      </div>,
    );
  }

  // render fixed width goals
  return <ContentGrid>{renderElements}</ContentGrid>;
};
