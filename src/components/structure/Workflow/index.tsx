import * as React from "react";

import {
  Section,
  Header,
  Title,
  Body,
  IHeaderProps,
} from "../../abstract/Section";
import { Cell, CellHeader, CellDescription, CellType } from "../Cell";
import { Button } from "../../generic/Button";
import { Card, CardBody } from "../Card";
import { PlaceholderView } from "../../views/PlaceholderView";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Workflow");

export const Workflow: React.FC = ({ children }) => {
  return <div data-test="Workflow">{children}</div>;
};

export interface IWorkflowItemProps {
  children?: any;
  open?: boolean;
}

/**
 * Contains all of the work flow items
 */
export const WorkflowBody: React.FC = ({ children }) => {
  return <div data-test="WorkflowBody"> {children}</div>;
};

export const WorkflowItem: React.FC<IWorkflowItemProps> = ({
  children,
  open = true,
}) => (
  <div data-test="WorkflowItem">
    <Section isCollapsible={true} open={open} size="md">
      {children}
    </Section>
  </div>
);

interface IWorkflowItemHeaderProps extends IHeaderProps {
  children: any;
  isSticky?: boolean;
  className?: string;
}

/**
 * Renders a Workflow header
 */
export const WorkflowItemHeader: React.FC<IWorkflowItemHeaderProps> = ({
  children,
  isSticky = false,
  ...rest
}) => (
  <Header className={css("header")} isSticky={isSticky} {...rest}>
    {children}
  </Header>
);

export interface IWorkflowItemTitleProps {
  className?: string;
  children: any;
}

export const WorkflowItemTitle: React.FC<IWorkflowItemTitleProps> = ({
  children,
  className,
}) => (
  <Title size={4} className={css("title", className)}>
    {children}
  </Title>
);

interface IWorkflowItemBodyProps {
  children: any;
  className?: string;
}

/**
 * Main content of a Workflow.
 */
export const WorkflowItemBody: React.FC<IWorkflowItemBodyProps> = ({
  children,
  className = "",
}) => <Body className={className}>{children}</Body>;

export interface IWorkflowSummaryItemProps {
  label: string;
  description: string | string[];
  icon?: string;
  image?: string;
  showChange?: boolean;
  onChangeClicked?: () => void;
}

// TODO move into own component folder
export const WorkflowSummaryItem: React.FC<IWorkflowSummaryItemProps> = (
  props,
) => {
  return (
    <div data-test="WorkflowSummaryItem" className={css("summary_item")}>
      <Cell decorationIcon={props.icon} decorationImage={props.image}>
        <CellType>{props.label}</CellType>
        <CellDescription>
          {Array.isArray(props.description)
            ? props.description.map((d, i) => (
                <>
                  {d}
                  {i < props.description.length - 1 && <br />}
                </>
              ))
            : props.description}
        </CellDescription>
      </Cell>
      {props.showChange && (
        <div data-test="summary-item-change">
          <Button onClick={props.onChangeClicked}>Change</Button>
        </div>
      )}
    </div>
  );
};

export interface IWorkflowSummaryProps {
  children: any;
  /**
   * The message above the summary
   */
  message: string;
}

export const WorkflowSummary: React.FC<IWorkflowSummaryProps> = ({
  children,
  message,
}) => {
  return (
    <div data-test="WorkflowSummary" className={css("summary")}>
      <Title size={4} className={css("summary_header")} position="center">
        {message}
      </Title>
      <div className={css("summary_content")}>
        <Card>
          <CardBody>
            {children ? (
              children
            ) : (
              <PlaceholderView icon={null} instruction="No Selections" />
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
