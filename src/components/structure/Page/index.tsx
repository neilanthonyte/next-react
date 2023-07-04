import * as React from "react";

import {
  Section,
  Header,
  Body,
  Title,
  Options,
  IOptionsProps,
  ITitleProps,
} from "../../abstract/Section";
import {
  HeaderInputs,
  IHeaderInputsProps,
} from "../../abstract/Section/components/Header";
import { ImgBlock } from "../../generic/ImgBlock";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Page");

export interface IPageProps {
  posterImage?: string;
  transparent?: boolean;
}

/**
 *  Container for a page
 */
export const Page: React.FC<IPageProps> = ({
  children,
  posterImage,
  transparent,
}) => (
  <div data-test="page">
    {posterImage && <ImgBlock src={posterImage} size="md" />}
    <Section className={css("", { "-transparent": transparent })} size="lg">
      {children}
    </Section>
  </div>
);

/**
 *  Main content of a page
 */
export const PageBody: React.FC = ({ children }) => (
  <Body className={css("body")} noPadding={true}>
    {children}
  </Body>
);

export interface IPageHeaderProps {}

/**
 *  Renders the page header with title and optional options
 */
export const PageHeader: React.FC<IPageHeaderProps> = ({ children }) => (
  <Header className={css("header")} isSticky={true}>
    {children}
  </Header>
);

interface IPageHeaderInputsProps extends IHeaderInputsProps {}

export const PageHeaderInputs: React.FC<IPageHeaderInputsProps> = ({
  children,
}) => <HeaderInputs>{children}</HeaderInputs>;
/**
 *  Renders the page title.
 */
export const PageTitle: React.FC<ITitleProps> = ({ children, ...rest }) => (
  <Title size={2} {...rest}>
    {children}
  </Title>
);

export interface IPageOptionsProps extends IOptionsProps {
  className?: string;
}

/**
 * Renders a Page header
 */
export const PageOptions: React.FC<IPageOptionsProps> = (props) => (
  <Options {...props} />
);
