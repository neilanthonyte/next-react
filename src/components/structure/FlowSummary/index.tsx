import * as React from "react";
import { useState } from "react";

import { Button, BlockButton, TButtonVariant } from "../../generic/Button";
import { Icon } from "../../generic/Icon";
import { CSSTransition } from "react-transition-group";
import { ICssTransition } from "../../../helpers/cssTransitions";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "FlowSummary");

export const transition: ICssTransition = {
  enter: css("transitionEnter"),
  enterActive: css("transitionEnterActive"),
  appear: css("transitionAppear"),
  appearActive: css("transitionAppearActive"),
  exit: css("transitionExit"),
  exitActive: css("transitionExitActive"),
};

export interface IFlowSummaryAction {
  label: string;
  onClick: () => void;
  variant?: TButtonVariant;
}

interface ISummaryActionsProps {
  actions: IFlowSummaryAction[];
}
const SummaryActions: React.FC<ISummaryActionsProps> = ({ actions }) => {
  return (
    <div>
      {actions.map((a) => (
        <Button
          key={a.label}
          onClick={a.onClick}
          className={css("summaryAction")}
          variant={a.variant || "secondary"}
        >
          {a.label}
        </Button>
      ))}
    </div>
  );
};

export interface IFlowSummaryProps {
  actions?: IFlowSummaryAction[];
  showActionsInExpandedSummary?: boolean;
  children?: any;
  variant?: "mobile" | "desktop";
  fixedPositioning?: boolean;
  useChevron?: boolean;
  toggleSummary?: boolean;
  open?: boolean;
}

export const FlowSummary: React.FC<IFlowSummaryProps> = ({
  children,
  actions = [],
  showActionsInExpandedSummary = true,
  variant,
  fixedPositioning = true,
  useChevron = false,
  toggleSummary = false,
  open = true,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  let desktopHeader,
    inlineSummary,
    expandedSummary,
    decoration = null;

  React.Children.map(children, (child: React.ReactElement<any>) => {
    switch (child.type) {
      case FlowSummaryDestopHeader:
        desktopHeader = child;
        break;
      case FlowSummaryExpanded:
        expandedSummary = child;
        break;
      case FlowInlineSummaryMobile:
        inlineSummary = child;
        break;
      case FlowSummaryDecoration:
        decoration = child;
        break;
    }
  });

  const toggleVisibility = () => setIsExpanded(!isExpanded);

  let detailAction: IFlowSummaryAction[] = [];
  if (expandedSummary && !useChevron) {
    // TODO disable button when FlowSummaryExpanded has no children
    detailAction.push({
      label: "Details",
      onClick: toggleVisibility,
      // variant: "primary",
    });
  }
  detailAction = detailAction.concat(actions);

  return (
    <div>
      <CSSTransition
        in={open}
        classNames={transition}
        className={css("", {
          "-mobile": variant === "mobile",
          "-fixed": fixedPositioning,
        })}
        timeout={500}
        unmountOnExit
      >
        <div>
          {!!desktopHeader && (
            <div className={css("desktopHeader")} data-test="desktop-header">
              {desktopHeader}
            </div>
          )}
          <div
            className={css("expandedSummary", { "-collapse": !isExpanded })}
            data-test="expanded-summary"
          >
            <div className={css("expandedSummary_inner")}>
              {expandedSummary}
              {actions &&
                showActionsInExpandedSummary &&
                actions.map((a) => (
                  <BlockButton
                    key={a.label}
                    onClick={a.onClick}
                    className={css("action")}
                  >
                    {a.label}
                  </BlockButton>
                ))}
            </div>
          </div>
          <div className={css("decoration", { "-hide": isExpanded })}>
            {decoration}
          </div>
          <div
            className={css("inlineSummary")}
            data-test="inline-summary"
            onClick={() => {
              if (useChevron || toggleSummary) {
                toggleVisibility();
              }
            }}
          >
            {useChevron && (
              <span className={css("chevron", { "-isExpanded": isExpanded })}>
                <Icon name="chevron-right" />
              </span>
            )}
            <span className={css("inlineSummary_body")}>{inlineSummary}</span>
            <span className={css("inlineSummary_actions")}>
              <SummaryActions actions={detailAction} />
            </span>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export const FlowSummaryDestopHeader: React.FC = ({ children }) => {
  return <>{children}</>;
};

export const FlowSummaryExpanded: React.FC = ({ children }) => {
  return <>{children}</>;
};

export const FlowInlineSummaryMobile: React.FC = ({ children }) => {
  return <>{children}</>;
};

export const FlowSummaryDecoration: React.FC = ({ children }) => {
  return <>{children}</>;
};

export interface IFlowSummaryOffsetProps {}

/**
 * Provides padding when a FlowSummary is being used
 */
export const FlowSummaryOffset: React.FC<IFlowSummaryOffsetProps> = ({}) => {
  return <div className={styles.FlowSummaryOffset} />;
};
