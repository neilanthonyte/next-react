import * as React from "react";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "../../structure/Modal";
import { TDialogSizes } from "next-shared/src/types/dialogs";
import { HStack, Solid } from "../../structure/HStack";
import { AltButton } from "../../generic/Button";
import { Icon } from "../../generic/Icon";
import { NextLocation } from "next-shared/src/models/NextLocation";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { VStack } from "../../structure/VStack";
const css = cssComposer(styles, "ExternalBookingsModal");

export interface IPatientFormModalProps {
  location: NextLocation;
  onClose: () => any;
  showLocationPageLink?: boolean;
}

/**
 * Modal informing user of an external booking system
 */
export const ExternalBookingsModal: React.FC<IPatientFormModalProps> = ({
  location,
  onClose,
  showLocationPageLink = false,
}) => {
  if (!location) return null;
  return (
    <Modal open={true} onClose={onClose} size={TDialogSizes.Medium}>
      <ModalHeader>{location.title}</ModalHeader>
      <ModalBody>
        <HStack>
          <p>This clinic uses an external booking system.</p>
          <Solid>
            <VStack>
              <AltButton
                to={location.externalBookingUrl}
                target="_blank"
                className={css("button")}
              >
                Book now <Icon name="logout" />
              </AltButton>
              {showLocationPageLink && location.url && (
                <AltButton to={location.url}>View clinic page</AltButton>
              )}
            </VStack>
          </Solid>
        </HStack>
      </ModalBody>
      <ModalFooter onCancel={onClose} />
    </Modal>
  );
};
