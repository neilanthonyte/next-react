import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import * as uuid from "uuid";

// import "./redactor.min.css";
import "./redactor.js";
import "./redactor.scss";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "RichContentEditor");

export interface IRichContentEditorProps {
  /** A value to be injected into the editor */
  value?: string;
  /** Fired whenever the contents of the editor changes (with a debounce) */
  onInputChange?: (html: string) => void;

  /**
   * Bespoke config to pass to redactor editor.
   * @see https://imperavi.com/redactor/docs/settings/overview/
   */
  redactorConfig?: { [settingName: string]: any };
}

/**
 * Attempts to find the wysiwyg redactor instance on the page and adds the options to the instantiation
 */
const useRedactorController = (
  editor: HTMLDivElement,
  id: string,
  opts?: any,
): any => {
  const [redactorController, setRedactorController] = useState(null);
  useEffect(() => {
    if (redactorController) {
      return;
    }
    const controller = $R(`#${id}`, opts);
    if (controller) {
      setRedactorController(controller);
    }
  }, [editor, redactorController]);
  return redactorController;
};

/**
 * Calls the onChange whenever certain events occur
 *
 * @note this is debounced
 */
const useOnRedactorContentChange = (redactorController: any, change: any) => {
  const [setupFinished, setSetupFinished] = useState(false);

  useEffect(() => {
    if (redactorController && !setupFinished) {
      /**
       * We listen to focus and blur because we really want to make sure they
       * don't navigate away without the forming knowing about the value of the wysiwyg
       */
      ["keyup", "click", "focus", "blur"].forEach((event) => {
        redactorController.callback.add(
          event,
          debounce(() => {
            const source = redactorController.source.getCode();
            change(source);
          }, 1000),
        );
      });
      setSetupFinished(true);
    }
  }, [redactorController, setupFinished]);
};

const useOnValueContentChange = (redactorController: any, value: string) => {
  useEffect(() => {
    if (!redactorController) {
      return;
    }
    const current = redactorController.source.getCode();
    if (current !== value) {
      if (typeof value !== "string") {
        // set to be empty as value is equal to null or undefined (cleared the form?)
        redactorController.source.setCode("");
        return;
      }
      // otherwise set the editor to be a specific value passed in
      redactorController.source.setCode(value);
    }
  }, [value, redactorController]);
};

/**
 * WYSIWYG editor
 *
 * Responds to changes in value, and calls onInputChange with a debounce if any changes occur in the editor.
 *
 * @link for more info regarding the redactorConfig, see https://imperavi.com/redactor/docs/settings
 */
export const RichContentEditor: React.FC<IRichContentEditorProps> = ({
  value,
  onInputChange,
  redactorConfig,
}) => {
  /**
   * We need a unique value that persists through renders and will
   * not interfere with other redactor editor's on the page.
   */
  const divId = useRef("redactor-" + uuid.v4());

  /**
   * This exists as a ref purely just so we can know when it exists,
   * as once it exists we use the `useRedactorController` hook get an instance of the
   * redactor class.
   */
  const redactorElement = useRef<HTMLDivElement>(null);

  // try and get controller
  const redactorController = useRedactorController(
    redactorElement.current,
    divId.current,
    redactorConfig,
  );

  // setup listeners
  useOnRedactorContentChange(redactorController, onInputChange);
  useOnValueContentChange(redactorController, value);

  return (
    <div
      id={divId.current}
      ref={redactorElement}
      data-test="redactor"
      className={css("")}
    />
  );
};

// export const RichContentInput = (props: IRichContentInputProps) => {
//   const [loaded, setLoaded] = useState(false);

//   /**
//    * We lazy load the redactor js and redactor css as it's quite a large file.
//    */
//   useEffect(() => {
//     if (loaded) {
//       return;
//     }
//     Promise.all([
//       // @ts-ignore
//       import("style-loader!css-loader!./redactor.min.css"),
//       import("./redactor3.js")
//     ]).then(() => setLoaded(true));
//   }, [loaded]);
//   return (
//     <PendingContent isLocalised check={loaded}>
//       {loaded && <RichContentInputInternal {...props} />}
//     </PendingContent>
//   );
// };
