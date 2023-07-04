import * as React from "react";
import { NavLink } from "react-router-dom";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../structure/Modal";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { Badge } from "../Badge";

import { TDialogSizes } from "next-shared/src/types/dialogs";
import { isPromise } from "../../../helpers/isPromise";
import { Icon } from "../Icon";
import { onClickStopPropagation } from "../../../helpers/onClickStopPropagation";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Button");

const MODES = {
  READY: "default",
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error",
};

export interface IButtonConfirmation {
  title?: string; // overwrites default value displayed when confirming an action
  description?: string; // overwrites default value displayed when confirming an action
}

export type TButtonVariant = "primary" | "secondary";

export interface IButtonProps {
  type?: "submit" | "reset" | "button";
  to?: string;
  disableOnSuccess?: boolean;
  disableOnError?: boolean;
  onClick?: (...args: any[]) => any;
  isBlock?: boolean;
  variant?: TButtonVariant;
  disabled?: boolean;
  className?: string;
  children: any;
  size?: EStandardSizes;
  shouldConfirm?: boolean | IButtonConfirmation; // if set will ask to confirm before proceeding with initial action
  status?: TColorVariants;
  badge?: number;
  isActive?: boolean;
  forceLink?: boolean;
  icon?: string;
  showChevron?: boolean;
  target?: string;
  label?: string;
  hasOptions?: boolean;
  onOptionsMenuClick?: (args?: unknown) => unknown;
  /** Allows for promise handling behaviour to be controlled outside of the click of the button */
  promise?: Promise<unknown>;
}

export interface IButtonState {
  mode: string;
  askForConfirmation: boolean; // before action actioned prompts for confirmation
}

/**
 * A button that supports asyncronous requests. To utilise, the onClick method
 * needs to pass a promise on click.
 */
export class Button extends React.Component<IButtonProps, IButtonState> {
  private timeout: number = null;
  private buttonRef: any = null;
  private _isMounted: boolean = false;

  constructor(props: IButtonProps) {
    super(props);

    this.state = {
      mode: MODES.READY,
      askForConfirmation: false,
    };

    this.buttonRef = React.createRef();
  }

  public componentDidMount() {
    this._isMounted = true;
  }

  // intercepts rerenders and call promise handler when the prop promise gets passed in
  // this is to allow the button promise handling behaviour to be also controlled via props
  public shouldComponentUpdate(nextProps: IButtonProps) {
    if (
      this.props.promise !== nextProps.promise &&
      isPromise(nextProps.promise)
    ) {
      this.promiseHandler(nextProps.promise);
    }

    return true;
  }

  public componentWillUnmount() {
    this._isMounted = false;
    // clear any timeouts pending
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  public async promiseHandler(promise: Promise<any>) {
    // since this is an async function and our button component might be unmounted at any time,
    // we execute each async step only when the component is still mounted to prevent memory leak.
    try {
      this._isMounted && this.setState({ mode: MODES.PENDING });
      if (this._isMounted) {
        const result = await promise;
        result && this._isMounted && this.setState({ mode: MODES.SUCCESS });
      }
    } catch (e) {
      // a button can be told to show an error by rejecting the promise
      this._isMounted && this.setState({ mode: MODES.ERROR });
      console.error(e);
    } finally {
      const { disableOnError = false, disableOnSuccess = true } = this.props;
      // wait for the state to be updated
      this._isMounted &&
        setTimeout(() => {
          // don't allow it to be resubmitted
          if (disableOnSuccess && this.state.mode === MODES.SUCCESS) {
            return;
          }
          if (disableOnError && this.state.mode === MODES.ERROR) {
            return;
          }
          // wait a brief moment before returning to a reusable state
          if (this._isMounted) {
            this.timeout = setTimeout(() => {
              clearTimeout(this.timeout);
              this._isMounted && this.setState({ mode: MODES.READY });
            }, 1500) as any as number; // node Timer typedef is bad
          }
        });
    }
  }

  public render() {
    const { mode } = this.state;

    let { variant } = this.props;
    const {
      children,
      onClick,
      to,
      type = "button", // HACK - remove support in the future
      isBlock = false,
      disabled = false,
      className = "",
      shouldConfirm,
      status,
      badge = null,
      isActive = false,
      forceLink = false,
      icon,
      target,
      label,
      showChevron,
      hasOptions,
      onOptionsMenuClick,
    } = this.props;

    // allow falsy values to be passed, e.g. null
    variant = variant || "primary";

    // ensure a known value
    const size = this.props.size || "md";

    const classNames = css(
      "",
      `-variant-${variant}`,
      `-status-${status}`,
      `-size-${size}`,
      {
        "-pending": mode === MODES.PENDING,
        "-error": mode === MODES.ERROR,
        "-success": mode === MODES.SUCCESS,
        "-default": mode === MODES.READY,
        "-block": isBlock,
        "-hasBadge": badge !== null,
        "-isActive": isActive,
        "-withLabel": !!label,
        "-hasClickableOptions": !!onOptionsMenuClick,
        className,
      },
    );

    const onConfirmationRequiredClick = () => {
      this.setState({ askForConfirmation: true });
    };

    const onButtonClick = (
      event?:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
      // Hide confirmation modal
      if (this.state.askForConfirmation) {
        this.setState({ askForConfirmation: false });
      }

      if (!onClick) {
        return;
      }
      // stop event from bubbling up
      if (event) {
        event.stopPropagation();
      }
      // don't allow multiple executions
      if (this.state.mode !== MODES.READY) {
        return;
      }

      // pass the event to the callback in case it's needed
      const result = onClick(event);

      if (isPromise(result)) {
        return this.promiseHandler(result);
      }
      return result;
    };

    if (to) {
      if (onClick) {
        throw new Error(
          "Cannot provide both 'onClick' & 'to' props to Button component.",
        );
      }

      // Need to prevent click events from propagating.
      const stopClickEvents = onClickStopPropagation(() => {
        return;
      });

      if (env.webLinks || forceLink) {
        return (
          <a
            href={to}
            onClick={stopClickEvents}
            className={classNames}
            target={target}
          >
            <span>{children}</span>
            {label && <span className={css("label")}>{label}</span>}
          </a>
        );
      } else {
        return (
          <NavLink
            to={to}
            onClick={stopClickEvents}
            className={classNames}
            data-test={"button"}
          >
            <span>{children}</span>
            {label && <span className={css("label")}>{label}</span>}
          </NavLink>
        );
      }
    }

    const dismissConfirmation = () =>
      this.setState({ askForConfirmation: false });

    return (
      <>
        <button
          ref={this.buttonRef}
          className={classNames}
          onClick={shouldConfirm ? onConfirmationRequiredClick : onButtonClick}
          type={type}
          disabled={disabled || !onClick}
          data-test={"button"}
          data-test-is-block={isBlock}
          data-test-mode={mode}
        >
          {!!icon && <Icon name={icon} className={css("icon")} />}
          {badge === null ? (
            <>
              <span>{children}</span>
              {label && <span className={css("label")}>{label}</span>}
            </>
          ) : (
            <>
              <span>{children}</span>
              {label && <span className={css("label")}>{label}</span>}
              <span>
                <Badge
                  variant={
                    variant === TColorVariants.Primary
                      ? TColorVariants.Secondary
                      : TColorVariants.Primary
                  }
                >
                  {badge.toString()}
                </Badge>
              </span>
            </>
          )}
          {!!showChevron && (
            <span className={css("right-decoration")}>
              <Icon name="chevron-right" />
            </span>
          )}
          {!!hasOptions && (
            <span
              data-test="options-decoration"
              className={css(
                onOptionsMenuClick ? "options" : "right-decoration",
              )}
            >
              <Icon
                name="chevron-down"
                className={css({
                  "-clickable": !!onOptionsMenuClick,
                })}
                onClick={onOptionsMenuClick}
              />
            </span>
          )}
        </button>
        <Modal
          open={this.state.askForConfirmation}
          onClose={dismissConfirmation}
          size={TDialogSizes.Medium}
          showCloseIcon={false}
        >
          <ModalHeader>
            {(typeof shouldConfirm === "object" && shouldConfirm.title) ||
              "Are you sure?"}
          </ModalHeader>
          <ModalBody>
            <p>
              {(typeof shouldConfirm === "object" &&
                shouldConfirm.description) ||
                "Please confirm that you wish to complete this action."}
            </p>
          </ModalBody>
          <ModalFooter
            onAccept={onButtonClick}
            acceptLabel={"Confirm"}
            onCancel={dismissConfirmation}
            cancelLabel={"Cancel"}
          />
        </Modal>
      </>
    );
  }
}

export const AltButton: React.FC<IButtonProps> = (props: IButtonProps) => (
  <Button variant="secondary" {...props} />
);
AltButton.displayName = "AltButton";

export const BlockButton: React.FC<IButtonProps> = (props: IButtonProps) => (
  <Button isBlock {...props} />
);
BlockButton.displayName = "BlockButton";

export const ConfirmButton: React.FC<IButtonProps> = (props: IButtonProps) => (
  // TODO move confirmation logic here
  <Button {...props} />
);
