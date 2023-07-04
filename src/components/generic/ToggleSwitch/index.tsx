import * as React from "react";
import { useState } from "react";
import * as _ from "lodash";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { showToast } from "../Toast";
const css = cssComposer(styles, "ToggleSwitch");

export interface IToggleSwitchProps {
  // HACK - avoid passing around names
  name?: string;
  text?: string[];
  small?: boolean;
  active?: boolean;
  disabled?: boolean;
  onSwitch?: (checked: boolean) => any;
  /**
   * Message to display to user if onSwitch returns rejected promise.
   * A toast controller must be included in an ancestor component to display
   * the message. */
  errorMsg?: string;
}

/**
 * A toggle/switch/lightswitch.
 */
export const ToggleSwitch: React.FC<IToggleSwitchProps> = ({
  name = "toggle",
  text = ["", ""],
  small = false,
  active = false,
  disabled = false,
  onSwitch,
  errorMsg,
}) => {
  const [checked, setChecked] = useState(active);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const previousCheckedValue = checked;

    // this 'checked' needs an alias, otherwise, capturing the previous
    // value of the 'checked' state variable on the above line causes a build
    // error (block-scoped var accessed before declaration).
    const { checked: targetChecked } = e.target;
    setChecked(targetChecked);
    const onSwitchResult = onSwitch && onSwitch(targetChecked);

    // If onSwitch function returns a promise, and the promise rejects,
    // revert the status of the switch.
    if (onSwitchResult instanceof Promise) {
      onSwitchResult.catch(() => {
        setChecked(previousCheckedValue);
        showToast({
          title: "Something went wrong",
          description: errorMsg,
          icon: "info",
          color: "light",
        });
      });
    }
  };

  const uniqueName = _.uniqueId(name);

  return (
    <div className={css("", { "-small": small })} data-test="toggle-switch">
      <input
        id={uniqueName}
        type="checkbox"
        className={css("checkbox")}
        name={uniqueName}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label className={css("label")} htmlFor={uniqueName}>
        <span
          className={css("inner", { "-disabled": disabled })}
          data-yes={text[0]}
          data-no={text[1]}
        />
        <span className={css("switch", { "-disabled": disabled })} />
      </label>
    </div>
  );
};
