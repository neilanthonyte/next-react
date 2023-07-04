import * as React from "react";
import { useCallback, useMemo } from "react";
import { capitalize, cloneDeep } from "lodash";
import moment from "moment";
import * as uuid from "uuid";

import { Action, IActionType } from "next-shared/src/models/Action";
import { TActionOccurrence } from "next-shared/src/types/TActionOccurrence";
import { EWeekday, ITimeSlot } from "next-shared/src/types/IReoccurringTime";
import { IMedicationDetails } from "next-shared/src/models/MedicationDetails";
import { currentUnixTimestamp } from "next-react/src/helpers/currentUnixTimestamp";

import { useMedicalArticles } from "../../../hooks/content/useMedicalArticles";
import { useHcps } from "../../../hooks/content/useHcps";
import { Form } from "../../forms/Form";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";
import { useClient } from "../../../hooks/useClient";
import { useSyncedPatientMedicalResources } from "../../../hooks/patient/useSyncedPatientMedicalResources";
import { useAppointmentTypes } from "../../../hooks/useAppointmentTypes";
import { usePatientFormsForLocation } from "../../../hooks/patient/usePatientFormsForLocation";
import { useActiveLocation } from "../../../hooks/core/useActiveLocation";
import {
  createEducationActionSchema,
  IActionFormData,
  trackableObservations,
} from "./createEducationActionSchema";

export interface IDebugActionEditorProps {
  onCreate: (action: Action) => any;
}

/**
 * An editor to help test the action system. This may evolve into a proper component in time.
 */
export const DebugActionEditor: React.FC<IDebugActionEditorProps> = ({
  onCreate,
}) => {
  const client = useClient();
  const { nextPatient } = useSyncedSessionData();
  const { medicalArticles, isLoading: medicalArticlesIsLoading } =
    useMedicalArticles();

  const { hcps, isLoading: hcpsIsLoading } = useHcps();
  const { patientMedications: medications } = useSyncedPatientMedicalResources(
    nextPatient?.patientId,
  );
  const { data: appointmentTypes } = useAppointmentTypes();
  const { activeLocation: currentLocation } = useActiveLocation();
  const { data: assignableForms } = usePatientFormsForLocation(
    currentLocation?.slug,
  );

  const { schema, key } = useMemo(() => {
    const schema = cloneDeep(createEducationActionSchema);

    // medical articles
    const medicalArticleIndex = schema.indexOf(
      schema.find((f) => f.map === "medicalArticleId"),
    );
    schema[medicalArticleIndex].options = (medicalArticles || []).map(
      (article) => ({
        label: article.title,
        value: article.slug,
      }),
    );

    // appointment types
    const appointmentTypeIndex = schema.indexOf(
      schema.find((f) => f.map === "appointmentTypeId"),
    );
    schema[appointmentTypeIndex].options = (appointmentTypes || []).map(
      (apt) => ({
        label: apt.label,
        value: apt.slug,
      }),
    );

    // medications
    const medicationIndex = schema.indexOf(
      schema.find((f) => f.map === "medicationId"),
    );
    schema[medicationIndex].options = (medications?.active || []).map(
      (med) => ({
        label: med.medicationCodeableConcept.text,
        value: med.id,
      }),
    );

    // forms
    const formIndex = schema.indexOf(schema.find((f) => f.map === "formId"));
    schema[formIndex].options = (assignableForms || []).map((form) => ({
      label: form.title,
      value: form.slug,
    }));

    // provider as author and appointment preset
    const authorIdIndex = schema.indexOf(
      schema.find((f) => f.map === "authorId"),
    );
    const appointmentHcpIdIndex = schema.indexOf(
      schema.find((f) => f.map === "appointmentHcpId"),
    );
    const applicableHcps = (hcps || [])
      .filter((h) => !!h.npServicesId)
      .map((hcp) => ({
        label: hcp.title,
        value: hcp.npServicesId,
      }));
    schema[authorIdIndex].options = applicableHcps;
    schema[appointmentHcpIdIndex].options = applicableHcps;

    return { schema, key: uuid.v4() };
  }, [medicalArticles, hcps, medications, appointmentTypes, assignableForms]);

  const createAction = useCallback(
    async (formData: IActionFormData) => {
      const provider = hcps.find((h) => h.npServicesId === formData.authorId);
      const typeLabel = capitalize(formData.type);

      let title = provider ? `${typeLabel} from ${provider.title}` : typeLabel;
      let data = null;
      let externalReference = null;

      switch (formData.type) {
        case "article":
          {
            const article = medicalArticles.find(
              (a) => a.slug === formData.medicalArticleId,
            );
            title = article.title;
            data = article.serialize();
            externalReference = article.slug;
          }
          break;
        case "instruction":
          data = {
            message: formData.instruction,
          };
          break;
        case "medication":
          {
            if (formData.medicationType === "New") {
              title = formData.medicationLabel;
              data = {
                title: formData.medicationLabel,
                direction: formData.medicationDescription,
              } as IMedicationDetails;
            } else if (
              formData.medicationType === "Existing" &&
              formData.medicationId
            ) {
              const medication = medications.active.find(
                (med) => med.id === formData.medicationId,
              );
              title = medication.medicationCodeableConcept.text;
              data = {
                title: medication.medicationCodeableConcept.text,
                direction: medication.dosageInstruction?.at(0).text,
                // TODO add more info
              } as IMedicationDetails;
            }
          }
          break;
        case "todo":
          title = formData.todo;
          break;
        case "observation":
          {
            const obs = trackableObservations.find(
              (o) => o.value === formData.observationType,
            );
            title = obs.label;
            data = obs.value;
          }
          break;
        case "form":
          {
            const form = assignableForms.find(
              (form) => form.slug === formData.formId,
            );
            title = form.title;
            data = form.description;
          }
          break;
      }

      const occurrences: TActionOccurrence[] = [];
      const timeOfDay: ITimeSlot[] = (formData?.times || []).map(
        (str: string) => {
          const parts = str.split(":");
          return {
            hour: parseInt(parts[0]),
            minute: parseInt(parts[1]),
          };
        },
      );
      switch (formData.dueType) {
        case "single-now":
          occurrences.push({
            type: "single",
            time: moment().unix(),
          });
          break;
        case "single-dayOffset":
          occurrences.push({
            type: "single",
            time: moment().add(formData.dayOffset, "day").unix(),
          });
          break;
        case "single-date":
          occurrences.push({
            type: "single",
            time: moment().add(formData.date).unix(),
          });
          break;
        case "weekly":
          occurrences.push({
            type: "week",
            weekdays: formData.weeklyDays as unknown as EWeekday[],
            timeOfDay,
          });
          break;
        case "monthly":
          occurrences.push({
            type: "month",
            days: formData.daysOfTheMonth,
            timeOfDay: [
              {
                hour: 9,
                minute: 30,
              },
            ],
          });
          break;
        case "yearly":
          occurrences.push({
            type: "year",
            months: formData.yearlyMonths,
            days: formData.daysOfTheMonth,
            timeOfDay,
          });
      }
      const newAction = Action.unserialize({
        title,
        data,
        type: formData.type as IActionType,
        subjectId: nextPatient.patientId,
        ownerId: nextPatient.patientId,
        authorId: provider ? provider.npServicesId : nextPatient.patientId,
        occurrences,
        externalId: externalReference,
        activeAt: currentUnixTimestamp(),
      });

      newAction.validate();
      const action = await client.actions.createAction(newAction);
      onCreate && onCreate(action);
    },
    [nextPatient, hcps, medicalArticles, assignableForms],
  );

  const isReady = !medicalArticlesIsLoading && !hcpsIsLoading;

  return (
    <>
      <LoadingBlock isLoading={!isReady}>
        {nextPatient ? (
          <>
            {!!schema && (
              <Form key={key} schema={schema} onSuccess={createAction} />
            )}
          </>
        ) : (
          <p>No patient, please log in</p>
        )}
      </LoadingBlock>
    </>
  );
};
