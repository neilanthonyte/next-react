import * as React from "react";
import { useContext, useState } from "react";
import { ReviewContext } from "../../../contexts/ReviewContext";
import { Pager, PagerFrame, PagerFrameBody, PagerFrameFooter } from "../Pager";
import { ELayoutVariant } from "next-shared/src/types/layouts";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { IAppointmentWithDetails } from "next-shared/src/types/IAppointmentWithDetails";
import ObservationCard from "../../resources/ObservationCard";

interface IObservationWithFormsProps {
  appointmentWithDetails: IAppointmentWithDetails;
}

export const ObservationWithForms: React.FC<IObservationWithFormsProps> = ({
  appointmentWithDetails,
}) => {
  // forms includes all forms, transcribable and not
  const { appointment, forms } = appointmentWithDetails;
  const [formIndex, setFormIndex] = useState<number>(0);

  const { transcribeResources } = useContext(ReviewContext);

  const canTranscribe = !!transcribeResources && forms.length > 0;

  const onTranscribe =
    canTranscribe && forms?.[formIndex]
      ? async () => transcribeResources([forms[formIndex]], appointment.id)
      : undefined;

  if (!forms) return null;

  return (
    <PagerFrame>
      <PagerFrameBody>
        <ObservationCard
          data={forms[formIndex]}
          onTranscribe={onTranscribe}
          variant={ELayoutVariant.Compact}
        />
      </PagerFrameBody>
      {forms.length > 1 && (
        <PagerFrameFooter>
          <Pager
            pageCount={forms.length}
            index={formIndex}
            onChange={setFormIndex}
            size={EStandardSizes.ExtraSmall}
          />
        </PagerFrameFooter>
      )}
    </PagerFrame>
  );
};
