import * as React from "react";
import { CSSProperties } from "react";
import { Button } from "../../components/generic/Button";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

export interface IDebugPositionProps {
  fixed: boolean;
  setFixed?: (fixed: boolean) => any;
  fullScreen?: boolean;
}
export const DebugPosition: React.FC<IDebugPositionProps> = ({
  fixed,
  children,
  fullScreen,
}) => {
  const fixedStyle: CSSProperties = {
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    height: !!fullScreen ? "100%" : "auto",
    zIndex: 1000,
  };

  return <div style={fixed ? fixedStyle : null}>{children}</div>;
};
