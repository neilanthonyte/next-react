import * as React from "react";

import { Section, Header, Title, Body } from "../../abstract/Section";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "SideBarSection");

export interface ISideBarSectionProps {
  children?: any;
  isCollapsible?: boolean;
}

export const SideBarSection: React.FC<ISideBarSectionProps> = ({
  children,
}) => (
  <div data-test="sidebar-section">
    <Section size="md" className={css("")}>
      {children}
    </Section>
  </div>
);

interface ISideBarSectionHeaderProps {
  children: any;
}

/**
 * Renders a SideBarSection header
 */
export const SideBarSectionHeader: React.FC<ISideBarSectionHeaderProps> = ({
  children,
}) => (
  <Header className={css("header")} isSticky={true}>
    <div>{children}</div>
  </Header>
);

export interface ISideBarSectionTitleProps {
  className?: string;
  children: any;
}

export const SideBarSectionTitle: React.FC<ISideBarSectionTitleProps> = ({
  children,
  className,
}) => (
  <Title size={4} className={className}>
    {children}
  </Title>
);

interface ISideBarSectionBodyProps {
  children: any;
  className?: string;
}

/**
 * Main content of a SideBarSection.
 */
export const SideBarSectionBody: React.FC<ISideBarSectionBodyProps> = ({
  children,
}) => {
  return <Body className={css("body")}>{children}</Body>;
};
