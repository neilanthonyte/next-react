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

export interface ISidePanelPageSectionProps {
  children: any;
  id?: string;
}

export const SidePanelPageSection: React.FC<ISidePanelPageSectionProps> = ({
  children,
  id,
}) => (
  <div data-test="side-panel-page-section">
    <Section size="md" fullWidth={true} id={id}>
      {children}
    </Section>
  </div>
);

interface ISidePanelPageSectionHeaderProps extends IHeaderProps {
  children: any;
  isSticky?: boolean;
  className?: string;
}

/**
 * Renders a side panel page section header
 */
export const SidePanelPageSectionHeader: React.FC<
  ISidePanelPageSectionHeaderProps
> = ({ children, isSticky = false, className = "", ...rest }) => (
  <Header className={className} isSticky={isSticky} {...rest}>
    {children}
  </Header>
);

export interface ISidePanelPageSectionTitleProps {
  className?: string;
  children: any;
}

export const SidePanelPageSectionTitle: React.FC<
  ISidePanelPageSectionTitleProps
> = ({ className = "", children }) => (
  <Title size={3} className={className}>
    {children}
  </Title>
);

interface ISidePanelPageSectionHeaderInputsProps extends IHeaderInputsProps {}

export const SidePanelPageSectionHeaderInputs: React.FC<
  ISidePanelPageSectionHeaderInputsProps
> = ({ children }) => <HeaderInputs>{children}</HeaderInputs>;

interface ISidePanelPageSectionHeaderActionsProps extends IHeaderActionsProps {}

export const SidePanelPageSectionHeaderActions: React.FC<
  ISidePanelPageSectionHeaderActionsProps
> = ({ children }) => <HeaderActions>{children}</HeaderActions>;

interface ISidePanelPageSectionBodyProps {
  children: any;
  className?: string;
}

interface ISidePanelPageSectionBodyProps {
  children: any;
  className?: string;
}

/**
 * Main content of a side panel page section.
 */
export const SidePanelPageSectionBody: React.FC<
  ISidePanelPageSectionBodyProps
> = ({ children, className = "" }) => (
  <Body className={className}>{children}</Body>
);

export interface ISidePanelPageSectionOptionsProps extends IOptionsProps {
  className?: string;
}

/**
 * Renders a side panel page section header
 */
export const SidePanelPageSectionOptions: React.FC<
  ISidePanelPageSectionOptionsProps
> = ({ className = "", ...rest }) => <Options {...rest} />;
