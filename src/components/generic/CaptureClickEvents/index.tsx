import * as React from "react";
import { ReactElement } from "react";

export interface ICaptureClickEventProps {
  children: ReactElement[];
}

/**
 * Captures click events that have bubbled up from children & prevents any event
 * handlers further up the DOM hieracrchy from being called.
 */
export const CaptureClickEvents: React.FC<ICaptureClickEventProps> = ({
  children,
}) => {
  const _onClick = (onClick: Function) => (e: Event) => {
    e && e.stopPropagation();
    onClick && onClick(e);
  };
  return (
    <>
      {React.Children.map(children, (c: ReactElement, i: number) =>
        React.cloneElement(c, {
          ...c.props,
          key: c.key || `${c.type}${i}`,
          onClick: _onClick(c.props.onClick),
        }),
      )}
    </>
  );
};
