import * as React from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { useClient } from "../../../hooks/useClient";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { Button } from "../../generic/Button";
import { ScrollableBar } from "../../structure/ScrollableBar";
import { ProviderAppContext } from "../ProviderAppProvider";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "ProviderAppPatient");

export interface IProviderAppPatientProps {}

export const ProviderAppPatient: React.FC<IProviderAppPatientProps> = ({}) => {
  const client = useClient();

  const { providerRooms, patient, setPatient } =
    useRequiredContext(ProviderAppContext);

  return (
    <div className={css("")}>
      <ScrollableBar>
        {providerRooms === null ? (
          <div>Loading...</div>
        ) : providerRooms.length === 0 ? (
          <div>Please open a patient record in your EHR</div>
        ) : (
          providerRooms.map((room) => {
            const variant =
              patient?.patientId === room.patientId ? "primary" : "secondary";
            const onClick = () => setPatient(room.patient);

            return (
              // HACK div required to make ScrollableBar work nicely
              <div className={css("button")} key={room.scopeId}>
                <Button
                  size={EStandardSizes.Small}
                  variant={variant}
                  key={room.scopeId}
                  onClick={onClick}
                >
                  {room.patient?.getDisplayName()} ({room.displayLabel})
                </Button>
              </div>
            );
          })
        )}
      </ScrollableBar>
    </div>
  );
};
