import * as React from "react";
import { SingleInlineOptions } from "../InlineOptions";

export interface IOptionsToggleProps {
  options: string[];
  selected?: string;
  onToggleSelected: (option: string) => void;
}

/**
 * The idea behind the options toggle is that it'll act similar to an online options input,
 * however it may one take have transitions that differentiate from single inline options,
 * this is why it exists on it's own.
 */
export const OptionsToggle: React.FC<IOptionsToggleProps> = ({
  // optionWidth = "100px",
  options,
  selected,
  onToggleSelected,
}) => {
  return (
    <SingleInlineOptions
      optionWidth={"150px"}
      options={options}
      selected={selected}
      onSelection={onToggleSelected}
    />
  );
};
