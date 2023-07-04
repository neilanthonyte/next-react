import * as React from "react";
import { useMemo } from "react";
import moment, { Moment } from "moment";
import TimePicker from "rc-time-picker";

import "rc-time-picker/assets/index.css";

export interface ITimeInputProps {
  value?: string;
  onInputChange: (value: string) => void;
  disabled?: boolean;
}

export const TimeInput: React.FC<ITimeInputProps> = ({
  value,
  onInputChange,
  disabled,
}) => {
  const onChange = (value: Moment) => {
    if (!value) {
      return;
    }
    const time = value.format("HH:mm");
    onInputChange(time);
  };

  const defaultValue = useMemo(() => {
    return value ? moment(value, "HH:mm") : null; // moment();
  }, [value]);

  return (
    <div>
      <TimePicker
        value={defaultValue}
        showSecond={false}
        onChange={onChange}
        disabled={disabled}
        clearIcon={<span />}
      />
    </div>
  );
};
