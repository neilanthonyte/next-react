import { useMemo } from "react";
import * as React from "react";

import { IPatientEhrAssociation } from "next-shared/src/types/IPatientEhrAssociation";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

import { Avatar } from "../../generic/Avatar";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { Icon } from "../../generic/Icon";
import { StaticLogo } from "../../branding/StaticLogo";
import { humaneDate } from "../../../helpers/humaneDate";
import { useLocations } from "../../../hooks/content/useLocations";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { Badge } from "../../generic/Badge";
const css = cssComposer(styles, "PatientEhrAssociation");

export interface IPatientEhrAssociationProps {
  ehrAssociation: IPatientEhrAssociation;
}

/**
 * Component rendering association status for the given ehr patient.
 */
export const PatientEhrAssociation: React.FC<IPatientEhrAssociationProps> = ({
  ehrAssociation,
}) => {
  const { locations } = useLocations();

  const location = useMemo(() => {
    if (!locations) return;
    return locations.find((loc) => loc.slug === ehrAssociation.cmsLocationSlug);
  }, [locations, ehrAssociation]);

  const { colorVariant, label } = useMemo(() => {
    const isLinked = !!ehrAssociation.patientId;
    return {
      colorVariant: isLinked ? TColorVariants.Success : TColorVariants.Disabled,
      label: isLinked
        ? ehrAssociation?.linkedAt
          ? `Linked since ${humaneDate(ehrAssociation?.linkedAt)}`
          : "Linked"
        : "Account not linked",
    };
  }, [ehrAssociation]);

  return (
    <LoadingBlock isLoading={!location}>
      <div className={css("")}>
        <div className={css("label", `-color-${colorVariant}`)}>{label}</div>
        <div className={css("location")}>
          <Avatar
            src={location?.posterImage?.squareMedium}
            stdSize={EStandardSizes.Large}
          />
        </div>
        <div className={css("icon")}>
          <Icon
            name="ehr-record-link"
            variant={colorVariant}
            size={EStandardSizes.Small}
          />
        </div>
        <div className={css("next")}>
          <StaticLogo />
        </div>
      </div>
    </LoadingBlock>
  );
};
