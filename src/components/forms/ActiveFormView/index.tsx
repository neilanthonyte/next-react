import * as React from "react";
import { useContext, useEffect, useCallback } from "react";

import MultiForm, {
  EFormSectionStatus,
  EMultiFormDisplayStyle,
} from "../MultiForm";
import { FormStateContext, IFormSectionState } from "../FormStateContext";
import { IFormDetailsMixed, EFormType } from "next-shared/src/types/formTypes";
import { Form } from "../Form";

export interface IActiveFormViewProps {
  schema: IFormDetailsMixed;
  data: any;
  onSuccess: (data: any) => void;
  onCancel?: () => void;
  cancelLabel?: string;
  onFormLoaded?: (arg?: any) => any;
  onProgressUpdate?: (
    activeSection: number,
    statuses: EFormSectionStatus[],
  ) => any;
  displayStyle?: EMultiFormDisplayStyle;
}

/**
 * Displays a multi-form and exposes its state to the side bar.
 * TODO extend to support both form types.
 */
export const ActiveFormView: React.FC<IActiveFormViewProps> = ({
  schema,
  onProgressUpdate,
  displayStyle = EMultiFormDisplayStyle.StepByStep,
  ...rest
}) => {
  const { clear, reset, activeSection } = useContext(FormStateContext);

  const update = (statuses?: EFormSectionStatus[], activeSection?: number) => {
    if (!clear || !reset) {
      return;
    }
    if (!schema || schema.type === EFormType.Single) {
      clear();
      return;
    }
    const sections: IFormSectionState[] = schema.sections.map((s, index) => ({
      label: s.label,
      status:
        statuses && statuses.length > index
          ? statuses[index]
          : EFormSectionStatus.INCOMPLETE,
    }));

    reset(sections, activeSection ? activeSection : 0);
  };

  useEffect(update, [schema]);

  const onChange = useCallback(
    (activeSection: number, statuses: EFormSectionStatus[]) => {
      update(statuses, activeSection);
      !!onProgressUpdate && onProgressUpdate(activeSection, statuses);
    },
    [],
  );

  if (!schema) {
    return null;
  }

  // HACK - Schema type is not set on some forms.
  // try to guess type based on presense/absense of 'sections' field.
  if (!schema.type) {
    if ((schema as any).sections) {
      schema.type = EFormType.Multi;
    } else {
      schema.type = EFormType.Single;
    }
  }

  switch (schema.type) {
    case EFormType.Multi:
      return (
        <MultiForm
          schema={schema}
          onProgressUpdate={onChange}
          activeSectionIndex={activeSection}
          displayStyle={displayStyle}
          {...rest}
        />
      );
    case EFormType.Single:
      return (
        <Form
          title={schema.title}
          schema={schema.fields}
          dataTransformers={schema.transformers}
          {...rest}
        />
      );
    default:
      throw new Error("Unknown form type");
  }
};
