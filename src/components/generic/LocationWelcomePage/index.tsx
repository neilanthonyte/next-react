import * as React from "react";

import { useActiveLocation } from "../../../hooks/core/useActiveLocation";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { ImgBlock } from "../ImgBlock";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { HStack, Solid } from "../../structure/HStack";
import { VStack } from "../../structure/VStack";
import { PageSection, PageSectionBody } from "../../structure/PageSection";
import { Page, PageBody } from "../../structure/Page";
import { SlimSection, SlimSectionBody } from "../../structure/SlimSection";
const css = cssComposer(styles, "LocationWelcomePage");

export interface ILocationWelcomePageProps {
  greetPatientInSession?: boolean;
}

/**
 * The visual content for the companion welcome view.
 */
export const LocationWelcomePage: React.FC<ILocationWelcomePageProps> = ({
  greetPatientInSession = true,
  children,
}) => {
  const { ehrPatient } = useSyncedSessionData();

  const patientName = React.useMemo(() => {
    if (!greetPatientInSession) return;
    return ehrPatient?.fhir.name[0]?.given || "";
  }, [greetPatientInSession, ehrPatient]);

  const { activeLocation } = useActiveLocation();

  return (
    <div className={css("")}>
      <div className={css("poster")}>
        <ImgBlock
          src={activeLocation?.posterImage.squareMedium}
          variant="cover"
        />
      </div>
      <div className={css("fade")} />
      <div className={css("container")}>
        <Page transparent={true}>
          <PageBody>
            <PageSection>
              <PageSectionBody>
                <SlimSection>
                  <SlimSectionBody>
                    <HStack>
                      <VStack>
                        <div>
                          {!!patientName && <h2>Hello {patientName}</h2>}
                          {activeLocation && (
                            <h3>Welcome to {activeLocation?.title}</h3>
                          )}
                        </div>
                        <p>
                          To save time during your visit, please complete this
                          essential information.
                        </p>
                      </VStack>
                      {!!activeLocation?.posterImage && (
                        <Solid>
                          <ImgBlock
                            src={activeLocation.posterImage.squareMedium}
                            size={"md"}
                            squareRatio={true}
                            circular={true}
                            inset={true}
                          />
                        </Solid>
                      )}
                    </HStack>
                  </SlimSectionBody>
                </SlimSection>
              </PageSectionBody>
            </PageSection>
            <PageSection>
              <PageSectionBody>
                <SlimSection>
                  <SlimSectionBody>{children}</SlimSectionBody>
                </SlimSection>
              </PageSectionBody>
            </PageSection>
          </PageBody>
        </Page>
      </div>
    </div>
  );
};
