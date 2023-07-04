import * as React from "react";
import { useEffect, useState } from "react";

import { Icon } from "../../generic/Icon";
import { cssComposer } from "../../../helpers/cssComposer";

import styles from "./styles.scss";
import {
  happiness5,
  happiness7,
  happiness10,
  pain6,
  pain11Partial,
  pain11Full,
} from "./helpers/predeterminedScales"; // Presets created in a separate file. They took up to much room!

type presetType =
  "happiness5 | happiness7 | pain6 | pain11Partial | pain11Full"; // presets are type safe, any additions should be added to the type
type layoutType = "column | row";

export type IScale = {
  value: number; // value which is used as the return type for this option
  icon?: string; // specifies icon used to represent this value, component assumes icon is available in your icon font set
  iconSelected?: string; // specifies icon used to represent this value when the value of the component matches this scale object, component assumes icon is available in your icon font set
  label?: string; // describes the value is represents
};

export interface ILikertInputProps {
  onInputChange: (value: number) => void; // supports generic onChange callback handled by the form
  preset: presetType | null; // If looking to use some predetermined scales pass in the presetType i.e 'happiness5 | happiness7 | happiness10'
  scales?: Array<IScale>; // ability to override predefined presets by passing an array which complies to the IScale schema
  value: number | null; // value which is used as the return type for this option
  layout: layoutType; // used to describe either a row or column style layout
}

/*
  creates a variable containing a multitude of presets, if adding a preset be sure to extend the preset type,
  the pattern is as follows; icon set followed by the amount of options. I.E happiness10 is the happiness icon set with a 10 rating scale
*/
const predeterminedScales: { [key: string]: Array<IScale> } = {
  pain11Partial,
  pain11Full,
  happiness10,
  pain6,
  happiness7,
  happiness5,
};

const css = cssComposer(styles);

export const LikertInput: React.FC<ILikertInputProps> = (
  props: ILikertInputProps,
) => {
  const { onInputChange, scales, value, preset, layout = "row" } = props;

  const [currentValue, setCurrentValue] = useState<number | null>(value); // used as an initializer for the value
  const [currentScale, setCurrentScale] = useState<Array<IScale>>(null); // used as the scale to render in the ui

  // watch's preset prop and dependent on preset value will either set scale to predetermined set or use custom set
  useEffect(() => {
    let selectedScales: Array<IScale>;
    if (!preset && scales) {
      selectedScales = scales;
    } else {
      selectedScales = predeterminedScales[preset];
    }

    setCurrentScale(selectedScales);
  }, [preset]);

  // value can be passed in as a prop and populates the state value
  useEffect(() => setCurrentValue(value), [value]);

  // consolidate value change event, which sets state and runs default callback passed into input
  const changeEvent = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue: number = parseFloat(event.target.value);
    setCurrentValue(newValue);
    onInputChange(newValue);
  };

  // layout is defaulted to row, but if column is required we apply the columns class
  const containerClass =
    layout === "row"
      ? css("ratingsContainer")
      : css("ratingsContainer", "ratingsColumn");

  return (
    <React.Fragment>
      {currentScale ? (
        <div className={containerClass}>
          {currentScale.map((scaleEntry: IScale, key: number) => {
            const isCurrentValue: boolean = scaleEntry.value === currentValue;
            // dynamically apply the size of the icons based off the amount of options supplied
            const iconClass = css(
              { selectedRating: isCurrentValue },
              { iconLg: currentScale.length <= 6 },
              { iconMid: currentScale.length > 6 && currentScale.length <= 10 },
              { iconSmall: currentScale.length > 10 },
            );

            // if icon is not set and we use a mock radio button, work out which class based on if this value is current
            const radioButtonClass = isCurrentValue
              ? css("radio-button-checked")
              : css("radio-button-unchecked");
            const iconName = isCurrentValue
              ? scaleEntry.iconSelected
              : scaleEntry.icon;

            return (
              <label className={styles.rating} key={key}>
                {/* if there is no label to display we fall back to showing just the value, i.e 4 */}
                {scaleEntry.icon ? (
                  <Icon className={iconClass} name={iconName} />
                ) : (
                  <span className={radioButtonClass} />
                )}

                <input
                  type="radio"
                  value={scaleEntry.value}
                  checked={scaleEntry.value === currentValue}
                  onChange={(event) => changeEvent(event)}
                />

                <span> {scaleEntry.value} </span>

                {scaleEntry.label ? (
                  <span className={styles.label}> {scaleEntry.label} </span>
                ) : null}
              </label>
            );
          })}
        </div>
      ) : null}
    </React.Fragment>
  );
};
