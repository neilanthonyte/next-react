import * as React from "react";
import { useContext, useEffect } from "react";

import { IHeaderAction } from "../../abstract/Section/components/Header";
import {
  SlimSection,
  SlimSectionBody,
  SlimSectionHeader,
  SlimSectionTitle,
} from "../SlimSection";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Flow");

interface IFlowContextValue {
  step: number;
}

const FlowContext = React.createContext<IFlowContextValue>({ step: 0 });

export interface IFlowProps {
  step: number;
}

/**
 * Component rendering a stepped through flow using context
 * IMPORTANT! only the active FlowStep component will render its content (children)
 */

export const Flow: React.FC<IFlowProps> = ({ children, step }) => {
  return (
    <div data-test="Flow">
      <FlowContext.Provider value={{ step }}>
        {React.Children.toArray(children).map((child, i) => (
          <div key={i}>
            {React.cloneElement(child as React.ReactElement, { index: i })}
          </div>
        ))}
      </FlowContext.Provider>
    </div>
  );
};

export interface IFlowStepEdit {
  label?: string;
  onClick: (args?: any) => any;
}

export interface IFlowStepProps {
  title: string;
  edit?: IFlowStepEdit;
  children?: any;
  icon?: string;
  // provided by Flow
  index?: number;
  headerOnClick?: (args?: any) => any;
}

/**
 * Component wrapping a flow step content
 * Non active FlowSteps will not render children
 */
export const FlowStep: React.FC<IFlowStepProps> = ({
  title,
  index,
  icon,
  edit,
  headerOnClick,
  children,
}) => {
  const { step } = useContext(FlowContext);
  const element = React.useRef<HTMLDivElement>();

  const actions: IHeaderAction[] =
    edit && index < step
      ? [
          {
            label: edit.label || "Edit",
            onClick: edit.onClick,
          },
        ]
      : [];

  const isActive = step === index;

  // scroll into view
  useEffect(() => {
    if (index === step) {
      setTimeout(() => {
        element.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }, 500);
    }
  }, [index, step]);

  return (
    <SlimSection
      open={isActive}
      size="md"
      fullWidth={true}
      isCollapsible={false}
      className={css("step", { "-pending": index > step })}
    >
      <SlimSectionHeader
        className={css("header")}
        isSticky={false}
        actions={actions}
        onClick={headerOnClick}
      >
        <div className={css("badge")} ref={element}>
          {index + 1}
        </div>
        <SlimSectionTitle>{title}</SlimSectionTitle>
      </SlimSectionHeader>

      {isActive && (
        <SlimSectionBody>
          <div className={css("body")}>{children}</div>
        </SlimSectionBody>
      )}
    </SlimSection>
  );
};
