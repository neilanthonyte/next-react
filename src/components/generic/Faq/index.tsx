import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "faq");

import {
  Section,
  Header,
  Title,
  Body,
  IOptionsProps,
} from "../../abstract/Section";

export interface IFaqProps {
  children?: any;
  open?: boolean;
}

export const Faq: React.FC<IFaqProps> = ({ children, open = false }) => (
  <Section className={css("")} isCollapsible={true} open={open} size="sm">
    {children}
  </Section>
);

interface IFaqHeaderProps {
  children: any;
  isSticky?: boolean;
  className?: string;
}

/**
 * Renders a Faq header
 */
export const FaqHeader: React.FC<IFaqHeaderProps> = ({
  children,
  isSticky = false,
  ...rest
}) => (
  <Header isSticky={isSticky} {...rest}>
    <Title size={4}>{children}</Title>
  </Header>
);

interface IFaqBodyProps {
  children: any;
  className?: string;
}

/**
 * Main content of a Faq.
 */
export const FaqBody: React.FC<IFaqBodyProps> = ({ children }) => (
  <Body>
    <div className={css("body")}>{children}</div>
  </Body>
);

export interface IFaqOptionsProps extends IOptionsProps {
  className?: string;
}
