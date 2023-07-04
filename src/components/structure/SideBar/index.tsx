import * as React from "react";

import { Section, Header, Title, Body } from "../../abstract/Section";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "SideBar");

export interface ISideBarProps {
  children?: any;
}

export const SideBar: React.FC<ISideBarProps> = ({ children }) => (
  <div data-test="sidebar">
    <Section size="md">{children}</Section>
  </div>
);

interface ISideBarHeaderProps {
  children: any;
}

/**
 * Renders a SideBar header
 */
export const SideBarHeader: React.FC<ISideBarHeaderProps> = ({ children }) => (
  <Header className={css("header")}>{children}</Header>
);

export interface ISideBarTitleProps {
  className?: string;
  children: any;
}

export const SideBarTitle: React.FC<ISideBarTitleProps> = ({
  className = "",
  children,
}) => (
  <Title size={3} className={css("title", { className })}>
    {children}
  </Title>
);

interface ISideBarBodyProps {
  children: any;
  className?: string;
}

/**
 * Main content of a SideBar.
 */
export const SideBarBody: React.FC<ISideBarBodyProps> = ({
  children,
  className = "",
}) => {
  const noPadding = true;
  // if (env.theme === "svc" || env.theme === "zam") {
  //   noPadding = false;
  // }
  return (
    <Body className={className} noPadding={noPadding}>
      {children}
    </Body>
  );
};
