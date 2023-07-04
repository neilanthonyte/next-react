import { useCallback, useState } from "react";

export interface IPersonalDetailsBuilderHook {
  /**
   * Indicates whether the patient has been modified locally.
   */
  isModified: boolean;
  /**
   * The UUID of the patient in the Next system, if they have one (ie. if they have an account).
   */
  patientId?: string;
  /**
   * The FHIR patient.
   */
  patient: fhir3.Patient;
  /**
   * Sets the FHIR patient value. Sets isModified to false.
   * @param patient the new value to store.
   * @param patientId optional - the UUID of the patient in the Next system, if they have one.
   */
  setPatient: (patient: fhir3.Patient, patientId?: string) => void;
  /**
   * Clears the FHIR patient.
   */
  clearPatient: () => void;
  /**
   * Updates the FHIR patient's supplementary details (contact, identifier and/or address fields). Automatically sets
   * isModified to true.
   * @param value a fhir3.Patient containing contact, identifier and/or address values to update.
   * @returns a promise that resolved to the updated patient object.
   */
  updatePersonals: (value: fhir3.Patient) => Promise<fhir3.Patient>;
}

/**
 * An updatable FHIR patient for storing and building personal details.
 * @param initialDetails the initial value.
 */
export const usePersonalDetailsBuilder = (
  initialDetails?: fhir3.Patient,
): IPersonalDetailsBuilderHook => {
  const [isModified, setIsModified] = useState(false);
  const [patientId, setPatientId] = useState<string>();
  const [fhirPatient, setFhirPatient] = useState<fhir3.Patient | undefined>(
    initialDetails,
  );

  const setPatient = useCallback(
    (patient: fhir3.Patient, patientId?: string) => {
      setIsModified(false);
      setPatientId(patientId);
      setFhirPatient(patient);
    },
    [],
  );

  const clearPatient = useCallback(() => {
    setPatient(undefined);
  }, [setPatient]);

  const updatePersonals = useCallback((value: fhir3.Patient) => {
    const { identifier, contact, address } = value;
    setIsModified(true);
    // returning a promise allows the caller to immediately make use of the updates state
    return new Promise<fhir3.Patient>((resolve) =>
      setFhirPatient((oldPatient) => {
        const newPatient = { ...oldPatient };

        if (contact) {
          newPatient.contact = contact;
        }

        if (identifier) {
          newPatient.identifier = identifier;
        }

        if (address) {
          newPatient.address = address;
        }

        resolve(newPatient);

        return newPatient;
      }),
    );
  }, []);

  return {
    isModified,
    patientId,
    patient: fhirPatient,
    setPatient,
    clearPatient,
    updatePersonals,
  };
};
