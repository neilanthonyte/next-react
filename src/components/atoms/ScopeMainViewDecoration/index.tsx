import * as React from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import {
  MainViewDecoration,
  IMainViewDecorationAction,
} from "../../structure/MainViewDecoration";
import { useGetPhotoUrl } from "../../../hooks/useGetPhotoUrl";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { PatientAppInstructions } from "../../companion/PatientAppInstructions";
import { Avatar } from "../../generic/Avatar";
import CircularIcon from "../../generic/CircularIcon";
import { getDateOfBirthString } from "../../../helpers/getDateOfBirthString";

export interface IScopeMainViewDecorationProps {
  actions?: IMainViewDecorationAction[];
  showAppLink?: boolean;
}

export const ScopeMainViewDecoration = ({
  actions = [],
  showAppLink = false,
}: IScopeMainViewDecorationProps) => {
  const { ehrPatient, nextPatient } = useSyncedSessionData();
  const patient = nextPatient || ehrPatient;
  const { url: photoUrl } = useGetPhotoUrl(nextPatient?.fhir);

  return (
    <MainViewDecoration
      title={patient?.getDisplayName()}
      description={getDateOfBirthString(patient?.fhir?.birthDate)}
      actions={actions}
      leftDecoration={
        photoUrl ? (
          <Avatar stdSize={EStandardSizes.Medium} src={photoUrl} />
        ) : (
          <CircularIcon size={EStandardSizes.Medium} name="avatar-genderless" />
        )
      }
    >
      {showAppLink && ehrPatient?.appAccessCode ? (
        <PatientAppInstructions />
      ) : null}
    </MainViewDecoration>
  );
};
