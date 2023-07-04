import * as React from "react";
import { ReactElement } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "actionable");

export interface IActionableProps {}

export const Actionable: React.FC<IActionableProps> = ({ children }) => {
  return <div className={css("")}>{children}</div>;
};

export interface IActionableContentProps {
  children: React.ReactElement;
}

export const ActionableContent: React.FC<IActionableContentProps> = ({
  children,
}) => {
  return <div className={css("body")}>{children}</div>;
};

// (alias) type ReactChild = string | number |
//   ReactElement<any, string | ((props: any) => ReactElement<any, string | ... | (new (props: any) => Component<any, any, any>)>) | (new (props: any) => Component<any, any, any>)>

export interface IActionableActionsProps {
  children:
    | ReactElement<(props: IActionableProps) => ReactElement<any>>
    | ReactElement<(props: IActionableProps) => ReactElement<any>>[];
  count?: number;
  stdSize?: EStandardSizes;
}

export const ActionableActions: React.FC<IActionableActionsProps> = ({
  children,
  count,
  stdSize = EStandardSizes.Medium,
}) => {
  // remove all false values from the end of the array as they are not rendered
  let newChildren = children as
    | React.ReactNode[]
    | React.ReactElement<
        (props: IActionableProps) => React.ReactElement<any>
      >[];
  if (Array.isArray(children)) {
    for (let i = children.length - 1; i >= 0; i--) {
      if (!children[i]) {
        newChildren = children.slice(0, i - children.length);
      } else {
        break;
      }
    }
  }
  if (typeof count !== "number") {
    count = Array.isArray(newChildren) ? newChildren.length : 1;
  }
  return (
    <div className={css("actions", `-size-${stdSize}`, `-count-${count}`)}>
      {React.Children.toArray(newChildren).map(
        (
          child: ReactElement<
            (props: IActionableProps) => ReactElement<IActionableProps>
          >,
          i,
        ) => {
          const props: IActionableProps = {
            stdSize,
          };
          return <span key={i}>{React.cloneElement(child, props)}</span>;
        },
      )}
    </div>
  );
};
