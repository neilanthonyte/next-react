import * as React from "react";
import { useMemo, useState } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { NoDataFallback } from "../../structure/NoDataFallback";
import { Button, TButtonVariant } from "../../generic/Button";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "SelectableListWithDetail");

export interface ISelectableListWithDetailAction {
  label: string;
  onClick: (args: unknown) => unknown;
  variant: TButtonVariant;
}

export interface ISelectableListWithDetailProps<T> {
  data: T[];
  renderListItem: (item: T) => React.ReactElement;
  renderSelectedItem: (item: T) => React.ReactElement;
  renderEmptyListFallback?: () => React.ReactElement;
  listActions?: ISelectableListWithDetailAction[];
}

/**
 * Component rendering a list of supplied items and corresponding selected item detail
 * The rendering of the items is handled via render props to allow use in different contexts
 */
export function SelectableListWithDetail<T>({
  data,
  renderListItem,
  renderSelectedItem,
  renderEmptyListFallback,
  listActions,
}: ISelectableListWithDetailProps<T>): React.ReactElement {
  if (!data || !Array.isArray(data)) {
    return null;
  }

  const showActions = useMemo(() => {
    return (
      !!listActions && Array.isArray(listActions) && listActions.length > 0
    );
  }, [listActions]);

  // default to first item selected
  const [selectedItem, setSelectedItem] = useState<number>(0);

  if (data.length === 0) {
    return renderEmptyListFallback ? (
      renderEmptyListFallback()
    ) : (
      <NoDataFallback message="No data in  our system" />
    );
  }

  return (
    <div className={css("")}>
      <div className={css("list")}>
        <div className={css("list_content")}>
          {data.map((d, i) => (
            <div
              key={i}
              className={css("list_item", { "-selected": i === selectedItem })}
              onClick={() => setSelectedItem(i)}
            >
              {renderListItem(d)}
            </div>
          ))}
        </div>
        {showActions && (
          <div className={css("list_actions")}>
            {listActions.map((action, index) => (
              <div key={index} className={css("list_actions_action")}>
                <Button
                  isBlock={listActions.length > 1}
                  onClick={action.onClick}
                  variant={action.variant}
                  size={EStandardSizes.Small}
                >
                  {action.label}
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className={css("detail")}>
        {renderSelectedItem(data[selectedItem])}
      </div>
    </div>
  );
}
