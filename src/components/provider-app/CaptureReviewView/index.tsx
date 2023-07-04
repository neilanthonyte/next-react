import * as React from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { Disable } from "../../generic/Disable";
import { VStack } from "../../structure/VStack";
import { ImageObservation } from "../ImageObservation";
import { ProviderAppContext } from "../ProviderAppProvider";
import { Button } from "../../generic/Button";

export interface ICaptureReviewViewProps {}

/**
 * Lists the images captured by the provider.
 */
export const CaptureReviewView: React.FC<ICaptureReviewViewProps> = ({}) => {
  const { patient, images, isLoadingImages } =
    useRequiredContext(ProviderAppContext);

  const isReady = patient && !isLoadingImages;

  return (
    <Disable
      disabled={!isReady}
      showSpinner={isLoadingImages}
      message={!patient ? "Please select a patient" : null}
    >
      <VStack>
        {/* {isReady && (
          <Button
            isBlock={true}
            size={EStandardSizes.Small}
            onClick={refetchImages}
            variant="secondary"
            disableOnSuccess={false}
          >
            Refresh
          </Button>
        )} */}
        {(images || []).map((obs) => {
          return (
            <ImageObservation
              key={obs.observation.id}
              observation={obs.observation}
              signedUrl={obs.signedUrl}
            />
          );
        })}
      </VStack>
    </Disable>
  );
};
