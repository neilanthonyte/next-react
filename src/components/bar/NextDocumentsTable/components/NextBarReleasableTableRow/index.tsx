import * as React from "react";
import { useCallback, useMemo, useState } from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
import { ToggleSwitch } from "../../../../generic/ToggleSwitch";
import { Loader } from "../../../../generic/Loader";
import { IReleasableData } from "next-shared/src/types/IReleasableData";
import { TableRow, TableCell } from "../../../../structure/Table";
import { humaneDate } from "../../../../../helpers/humaneDate";
const css = cssComposer(styles, "NextBarReleasableTableRow");

interface INextBarReleasableTableRowProps<T extends IReleasableData> {
  result: T;
  onRelease: (letter: T) => Promise<void>;
  onUnrelease: (letter: T) => Promise<void>;
  isUpdating?: boolean;
}

export function NextBarReleasableTableRow<T extends IReleasableData>({
  result,
  onRelease,
  onUnrelease,
  isUpdating = false,
}: INextBarReleasableTableRowProps<T>) {
  const [showLoader, setShowLoader] = useState(false);

  const onClick = useCallback(() => {
    setShowLoader(true);
    return (result.released ? onUnrelease(result) : onRelease(result)).finally(
      () => setShowLoader(false),
    );
  }, [result, onRelease, onUnrelease]);

  // message to display in toast if onRelease/onUnrelease fails.
  const errorMsg = useMemo(
    () => `Unable to ${result.released ? "unrelease" : "release"} item.`,
    [result],
  );

  return (
    <TableRow>
      <TableCell>
        <div className={css("restricted")} data-test="patientletter-type">
          {result.name}
        </div>
      </TableCell>
      <TableCell>
        <div className={css("restricted")} data-test="patientletter-date">
          {humaneDate(result.date)}
        </div>
      </TableCell>
      <TableCell>
        <div className={css("restricted")} data-test="patientletter-released">
          {result.released ? humaneDate(result.released) : null}
        </div>
      </TableCell>
      <TableCell>
        {showLoader && <Loader />}
        {/* Padding so the spinner doesn't overlap with the ToggleSwitch */}
        &nbsp;&nbsp;
        <ToggleSwitch
          onSwitch={onClick}
          small={true}
          active={!!result.released}
          errorMsg={errorMsg}
          disabled={isUpdating}
        />
      </TableCell>
    </TableRow>
  );
}
