import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

import { ToastSlice } from "../ToastSlice";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles, "ToastController");

const toastHoldTime = 5000; // 5 seconds

export interface IToast {
  title: string;
  description?: string;
  icon?: string;
  color?: "light" | "dark";
  persist?: boolean;
}

// we only allow one ToastContainer on the page
// let globalToastContainer: null | ToastController = null;
let dispatchToast: null | ((toast: IToast) => void) = null;

export const ToastController: React.FC = () => {
  // create / find a div on the body to contain the toast messages
  const [containerElm, setContainerElm] = useState<HTMLDivElement>(null);
  useEffect(() => {
    // on mount, create div
    const newContainerElm = document.createElement("div");
    newContainerElm.className = "ToastContainer";
    document.body.appendChild(newContainerElm);

    setContainerElm(newContainerElm);

    // on unmount, destroy div (if it exists)
    return () => {
      if (containerElm) {
        document.body.removeChild(containerElm);
      }
    };
  }, []);

  const [currentToastSlice, setCurrentToastSlice] = useState<IToast | null>(
    null,
  );
  const [showingToast, setShowingToast] = useState<boolean>(false);
  const [clearToastTimer, setClearToastTimer] = useState<number | null>(null);

  // provide global handler for toast
  useEffect(() => {
    // check there is not already a dispatch handler (likely for a different ToastController)
    if (dispatchToast !== null) {
      throw new Error("ToastController can only be rendered once");
    }

    dispatchToast = (toast: IToast | null) => {
      if (clearToastTimer) {
        // remove any existing timeouts
        clearTimeout(clearToastTimer);
      }

      if (toast === null) {
        // clear any existing toast & stop
        setShowingToast(false);
        return;
      }

      if (showingToast) {
        // we have a toast already showing, hide it then show the new one
        setShowingToast(false);
        setTimeout(() => dispatchToast && dispatchToast(toast), 500);
        return;
      }

      // set toast & create a new timer to clear it when appropriate
      setCurrentToastSlice(toast);
      setShowingToast(true);

      if (toast?.persist) {
        return; // dont set any clear timer
      }

      setClearToastTimer(
        setTimeout(() => {
          setShowingToast(false);
          setClearToastTimer(null);
        }, toastHoldTime) as any as number,
      );
    };

    return () => (dispatchToast = null);
  }, [currentToastSlice, clearToastTimer, showingToast]);

  const render = () => (
    <div id="ToastController" className={css("", { "-show": showingToast })}>
      {currentToastSlice && (
        <ToastSlice
          title={currentToastSlice.title}
          description={currentToastSlice.description}
          icon={currentToastSlice.icon}
          color={currentToastSlice.color}
        />
      )}
    </div>
  );

  // render toast on screen if we have one (use portals to render in the body)
  if (containerElm === null) {
    return null;
  }

  return ReactDOM.createPortal(render(), containerElm);
};

export function showToast(toast: IToast | string | null) {
  if (dispatchToast === null) {
    // HACK ugly logic and poor UX - phasing out
    // throw new Error("No ToastController found");
    return;
  }

  // make sure we have an IToast object
  if (typeof toast === "string") {
    toast = {
      title: toast,
      icon: "info",
    };
  }

  dispatchToast(toast);
}
