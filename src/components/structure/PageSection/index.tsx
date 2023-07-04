import * as React from "react";

import {
  Section,
  Header,
  Title,
  Body,
  Options,
  IOptionsProps,
  IHeaderProps,
} from "../../abstract/Section";
import {
  HeaderActions,
  HeaderInputs,
  IHeaderActionsProps,
  IHeaderInputsProps,
} from "../../abstract/Section/components/Header";
import { PageSectionCtrl } from "./_tests/index.ctrl";

export interface IPageSectionProps {
  children: any;
  id?: string;
  className?: string;
  isCollapsible?: boolean;
  open?: boolean;
}

export const PageSection: React.FC<IPageSectionProps> = ({
  children,
  id,
  className,
  isCollapsible = false,
  open,
}) => (
  <Section
    className={className}
    size="lg"
    id={id}
    dataTest={PageSectionCtrl.selector}
    isCollapsible={isCollapsible}
    open={open}
  >
    {children}
  </Section>
);

interface IPageSectionHeaderProps extends IHeaderProps {
  children: any;
  isSticky?: boolean;
  className?: string;
}

/**
 * Renders a PageSection header
 */
export const PageSectionHeader: React.FC<IPageSectionHeaderProps> = ({
  children,
  isSticky = false,
  className = "",
  ...rest
}) => (
  <Header className={className} isSticky={isSticky} {...rest}>
    {children}
  </Header>
);

export interface IPageSectionTitleProps {
  className?: string;
  children: any;
}

export const PageSectionTitle: React.FC<IPageSectionTitleProps> = ({
  className = "",
  children,
}) => (
  <Title size={3} className={className}>
    {children}
  </Title>
);

interface IPageSectionHeaderInputsProps extends IHeaderInputsProps {}

export const PageSectionHeaderInputs: React.FC<
  IPageSectionHeaderInputsProps
> = ({ children }) => <HeaderInputs>{children}</HeaderInputs>;

interface IPageSectionHeaderActionsProps extends IHeaderActionsProps {}

export const PageSectionHeaderActions: React.FC<
  IPageSectionHeaderActionsProps
> = ({ children }) => <HeaderActions>{children}</HeaderActions>;

interface IPageSectionBodyProps {
  children: any;
  className?: string;
}

interface IPageSectionBodyProps {
  children: any;
  className?: string;
}

/**
 * Main content of a PageSection.
 */
export const PageSectionBody: React.FC<IPageSectionBodyProps> = ({
  children,
  className = "",
}) => <Body className={className}>{children}</Body>;

export interface IPageSectionOptionsProps extends IOptionsProps {
  className?: string;
}

/**
 * Renders a PageSection header
 */
export const PageSectionOptions: React.FC<IPageSectionOptionsProps> = ({
  className = "",
  ...rest
}) => <Options {...rest} />;
