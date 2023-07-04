import * as React from "react";
import { useContext } from "react";
import "react-responsive-modal/styles.css";
import { Modal as ResponsiveModal, ModalProps } from "react-responsive-modal";

import { TDialogSizes } from "next-shared/src/types/dialogs";

import { Icon } from "../../generic/Icon";
import { Footer, IFooterProps } from "../../abstract/Footer";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Modal");

export interface IModalProps extends ModalProps {
  size?: TDialogSizes;
  appMode?: boolean;
}

const ModalContext = React.createContext({ onClose: undefined });

// Wrapper for a third party library
export const Modal: React.FC<IModalProps> = ({
  children,
  size,
  onClose,
  appMode,
  ...rest
}) => {
  const canClose = !!onClose;
  // modal always wants an onClose function
  onClose = onClose ? onClose : () => {};

  return (
    <ResponsiveModal
      center
      classNames={{
        root: css("root"),
        overlay: css("overlay", `-size-${size}`),
        modal: css("modal", `-size-${size}`, { "-appMode": appMode }),
      }}
      onClose={onClose}
      closeOnOverlayClick={canClose}
      showCloseIcon={false}
      {...rest}
    >
      {/* HACK styling for Helix modals */}
      <div data-test="content" className={["nph", css("content")].join(" ")}>
        <ModalContext.Provider value={{ onClose: canClose ? onClose : false }}>
          {children}
        </ModalContext.Provider>
      </div>
    </ResponsiveModal>
  );
};

export interface IModalHeaderProps {}

export const ModalHeader: React.FC<IModalHeaderProps> = ({ children }) => {
  const { onClose } = useContext(ModalContext);

  return (
    <div className={css("header")} data-test="header">
      <div className={css("header_heading")}>
        <h3>{children}</h3>
      </div>
      <div
        className={css("close")}
        onClick={onClose ? onClose : () => {}}
        data-test="close"
      >
        <Icon name={"close"} />
      </div>
    </div>
  );
};

export interface IModalBodyProps {}

export const ModalBody: React.FC<IModalBodyProps> = ({ children }) => (
  <div className={css("body")} data-test="body">
    {children}
  </div>
);

export interface IModalFooterProps extends IFooterProps {}

export const ModalFooter: React.FC<IModalFooterProps> = (props) => (
  <div className={css("footer")} data-test="footer">
    <Footer {...props} />
  </div>
);
