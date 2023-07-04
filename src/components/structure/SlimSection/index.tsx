import * as React from "react";

import {
  Section,
  Header,
  Title,
  Body,
  Options,
  IOptionsProps,
  IHeaderProps,
  ISectionProps,
} from "../../abstract/Section";
import {
  HeaderActions,
  HeaderInputs,
  IHeaderActionsProps,
  IHeaderInputsProps,
} from "../../abstract/Section/components/Header";

export const SlimSection: React.FC<ISectionProps> = ({
  children,
  id,
  ...rest
}) => (
  <Section size="lg" id={id} candycane={true} narrow={true} {...rest}>
    {children}
  </Section>
);

interface ISlimSectionHeaderProps extends IHeaderProps {
  children: any;
  isSticky?: boolean;
  className?: string;
}

/**
 * Renders a SlimSection header
 */
export const SlimSectionHeader: React.FC<ISlimSectionHeaderProps> = ({
  children,
  isSticky = false,
  className = "",
  ...rest
}) => (
  <Header className={className} isSticky={isSticky} {...rest}>
    {children}
  </Header>
);

export interface ISlimSectionTitleProps {
  className?: string;
  children: any;
}

export const SlimSectionTitle: React.FC<ISlimSectionTitleProps> = ({
  className = "",
  children,
}) => (
  <Title size={3} className={className}>
    {children}
  </Title>
);

interface ISlimSectionHeaderInputsProps extends IHeaderInputsProps {}

export const SlimSectionHeaderInputs: React.FC<
  ISlimSectionHeaderInputsProps
> = ({ children }) => <HeaderInputs>{children}</HeaderInputs>;

interface ISlimSectionHeaderActionsProps extends IHeaderActionsProps {}

export const SlimSectionHeaderActions: React.FC<
  ISlimSectionHeaderActionsProps
> = ({ children }) => <HeaderActions>{children}</HeaderActions>;

interface ISlimSectionBodyProps {
  children: any;
  className?: string;
}

interface ISlimSectionBodyProps {
  children: any;
  className?: string;
}

/**
 * Main content of a SlimSection.
 */
export const SlimSectionBody: React.FC<ISlimSectionBodyProps> = ({
  children,
  className = "",
}) => <Body className={className}>{children}</Body>;

export interface ISlimSectionOptionsProps extends IOptionsProps {
  className?: string;
}

/**
 * Renders a SlimSection header
 */
export const SlimSectionOptions: React.FC<ISlimSectionOptionsProps> = ({
  className = "",
  ...rest
}) => <Options {...rest} />;
