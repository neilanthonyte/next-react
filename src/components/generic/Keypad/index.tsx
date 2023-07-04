import * as React from "react";

import { AltButton } from "../Button";
import { emailPadOptions } from "./helpers/emailPadOptions";
import { numberPadOptions } from "./helpers/numberPadOptions";
import { IKeypadOption } from "./IKeypadOption";

import styles from "./styles.scss";

export interface IKeypadProps {
  options?: IKeypadOption[];
  onKeySelect?: (keySelected: IKeypadOption) => void;
}

export const Keypad: React.FC<IKeypadProps> = ({ options, onKeySelect }) => (
  <div className={styles.keypad} data-test="keypad">
    <div className={styles.keypad_3}>
      {options.map((option, index) => {
        return (
          <div
            key={index}
            data-test="key"
            data-index={index}
            data-key={option.value}
          >
            <AltButton
              className={styles.numberSelector}
              onClick={() => {
                onKeySelect(option);
              }}
              isBlock={true}
            >
              {option.label}
            </AltButton>
          </div>
        );
      })}
    </div>
  </div>
);

export const NumberKeypad: React.FC<IKeypadProps> = (props) => (
  <Keypad options={numberPadOptions} {...props} />
);

export const EmailKeypad: React.FC<IKeypadProps> = (props) => (
  <Keypad options={emailPadOptions} {...props} />
);
