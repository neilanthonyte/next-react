import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import {
  CollapsibleContext,
  ICollapsibleContext,
} from "../../../contexts/CollapsibleContext";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "baseSection");

export type ISectionSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ISectionState =
  | "success"
  | "fail"
  | "error"
  | "danger"
  | "invalid"
  | "info"
  | "warning"
  | "disabled"
  | "urgency-low"
  | "urgency-med"
  | "urgency-high";

export interface ISectionProps {
  isCollapsible?: boolean;
  open?: boolean;
  className?: string;
  id?: string;
  size?: ISectionSize;
  state?: ISectionState;
  fancy?: boolean;
  children: any; //Element[];
  /** Suppress side padding */
  fullWidth?: boolean;
  /** Alternate the colours */
  candycane?: boolean;
  /** Keep the content within a max width */
  narrow?: boolean;
  /** Optional alternative data-test attribute. Needed for PageSection. */
  dataTest?: string;
}

/**
 * Component used as foundation for Sections of content. Provides some behaviour and minimal style.
 */
export const Section: React.FC<ISectionProps> = ({
  children,
  className,
  open = true,
  isCollapsible = false,
  fullWidth = false,
  state = "",
  fancy = false,
  id = "",
  size = "",
  candycane = false,
  narrow = false,
  dataTest = "section",
}) => {
  const [isCollapsed, setIsCollapsed] = useState(!open);

  // tie together
  useEffect(() => {
    setIsCollapsed(!open);
  }, [open]);

  const onToggleCollapse = useCallback(() => {
    setIsCollapsed(!isCollapsed);
  }, [isCollapsed]);

  const provider: ICollapsibleContext = isCollapsible
    ? {
        onToggleCollapse,
        isCollapsed,
      }
    : {
        onToggleCollapse: undefined,
        isCollapsed,
      };

  const classes = css("", `-size-${size}`, `-state-${state}`, {
    "-collapsible": isCollapsible,
    "-collapsed": isCollapsed,
    "-fancy": fancy,
    "-fullWidth": fullWidth,
    "-candycane": candycane,
    "-narrow": narrow,
    className,
  });

  return (
    <CollapsibleContext.Provider value={provider}>
      <div className={classes} id={id} data-test={dataTest}>
        {children}
      </div>
    </CollapsibleContext.Provider>
  );
};

import { Body, IBodyProps } from "./components/Body";
import { Header, IHeaderProps } from "./components/Header";
import { Title, ITitleProps } from "./components/Title";
import { Options, IOptionsProps } from "./components/Options";

export {
  Body,
  IBodyProps,
  Header,
  IHeaderProps,
  Title,
  ITitleProps,
  Options,
  IOptionsProps,
};
