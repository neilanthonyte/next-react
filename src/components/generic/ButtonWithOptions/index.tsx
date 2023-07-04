import * as React from "react";
import { useMemo, useState } from "react";

import { isPromise } from "../../../helpers/isPromise";

import {
  IOptionsPopoverSection,
  OptionsPopover,
} from "../../atoms/OptionsPopover";
import { Button, IButtonProps } from "../Button";

export interface IButtonOptionsSection extends IOptionsPopoverSection {}

export interface IButtonWithOptionsProps extends IButtonProps {
  optionSections: IButtonOptionsSection[];
  /** Handles click on the main body of the button. If passed, this will set the default + options behaviour with the two clickable areas */
  onDefaultClick?: (args?: unknown) => unknown;
}

/**
 * Renders a button with options
 * Handles:
 * - Dropdown style actions
 * - Default action plus dropdown style actions
 */
export const ButtonWithOptions: React.FC<IButtonWithOptionsProps> = ({
  children,
  optionSections,
  onDefaultClick,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [promise, setPromise] = useState<Promise<unknown>>();

  const target = (
    <span data-test="button">
      <Button
        {...rest}
        hasOptions={true}
        onClick={onDefaultClick || (() => setIsOpen(true))}
        onOptionsMenuClick={onDefaultClick ? () => setIsOpen(true) : undefined}
        promise={promise}
      >
        {children}
      </Button>
    </span>
  );

  // remap options to close popover on click
  const mappedOptions = useMemo(() => {
    return (optionSections || []).map((section) => ({
      ...section,
      options: section.options.map((option) => ({
        ...option,
        onClick: (args?: unknown) => {
          setIsOpen(false);
          // pass the event to the callback in case it's needed
          const result = option.onClick(args);

          // check if promise and set state to be passed to Button
          if (isPromise(result)) {
            setPromise(result);
            // reset once done
            result.finally(() => setPromise(undefined));
          }
        },
      })),
    }));
  }, [optionSections]);

  return (
    <OptionsPopover
      open={isOpen}
      closeHandler={() => setIsOpen(false)}
      sections={mappedOptions}
      target={target}
      placement={{ position: "below" }}
      showTip={false}
    />
  );
};
