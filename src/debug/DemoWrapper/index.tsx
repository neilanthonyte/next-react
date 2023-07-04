import * as React from "react";
import { ReactElement, useContext, useEffect, useMemo, useState } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { IAppConfig } from "next-shared/src/models/AppConfig";
import { selectAttribute } from "next-shared/src/helpers/toTestSelector";

import { DebugPosition } from "../DebugPosition";
import { Button } from "../../components/generic/Button";
import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";
import { SessionDebug } from "../SessionDebug";
import { DemoSettingsModal } from "./components/DemoSettingsModal";
import { Icon } from "../../components/generic/Icon";
import { MemoryRouter } from "react-router-dom";
import { useClient } from "../../hooks/useClient";
import { Message, MessageTitle } from "../../components/generic/Message";

type TRequireUserType = "patient" | "provider" | "staff" | "app";

interface IRequireSessionProps {
  userType: TRequireUserType;
  children: any;
}

export const RequireSession: React.FC<IRequireSessionProps> = ({
  userType,
  children,
}) => {
  const client = useClient();
  const hasSession = !!client.auth.session;

  if (!userType || hasSession) {
    return children;
  } else {
    return (
      <Message>
        <MessageTitle>Please log in as a {userType} to continue</MessageTitle>
      </Message>
    );
  }
};
export interface IDemoAction {
  /** A test selector for the action */
  test?: string;
  label?: string;
  icon?: string;
  isActive?: boolean;
  action: (args?: any) => any;
}

interface ITestOptions {
  /** The component being tested */
  componentName: string;
  /** The name of the test case being used */
  scenario: string;
}

export interface IDemoOptions {
  /** Provide position toggling */
  isFixed?: boolean;
  /** Use fullscreen mode for fixed positioning */
  fixedFullscreen?: boolean;
  /** Provide session debug controls */
  setSessionDebug?: boolean;
  /** Options for the next app */
  appConfig?: IAppConfig;
  /** Default output value */
  output?: any;
  /** The details for testing */
  test?: ITestOptions;
  /** Notify the user they need to be logged in */
  requireSession?: TRequireUserType;
}

export interface ITestAttributes {
  [key: string]: string;
}

interface IDebugContextValue {
  setActions: (actions: IDemoAction[]) => void;
  setOutput: (output: any) => void;
  output: any;
  setOptions: (options: IDemoOptions) => void;
  /** Expose data that we want the controller to have for advanced test cases */
  setTestAttributes: (data: ITestAttributes) => void;
  /** Allow custom debug elements to be added */
  setDebugElement: (element: ReactElement) => void;
  /** Flag to easily check if this context is loaded */
  isDemo: boolean;
}

const DebugContext = React.createContext<IDebugContextValue>({
  setActions: undefined,
  setOutput: undefined,
  output: undefined,
  setOptions: undefined,
  setTestAttributes: undefined,
  setDebugElement: undefined,
  isDemo: undefined,
});

export const useDebug = (initOptions?: IDemoOptions) => {
  const { setOptions, ...rest } = useContext(DebugContext);

  // initial options - these cannot be changed - please use setOptions instead
  useEffect(() => {
    if (initOptions) {
      setOptions(initOptions);
    }
  }, []);

  return {
    setOptions,
    ...rest,
  };
};

export interface IWrapperProps {}

const fixedControlsStyle: React.CSSProperties = {
  position: "fixed",
  bottom: 0,
  left: 0,
  zIndex: 10000,
};

export const DemoWrapper: React.FC<IWrapperProps> = ({ children }) => {
  const [output, setOutput] = useState<any>();
  const [isFixed, setIsFixed] = useState<boolean>();
  const [fixedFullscreen, setFixedFullscreen] = useState<boolean>(true);
  const [actions, setActions] = useState<IDemoAction[]>([]);
  const [appConfig, setAppConfig] = useState<IAppConfig>();
  const [sessionDebug, setSessionDebug] = useState<boolean>();
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [testOptions, setTestOptions] = useState<ITestOptions>();
  const [testAttributes, setTestAttributes] = useState<ITestAttributes>();
  const [debugElement, setDebugElement] = useState<ReactElement>();
  const [requireSession, setRequireSession] = useState<TRequireUserType>();

  const defaultActions: IDemoAction[] = useMemo(() => {
    return [
      {
        icon: "maintenance-solid",
        action: () => setShowSettingsModal(true),
      },
    ];
  }, []);

  const allActions: IDemoAction[] = useMemo(() => {
    const commonActions = [];
    // add fixed options
    if (typeof isFixed !== "undefined") {
      commonActions.push({
        icon: isFixed ? "zoom-in" : "expand",
        action: () => setIsFixed(!isFixed),
      });
    }

    return [...actions, ...commonActions, ...defaultActions];
  }, [actions, isFixed]);

  const setOptions = (options: IDemoOptions) => {
    if (typeof options.isFixed !== "undefined") {
      setIsFixed(options.isFixed);
    }
    if (typeof options.fixedFullscreen !== "undefined") {
      setFixedFullscreen(options.fixedFullscreen);
    }
    if (options.appConfig) {
      setAppConfig(options.appConfig);
    }
    if (typeof options.setSessionDebug !== "undefined") {
      setSessionDebug(options.setSessionDebug);
    }
    if (typeof options.output !== "undefined") {
      setOutput(options.output);
    }
    if (typeof options.test !== "undefined") {
      setTestOptions(options.test);
    }
    if (typeof options.requireSession !== "undefined") {
      setRequireSession(options.requireSession);
    }
  };

  const debugContextValue = useMemo(() => {
    return {
      setActions,
      setOutput,
      output,
      setOptions,
      setTestAttributes: (attrs: ITestAttributes) => {
        // remap to data attributes
        const dataAttrs: ITestAttributes = {};
        Object.keys(attrs).map((attr: string) => {
          dataAttrs[selectAttribute(attr)] = attrs[attr];
        });
        setTestAttributes(dataAttrs);
      },
      setDebugElement,
      isDemo: true,
    };
  }, [output]);

  // the name of the test
  const testName = testOptions
    ? `${testOptions.componentName}-${testOptions.scenario}`
    : "MISSING";

  const outputJson = useMemo(() => JSON.stringify(output), [output]);

  return (
    <NextAppHandlerWeb configOverride={appConfig}>
      <DebugContext.Provider value={debugContextValue}>
        <MemoryRouter>
          <div
            data-test={testName}
            {...testAttributes}
            data-output={outputJson}
          >
            <DebugPosition fixed={isFixed} fullScreen={fixedFullscreen}>
              <RequireSession userType={requireSession}>
                <div data-test="component">{children}</div>
              </RequireSession>
            </DebugPosition>
            <div
              className="debug"
              style={isFixed && fixedFullscreen ? fixedControlsStyle : null}
            >
              {(allActions || []).map((action, i) => (
                <span key={i} data-action={action.test}>
                  <Button
                    size={
                      isFixed ? EStandardSizes.ExtraSmall : EStandardSizes.Small
                    }
                    variant={action.isActive ? "primary" : "secondary"}
                    onClick={action.action}
                    disableOnSuccess={false}
                  >
                    {action.icon ? <Icon name={action.icon} /> : action.label}
                  </Button>{" "}
                </span>
              ))}
              {sessionDebug && <SessionDebug />}
              {typeof output !== "undefined" && (
                <pre>{JSON.stringify(output, null, 2)}</pre>
              )}
              {!!debugElement && debugElement}
            </div>
            <DemoSettingsModal
              open={showSettingsModal}
              onClose={() => setShowSettingsModal(false)}
            />
          </div>
        </MemoryRouter>
      </DebugContext.Provider>
    </NextAppHandlerWeb>
  );
};

export default DemoWrapper;
