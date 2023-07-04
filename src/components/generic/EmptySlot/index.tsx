import * as React from "react";

import { Icon } from "../Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

export interface IEmptySlotProps {
  /** Callback function for filling slot */
  addCallBack?: () => void;
  /** Indicates the action can't be performed */
  disabled?: boolean;
}

const EmptySlot: React.FC<IEmptySlotProps> = (props) => {
  const { addCallBack, disabled = false } = props;
  return (
    <div
      className={css(
        "emptySlot",
        { "-disabled": disabled },
        { "-hasAction": !!addCallBack },
      )}
    >
      {addCallBack && (
        <div onClick={!disabled ? addCallBack : undefined}>
          <Icon className={css("emptySlot_addIcon")} name="circle-plus" />
        </div>
      )}
    </div>
  );
};

export default EmptySlot;
