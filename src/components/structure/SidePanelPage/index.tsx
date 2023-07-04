import * as React from "react";

import {
  Section,
  Header,
  Body,
  Title,
  Options,
  IOptionsProps,
} from "../../abstract/Section";

/**
 *  Container for a side panel page
 */
export const SidePanelPage: React.FC = ({ children }) => (
  <div data-test="side-panel-page">
    <Section size="lg">{children}</Section>
  </div>
);

/**
 *  Main content of a side panel page
 */
export const SidePanelPageBody: React.FC = ({ children }) => (
  <Body>{children}</Body>
);

export interface ISidePanelPageHeaderProps {
  decorationImage?: string;
}

/**
 *  Renders the side panel page header with title and optional options
 */
export const SidePanelPageHeader: React.FC<ISidePanelPageHeaderProps> = ({
  decorationImage,
  children,
}) => <Header>{children}</Header>;
/**
 *  Renders the side panel page header with title and optional options
 */
export const SidePanelPageTitle: React.FC = ({ children }) => (
  <Title size={2}>{children}</Title>
);

export interface ISidePanelPageOptionsProps extends IOptionsProps {
  className?: string;
}

/**
 * Renders a side panel page options
 */
export const SidePanelPageOptions: React.FC<ISidePanelPageOptionsProps> = (
  props,
) => <Options {...props} />;
