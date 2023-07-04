import * as React from "react";

import { ELayoutVariant } from "next-shared/src/types/layouts";
import { noteToFormattedStr } from "next-shared/src/helpers/noteToFormattedStr";
import { standardizeNote } from "../../../helpers/standardizeNote";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";

const css = cssComposer(styles, "patientNote");

export interface IPatientNoteProps {
  data: any;
  variant?: ELayoutVariant;
}

/**
 * Component used to render a patient submitted information
 */
export const PatientNote: React.FC<IPatientNoteProps> = ({
  data,
  variant = ELayoutVariant.Standard,
}) => {
  const noteStr = noteToFormattedStr(standardizeNote(data));
  return (
    <div
      data-test="html-note"
      className={css("", `-${variant}`)}
      dangerouslySetInnerHTML={{ __html: noteStr }}
    />
  );
};
