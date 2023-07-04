import * as React from "react";
import { useState } from "react";

import { Icon } from "../../generic/Icon";
import { Popover } from "../../generic/Popover";
import { List, ListItem } from "../../structure/List";
import {
  IOptionsPopoverOption,
  IOptionsPopoverSection,
  OptionsPopover,
} from "../OptionsPopover";

export interface ITableAction<T> {
  label: string;
  icon: string;
  onClick: (item: T) => unknown;
  showInRow?: boolean;
  showInPopUp?: boolean;
  isHidden?: (item: T) => unknown;
}

export interface ITableActionsProps<T> {
  data: T;
  actions: ITableAction<T>[];
}

/**
 * Displays a set of actions as icons, along with a popover for a complete list.
 */
export function TableActions<RowData>({
  data,
  actions,
}: ITableActionsProps<RowData>): React.ReactElement {
  const [showPopup, setShowPopup] = useState<boolean>(false);

  // items to show in the popover
  const popOverItems: IOptionsPopoverOption[] = actions
    .filter((a) => {
      if (a.isHidden !== undefined && a.isHidden(data)) {
        return false;
      }
      if (a.showInPopUp !== undefined) {
        return a.showInPopUp;
      }
      return true;
    })
    .map((item) => ({
      label: item.label,
      icon: item.icon,
      onClick: () => item.onClick(data),
    }));

  const rowItems = actions.filter((a) => {
    if (a.isHidden !== undefined && a.isHidden(data)) {
      return false;
    }
    if (a.showInRow !== undefined) {
      return a.showInRow;
    }
    return true;
  });

  const target = <Icon name="more_2" onClick={() => setShowPopup(true)} />;

  return (
    <>
      {rowItems.map((a) => (
        <span key={a.label}>
          <Icon name={a.icon} onClick={() => a.onClick(data)} />{" "}
        </span>
      ))}
      {popOverItems.length > 0 && (
        <OptionsPopover
          open={showPopup}
          closeHandler={() => setShowPopup(false)}
          target={target}
          sections={[{ options: popOverItems }]}
        />
      )}
    </>
  );
}
