import * as React from "react";

import { SlotButton } from "../../../SlotButton";

import styles from "./styles.scss";
import { useCallback, useMemo, useState } from "react";
import { cssComposer } from "next-react/src/helpers/cssComposer";
import { ISlotWithHcp } from "next-shared/src/types/ISlotWithHcp";
import { useElementDimension } from "next-react/src/hooks/useElementDimension";
import { AltButton } from "next-react/src/components/generic/Button";

const css = cssComposer(styles, "SlotList");

const MIN_COLUMNS = 1;
const MIN_COLUMN_WIDTH = 180; // pixels

export interface IPageableSlotListProps {
  slots: ISlotWithHcp[];
  showHcpHint?: boolean;
  onSelection: (slot: ISlotWithHcp) => any;
}

/**
 * Renders a list of slots. Includes some nice buttons to navigate through longer lists.
 */
export const PageableSlotList: React.FC<IPageableSlotListProps> = ({
  slots: slotsButMaybeUndefined,
  showHcpHint,
  onSelection,
}) => {
  // TODO find where this sneaky undefined is coming from and fix it
  const slots = slotsButMaybeUndefined || [];

  const [portholeRef, { clientWidth: currentPortholeWidth }] =
    useElementDimension();

  const numberOfColumns = useMemo(() => {
    if (typeof currentPortholeWidth === "number") {
      return Math.max(
        MIN_COLUMNS,
        Math.floor(currentPortholeWidth / MIN_COLUMN_WIDTH),
      );
    }
    return MIN_COLUMNS;
  }, [currentPortholeWidth]);

  const [leftIndex, setLeftIndex] = useState(0);

  const handleNavigateLeft = useCallback(() => {
    setLeftIndex((oldValue) => Math.max(0, oldValue - numberOfColumns));
  }, [slots, numberOfColumns]);

  const handleNavigateRight = useCallback(() => {
    setLeftIndex((oldValue) =>
      Math.min(slots.length - numberOfColumns, oldValue + numberOfColumns),
    );
  }, [slots, numberOfColumns]);

  const portholeStyles = useMemo(() => {
    const columnWidthPercent = 100 / numberOfColumns;

    // TODO stop the scroll jumping around on resize
    return {
      gridTemplateColumns: Array.from(
        { length: numberOfColumns },
        () => `${columnWidthPercent}%`,
      ).join(" "),
      gridAutoColumns: `${columnWidthPercent}%`,
      transform: `translate(-${columnWidthPercent * leftIndex}%, 0)`,
    };
  }, [leftIndex, numberOfColumns]);

  const rightIndex = leftIndex + numberOfColumns;

  const canNavigateLeft = leftIndex > 0;
  const canNavigateRight = rightIndex < slots.length;

  return (
    <div className={css("")}>
      <div className={css("arrowButton")}>
        <AltButton
          isBlock
          onClick={handleNavigateLeft}
          disabled={!canNavigateLeft}
        >
          {"<"}
        </AltButton>
      </div>
      <div className={css("porthole")} ref={portholeRef}>
        <div className={css("allSlotButtons")} style={portholeStyles}>
          {slots.map((s, i) => (
            <div key={i} className={css("slotButtonContainer")}>
              <SlotButton
                slot={s}
                showHcpHint={showHcpHint}
                onClick={onSelection}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={css("arrowButton")}>
        <AltButton
          isBlock
          onClick={handleNavigateRight}
          disabled={!canNavigateRight}
        >
          {">"}
        </AltButton>
      </div>
    </div>
  );
};
