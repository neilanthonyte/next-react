import * as React from "react";

// css
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "PropertyGrid");

export enum EPropertySize {
  Even = "even",
  /** Favour the content */
  Content = "content",
}

export interface IPropertyGridData {
  [property: string]: any;
}

export interface IPropertyGridProps {
  /** Display a generic header */
  showHeader?: boolean;
  /** The key-value pairs to display */
  data: IPropertyGridData;
  /** Use a pre-defined size */
  preset?: EPropertySize;
}

/**
 * property grid
 * TODO: the idea behind this component is to have this like an editable settings section
 * TODO: values should be have a type and when edited the appropriate form field type should be used
 * TODO: this should update the json structure and can be then saved elsewhere
 */
export const PropertyGrid: React.FC<IPropertyGridProps> = ({
  showHeader = false,
  data,
  preset,
}) => {
  // get properties
  const properties = Object.keys(data);

  // get values
  const values = Object.values(data);

  // render
  return (
    <div className={css("", `-preset-${preset}`)} data-test={"propertyGrid"}>
      <table>
        {showHeader && (
          <thead>
            <tr>
              <td data-test={"propertyHeader"}>
                <b>Property</b>
              </td>
              <td data-test={"valueHeader"}>
                <b>Value</b>
              </td>
            </tr>
          </thead>
        )}
        {/* properties and values */}
        <tbody>
          {properties.map((property: string, index: number) =>
            values[index] ? (
              <tr key={index}>
                <td data-test={`property-${index}`}>
                  <b>{property}</b>
                </td>
                <td data-test={`value-${index}`}>{values[index]}</td>
              </tr>
            ) : null,
          )}
        </tbody>
      </table>
    </div>
  );
};
