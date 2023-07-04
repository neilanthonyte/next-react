import * as React from "react";

import {
  Section,
  Header,
  Title,
  Body,
  Options,
  IOptionsProps,
} from "../../abstract/Section";
import {
  IHeaderAction,
  HeaderActions,
  IHeaderActionsProps,
  HeaderInputs,
  IHeaderInputsProps,
} from "../../abstract/Section/components/Header";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "block");

export interface IBlockProps {
  children?: any;
  open?: boolean;
}

export const Block: React.FC<IBlockProps> = ({ children, open = true }) => {
  return (
    <Section className={css("")} isCollapsible={true} open={open} size="sm">
      {children}
    </Section>
  );
};

interface IBlockHeaderProps {
  children: any;
  isSticky?: boolean;
  className?: string;
  onClick?: (args?: any) => any;
  actions?: IHeaderAction[];
  label?: string;
}

/**
 * Renders a block header
 */
export const BlockHeader: React.FC<IBlockHeaderProps> = ({
  children,
  isSticky = false,
  className = "",
  actions,
  label,
  ...rest
}) => {
  return (
    <Header
      className={className}
      isSticky={isSticky}
      actions={actions}
      label={label}
      {...rest}
    >
      {children}
    </Header>
  );
};

export interface IBlockTitleProps {
  className?: string;
  children: any;
}

export const BlockTitle: React.FC<IBlockTitleProps> = ({
  className = "",
  children,
}) => (
  <Title size={4} className={className}>
    {children}
  </Title>
);

interface IBlockHeaderActionsProps extends IHeaderActionsProps {}

export const BlockHeaderActions: React.FC<IBlockHeaderActionsProps> = ({
  children,
}) => <HeaderActions>{children}</HeaderActions>;

interface IBlockHeaderInputsProps extends IHeaderInputsProps {}

export const BlockHeaderInputs: React.FC<IBlockHeaderInputsProps> = ({
  children,
}) => <HeaderInputs>{children}</HeaderInputs>;

interface IBlockBodyProps {
  children: any;
  className?: string;
}

/**
 * Main content of a block.
 */
export const BlockBody: React.FC<IBlockBodyProps> = ({
  children,
  className = "",
}) => {
  return <Body className={className}>{children}</Body>;
};

export interface IBlockOptionsProps extends IOptionsProps {
  className?: string;
}

/**
 * Renders a block header
 */
export const BlockOptions: React.FC<IBlockOptionsProps> = ({
  className = "",
  ...rest
}) => <Options {...rest} />;
