import * as React from "react";
import { useMemo } from "react";

import { IPatientDataSectionWithStatus } from "next-shared/src/types/IPatientDataSection";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { defaultPatientDataSections } from "next-shared/src/helpers/defaultPatientDataSections";

import { Icon } from "../../generic/Icon";
import { Button } from "../../generic/Button";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "PatientDataSectionsStatus");

export interface IPatientDataSectionsStatusProps {
  dataSections: IPatientDataSectionWithStatus[];
  title?: string;
  action?: { label: string; onClick: () => void };
  showStatus?: boolean;
}
export const PatientDataSectionsStatus: React.FC<
  IPatientDataSectionsStatusProps
> = ({ dataSections, action, title, showStatus = false }) => {
  return (
    <div className={css("")}>
      {!!title ? <div className={css("title")}>{title}</div> : null}
      <div className={css("grid")}>
        {dataSections.map((section, index) => (
          <PatientDataSectionPreview
            key={index}
            dataSection={section}
            showStatus={showStatus}
          />
        ))}
      </div>
      {!!action ? (
        <div className={css("action")}>
          <Button onClick={action.onClick}>{action.label}</Button>
        </div>
      ) : null}
    </div>
  );
};

export interface IPatientDataSectionPreviewProps {
  dataSection: IPatientDataSectionWithStatus;
  showStatus?: boolean;
}
export const PatientDataSectionPreview: React.FC<
  IPatientDataSectionPreviewProps
> = ({ dataSection, showStatus }) => {
  const { sectionName, sectionIcon, sectionStatus, variant } = useMemo(() => {
    const { name, status } = dataSection;
    const section = defaultPatientDataSections.find((s) => name === s.name);
    const isDisabled = showStatus === true && status === "matching";
    return {
      sectionName: section.name,
      sectionIcon: section.icon,
      variant: isDisabled ? TColorVariants.Disabled : TColorVariants.Success,
      sectionStatus: status,
    };
  }, [dataSection]);

  return (
    <div className={css("item")}>
      <div className={css("icon")}>
        <Icon
          variant={variant}
          name={sectionIcon}
          size={EStandardSizes.ExtraSmall}
        />
      </div>
      <div className={css("badge", `-color-${variant}`)}>{sectionName}</div>
      {showStatus && <div className={css("status")}>{sectionStatus}</div>}
    </div>
  );
};
