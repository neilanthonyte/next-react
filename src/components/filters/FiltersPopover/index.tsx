import * as React from "react";

import { EPopupVariant, IPopoverProps, Popover } from "../../generic/Popover";

export interface IFiltersPopoverProps extends IPopoverProps {}

/**
 * Renders a styled popover specific for filters
 */
export const FiltersPopover: React.FC<IFiltersPopoverProps> = (props) => (
  <Popover
    {...props}
    placement={{ position: "below" }}
    variant={EPopupVariant.Filters}
  >
    {props.children}
  </Popover>
);
