import * as React from "react";
import { useActiveLocation } from "../../../hooks/core/useActiveLocation";

import { NextBarContent, NextBarContentBody } from "../../bar/NextBarContent";
import {
  NextBarPanel,
  NextBarPanelInfoPane,
  NextBarPanelInfoPaneTitle,
  NextBarPanelInfoPaneBody,
  NextBarPanelContentPane,
} from "../../bar/NextBarPanel";
import { VStack } from "../../structure/VStack";
import { SlimSection, SlimSectionBody } from "../../structure/SlimSection";
import { AppointmentCreditCards } from "./components/AppointmentCreditCards";
import { PatientCreditCardsPanel } from "./components/CreditCardsPanel";
import { SubscriptionsPanel } from "./components/SubscriptionsPanel";

import styles from "./styles.scss";

/**
 * Next bar panel showing all available credit cards details and subscriptions
 */
export const PaymentsPanel: React.FC = () => {
  const { activeLocation } = useActiveLocation();
  return (
    <NextBarPanel>
      <NextBarPanelInfoPane actions={null}>
        <NextBarPanelInfoPaneTitle>Payments</NextBarPanelInfoPaneTitle>
        <NextBarPanelInfoPaneBody></NextBarPanelInfoPaneBody>
      </NextBarPanelInfoPane>
      <NextBarPanelContentPane>
        <NextBarContent>
          <NextBarContentBody>
            <div className={styles.CreditCards}>
              <SlimSection>
                <SlimSectionBody>
                  <VStack>
                    <PatientCreditCardsPanel />
                    <AppointmentCreditCards />
                  </VStack>
                </SlimSectionBody>
              </SlimSection>
            </div>
            {activeLocation?.subscriptions?.length > 0 && (
              <SlimSection>
                <SlimSectionBody>
                  <SubscriptionsPanel />
                </SlimSectionBody>
              </SlimSection>
            )}
          </NextBarContentBody>
        </NextBarContent>
      </NextBarPanelContentPane>
    </NextBarPanel>
  );
};
