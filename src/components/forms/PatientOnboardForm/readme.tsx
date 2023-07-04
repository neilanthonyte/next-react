import * as React from "react";
import { useEffect, useState } from "react";

import { PatientOnboardForm, IEhrPatientBasicsFormData } from ".";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { useDebug } from "../../../debug/DemoWrapper";
import {
  EInclude,
  IPersonalDetails,
  TPersonalDetailsKeys,
} from "../../../types/IPersonalDetails";

export const Demo = () => {
  const { setOutput, setActions } = useDebug();
  const [prefill, setPrefill] = useState<IEhrPatientBasicsFormData>();

  const [include, setInclude] = useState<IPersonalDetails>();

  const toggleElement = (key: TPersonalDetailsKeys, status: EInclude) => {
    const newInclude = { ...include };
    if (newInclude[key]) {
      delete newInclude[key];
    } else {
      newInclude[key] = status;
    }
    setInclude(newInclude);
  };

  useEffect(() => {
    const actions = [
      {
        label: "Toggle Basics",
        action: () => toggleElement("basics", EInclude.Required),
      },
      {
        label: "Toggle Terms And Conditions",
        action: () => toggleElement("termsAndConditions", EInclude.Required),
      },
      {
        label: "Toggle Address",
        action: () => toggleElement("address", EInclude.Optional),
      },
      {
        label: "Toggle Emergency Contact",
        action: () => toggleElement("emergencyContact", EInclude.Optional),
      },
      {
        label: "Toggle Medicare",
        action: () => toggleElement("medicare", EInclude.Optional),
      },
      {
        label: "Toggle Concession",
        action: () => toggleElement("concession", EInclude.Optional),
      },
      {
        label: "Toggle Dva",
        action: () => toggleElement("dva", EInclude.Optional),
      },
    ];

    const patientActions = mockPatients.map((f) => ({
      action: () => setPrefill({ ...prefill, Patient: f.fhir }),
      label: f.getDisplayName(),
    }));

    setActions([...actions, ...patientActions]);
  }, []);

  return (
    <PatientOnboardForm
      key={prefill ? JSON.stringify(prefill) : "blank"}
      onSuccess={setOutput}
      prefillData={prefill}
      include={include}
    />
  );
};
