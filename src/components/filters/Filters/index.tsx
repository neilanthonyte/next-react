import * as React from "react";
import { useCallback, useMemo, useState } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { Icon } from "../../generic/Icon";
import { EFilterType, IFilterProps } from "../Filter";
import { FiltersPopover } from "../FiltersPopover";
import { AltButton, Button } from "../../generic/Button";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Filters");

export interface IFiltersProps {
  onApplyFilters?: () => unknown;
  applyFiltersLabel?: string;
}

/**
 * Renders a container for interactive filters summary and filters tags
 */
export const Filters: React.FC<IFiltersProps> = ({
  children,
  onApplyFilters,
  applyFiltersLabel = "Search",
}) => {
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);

  const { filtersCountLabel, hasSecondaryFilters, inputs, filtersTags } =
    useMemo(() => {
      const childrenArray = React.Children.toArray(children);
      const primaryFilters = childrenArray.filter(
        (child: React.ReactElement<IFilterProps<unknown>>) =>
          child.props.type === EFilterType.Primary,
      );
      const secondaryFilters = childrenArray.filter(
        (child: React.ReactElement<IFilterProps<unknown>>) =>
          child.props.type === EFilterType.Secondary,
      );
      const childrenNumber = childrenArray.length;
      const secondaryFiltersNumber = secondaryFilters.length;

      const sortedFilters = [...primaryFilters, ...secondaryFilters];

      const unsetSecondaryFiltersNumber = secondaryFilters.filter(
        (filter: React.ReactElement<IFilterProps<unknown>>) =>
          !filter.props?.value,
      )?.length;

      const _filtersCountLabel = secondaryFiltersNumber
        ? `${childrenNumber - unsetSecondaryFiltersNumber} of ${childrenNumber}`
        : undefined;

      return {
        filtersCountLabel: _filtersCountLabel,
        hasSecondaryFilters: !!secondaryFiltersNumber,
        inputs: sortedFilters.map(
          (child: React.ReactElement<IFilterProps<unknown>>) =>
            React.cloneElement(child, { ...child.props, renderAsTag: false }),
        ),
        filtersTags: sortedFilters,
      };
    }, [children]);

  const handleOnApplyFilters = useCallback(() => {
    onApplyFilters();
    // dismiss popover in case we are setting filters from the there
    setPopoverOpen(false);
  }, [onApplyFilters]);

  const target = useMemo(
    () => (
      <div
        className={css("summary", {
          "-collapsible": hasSecondaryFilters,
        })}
        onClick={
          !!hasSecondaryFilters ? () => setPopoverOpen((s) => !s) : undefined
        }
        data-test="summary"
      >
        {!!hasSecondaryFilters && <Icon name="chevron-down" />}
        Filters
        {!!filtersCountLabel && (
          <span className={css("summary_count")} data-test="counter">
            {filtersCountLabel}
          </span>
        )}
      </div>
    ),
    [hasSecondaryFilters, filtersCountLabel, popoverOpen],
  );

  return (
    <div className={css("")} data-test="filters">
      <FiltersPopover open={popoverOpen} target={target}>
        <Icon
          name="action-close"
          onClick={() => setPopoverOpen(false)}
          className={css("popover_close")}
        />
        <div className={css("popover_inputs")}>{inputs}</div>
        <div className={css("popover_actions")}>
          <AltButton
            size={EStandardSizes.Small}
            onClick={() => setPopoverOpen(false)}
          >
            Close
          </AltButton>
          {onApplyFilters && (
            <Button size={EStandardSizes.Small} onClick={handleOnApplyFilters}>
              {applyFiltersLabel}
            </Button>
          )}
        </div>
      </FiltersPopover>

      <div className={css("tags")} data-test="tags">
        {filtersTags}
      </div>

      {onApplyFilters && (
        <div data-test="apply-filters">
          <Button size={EStandardSizes.Small} onClick={handleOnApplyFilters}>
            {applyFiltersLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
