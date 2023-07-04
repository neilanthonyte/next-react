import * as React from "react";

import { Button } from "../../generic/Button";
import { defaultMessage } from "./defaultMessage";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

export interface IFallbackAction {
  label: string;
  onClick: () => void;
}

export interface INoDataFallback {
  message?: string;
  actions?: IFallbackAction[];
}

/**
 * Used to display a missing info messsage when no children are passed through
 */
export const NoDataFallback: React.FC<INoDataFallback> = (props) => {
  const { children, message = defaultMessage, actions } = props;
  const hasContent = !!children;

  return (
    <div>
      {hasContent && <div data-test="content">{children}</div>}
      {!hasContent && (
        <div className={css("noDataCell")} data-test="fallback">
          <div className={css("noDataCell_message")} data-test="message">
            {message}
          </div>
          {actions && actions.length && (
            <div className={css("noDataCell_actions")} data-test="actions">
              {actions.map((action, i) => (
                <div key={i} data-test={`action-${i}`}>
                  <Button onClick={action.onClick}>{action.label}</Button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
