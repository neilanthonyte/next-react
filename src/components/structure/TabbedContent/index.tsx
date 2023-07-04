import * as React from "react";
import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { ELayoutVariant } from "next-shared/src/types/layouts";

import { Badge } from "../../generic/Badge";
import { Loader } from "../../generic/Loader";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { ICssTransition } from "../../../helpers/cssTransitions";
const css = cssComposer(styles, "TabbedContent");

export const defaultTransition: ICssTransition = {
  appear: styles.TabbedContent_transitionEnter,
  appearActive: styles.TabbedContent_transitionEnterActive,
  enter: styles.TabbedContent_transitionEnter,
  enterActive: styles.TabbedContent_transitionEnterActive,
  exit: styles.TabbedContent_transitionExit,
  exitActive: styles.TabbedContent_transitionExitActive,
};

interface ITabMeasurements {
  width: number;
  left: number;
}

interface ITabbedContentContextValue {
  activeTabIndex: number;
  setActiveTabIndex: (tab: number) => void;
  tabsMeasurements: ITabMeasurements[];
  registerTabMeasurements: (
    tabIndex: number,
    tabMeasurements: ITabMeasurements,
  ) => void;
  setActiveTabMeasurements: (tabMeasurements: ITabMeasurements) => void;
  activeTabMeasurements: ITabMeasurements;
}

const TabbedContentContext = React.createContext<ITabbedContentContextValue>({
  activeTabIndex: null,
  setActiveTabIndex: null,
  tabsMeasurements: null,
  registerTabMeasurements: null,
  setActiveTabMeasurements: null,
  activeTabMeasurements: null,
});

export interface ITabbedContentProps {
  variant?: ELayoutVariant;
}
/**
 * Group of components rendering tabbed content
 */
export const TabbedContent: React.FC<ITabbedContentProps> = ({
  children,
  variant,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0);
  const [activeTabMeasurements, setActiveTabMeasurements] =
    useState<ITabMeasurements>();

  const tabsMeasurements = useRef<ITabMeasurements[]>([]).current;

  const registerTabMeasurements = useCallback(
    (tabIndex: number, tabMeasurements: ITabMeasurements) => {
      if (!tabMeasurements) return;

      tabsMeasurements[tabIndex] = tabMeasurements;
      if (tabIndex === activeTabIndex) {
        setActiveTabMeasurements(tabMeasurements);
      }
    },
    [activeTabIndex],
  );

  return (
    <TabbedContentContext.Provider
      value={{
        activeTabIndex,
        setActiveTabIndex,
        tabsMeasurements,
        registerTabMeasurements,
        activeTabMeasurements,
        setActiveTabMeasurements,
      }}
    >
      <div className={css("", `-${variant}`)}>{children}</div>
    </TabbedContentContext.Provider>
  );
};

export interface ITabbedContentTabsProps {}

export const TabbedContentTabs: React.FC<ITabbedContentTabsProps> = ({
  children,
}) => {
  const { setActiveTabIndex, activeTabMeasurements, tabsMeasurements } =
    useContext(TabbedContentContext);

  const { width, scaleX, translateX } = useMemo(() => {
    if (!activeTabMeasurements) {
      return {
        width: 0,
        scaleX: 0,
        translateX: 0,
      };
    }

    const widths = tabsMeasurements.map((m) => m.width);
    const longest = Math.max(...widths);
    return {
      width: longest,
      scaleX: activeTabMeasurements.width / longest,
      translateX: activeTabMeasurements.left,
    };
  }, [activeTabMeasurements, tabsMeasurements]);

  return (
    <div className={css("tabs")}>
      {React.Children.map(children, (child, index) => (
        <span className={css("tab")} onClick={() => setActiveTabIndex(index)}>
          {React.cloneElement(
            child as React.ReactElement<ITabbedContentTabProps>,
            {
              index,
            },
          )}
        </span>
      ))}
      <div
        className={css("active")}
        style={{
          transform: `translateX(${translateX}px) scaleX(${scaleX})`,
          width: width,
        }}
      />
    </div>
  );
};

export interface ITabbedContentTabProps {
  label: string;
  counter?: number;
  isLoading?: boolean;
  index?: number;
}
export const TabbedContentTab: React.FC<ITabbedContentTabProps> = ({
  label,
  counter,
  isLoading = false,
  index,
}) => {
  const { activeTabIndex, registerTabMeasurements, setActiveTabMeasurements } =
    useContext(TabbedContentContext);

  const isCurrentTab = useMemo(
    () => activeTabIndex === index,
    [activeTabIndex, index],
  );

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;
    registerTabMeasurements(index, {
      width: ref.current.offsetWidth,
      left: ref.current.offsetLeft,
    });
  }, [registerTabMeasurements]);

  // update measuremnets whenever the active tab and its counter and loading state change
  useEffect(() => {
    if (!isCurrentTab) return;
    setActiveTabMeasurements({
      width: ref.current.offsetWidth,
      left: ref.current.offsetLeft,
    });
  }, [isCurrentTab, isLoading, counter]);

  return (
    <div ref={ref}>
      {label}

      {isLoading ? (
        <span className={css("tab_loader")}>
          <Loader />
        </span>
      ) : (
        !!counter && (
          <span className={css("tab_badge")}>
            <Badge size={EStandardSizes.Small} variant={TColorVariants.Danger}>
              {counter}
            </Badge>
          </span>
        )
      )}
    </div>
  );
};

export interface ITabbedContentPanelsProps {}

export const TabbedContentPanels: React.FC = ({ children }) => {
  const { activeTabIndex } = useContext(TabbedContentContext);

  return (
    <TransitionGroup className={css("panels")}>
      <CSSTransition
        classNames={defaultTransition}
        timeout={300}
        key={activeTabIndex}
      >
        {React.Children.toArray(children)[activeTabIndex]}
      </CSSTransition>
    </TransitionGroup>
  );
};

export const TabbedContentPanel: React.FC = ({ children }) => {
  return <>{children}</>;
};
