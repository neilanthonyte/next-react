import React, { useState } from "react";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";

import { Button } from "../../generic/Button";
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";

const css = cssComposer(styles, "CovidSymptomsPrompt");

export interface IRequireCovidStatusProps {
  children: any;
}

export const CovidSymptomsPrompt: React.FC<IRequireCovidStatusProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Modal open={open} onClose={null} size={TDialogSizes.Large}>
        <ModalHeader>COVID-19 Symptoms</ModalHeader>
        <ModalBody>
          <div className={css("body")}>
            <p>
              We strongly encourage you to book a Telehealth appointment if you:
            </p>
            <ul>
              <li>have any COVID-19 symptoms;</li>
              <li>are a close contact of a COVID-19 case; or</li>
              <li>are currently awaiting test results for COVID-19.</li>
            </ul>
            <p>Alternatively, please contact us by phone prior to booking.</p>
            <p>
              In order to protect our most vulnerable patients, you are required
              to wear a mask when attending face-to-face appointments.
            </p>
          </div>
        </ModalBody>
        <ModalFooter onAccept={() => setOpen(false)} acceptLabel="Proceed" />
      </Modal>
      {children}
    </>
  );
};
