import * as React from "react";

import {
  FilterControl,
  FilterControlProps,
} from "../../../../generic/FilterControl";

export interface IOptionsProps extends FilterControlProps {
  className?: string;
}

/**
 * Renders a block header
 */
export const Options: React.FC<IOptionsProps> = ({
  className = "",
  ...rest
}) => (
  <div className={className} data-test="options">
    <FilterControl {...rest} />
  </div>
);
