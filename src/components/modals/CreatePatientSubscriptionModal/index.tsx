import * as React from "react";
import * as _ from "lodash";
import { useState } from "react";

import { Patient } from "next-shared/src/models/Patient";
import { ICmsSubscription } from "next-shared/src/types/ICmsSubscription";
import { toCurrency } from "next-shared/src/helpers/toCurrency";
import { TDialogSizes } from "next-shared/src/types/dialogs";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../../structure/Modal";
import {
  Cell,
  CellType,
  CellDescription,
  CellBody,
} from "../../structure/Cell";
import { List, ListItem } from "../../structure/List";
import { VStack } from "../../structure/VStack";

export interface ICreatePatientSubscriptionModalProps {
  patient: Patient;
  availableSubscriptions: ICmsSubscription[];
  handlePickSubscription: any;
  close: () => void;
}

export const CreatePatientSubscriptionModal: React.FC<
  ICreatePatientSubscriptionModalProps
> = ({ patient, availableSubscriptions, handlePickSubscription, close }) => {
  const activeSubscription = patient.subscriptions && patient.subscriptions[0];
  const [subscriptionId, setSubscriptionId] = useState(
    (activeSubscription && activeSubscription.reference) || null,
  );
  const confirm = () =>
    handlePickSubscription(
      _.find(availableSubscriptions, (s) => s.uuid === subscriptionId),
    );

  return (
    <Modal open={true} onClose={close} size={TDialogSizes.Large}>
      <ModalHeader>Update subscription</ModalHeader>
      <ModalBody>
        <p>Select a subscription for {patient.getDisplayName()}</p>
        <div style={{ padding: "50px 0", maxWidth: "400px", margin: "auto" }}>
          <VStack>
            <List variant="separator">
              <ListItem
                onClick={() => setSubscriptionId(null)}
                isActive={subscriptionId === null}
              >
                None
              </ListItem>
              {(availableSubscriptions || []).map((s) => (
                <ListItem
                  key={s.uuid}
                  onClick={() => {
                    setSubscriptionId(s.uuid);
                  }}
                  isActive={subscriptionId === s.uuid}
                >
                  <Cell>
                    <CellBody>
                      <CellType>{s.description}</CellType>
                      <CellDescription>
                        Price: {toCurrency(s.price)} / {s.interval}
                      </CellDescription>
                    </CellBody>
                  </Cell>
                </ListItem>
              ))}
            </List>
          </VStack>
        </div>
      </ModalBody>
      <ModalFooter onAccept={confirm} />
    </Modal>
  );
};
