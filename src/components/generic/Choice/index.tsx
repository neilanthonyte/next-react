import * as React from "react";

import { BlockButton } from "../Button";
import { HStack } from "../../structure/HStack";
import { VStack } from "../../structure/VStack";

import styles from "./styles.scss";

export interface IChoiceOption {
  label: string;
  onSelect: () => unknown;
  isSelected?: boolean;
  isDisabled?: boolean;
}

export interface IChoiceProps {
  choices: IChoiceOption[];
  heading?: string;
  description?: string;
}

/**
 * Displays a choice to user: red pill or blue?
 */
export const Choice: React.FC<IChoiceProps> = ({
  choices,
  heading,
  description,
}) => {
  return (
    <div className={styles.Choice}>
      <VStack>
        {!!heading && <h4>{heading}</h4>}
        {!!description && <p>{description}</p>}
        <HStack>
          {choices.map((c) => (
            <BlockButton
              key={c.label}
              variant={c.isSelected === false ? "secondary" : "primary"}
              onClick={c.onSelect}
              disabled={c.isDisabled === true}
            >
              {c.label}
            </BlockButton>
          ))}
        </HStack>
      </VStack>
    </div>
  );
};
