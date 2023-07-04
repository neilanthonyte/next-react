import * as React from "react";
import { useEffect, useState } from "react";

import { useFetchForms } from ".";
import { VStack } from "../../../components/structure/VStack";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    setSessionDebug: true,
    requireSession: "app",
  });

  const [patientId, setPatientId] = useState<string>("");
  const [formSlug, setformSlug] = useState<string>("sydney-onboard");

  const { formData } = useFetchForms(formSlug, patientId);

  useEffect(() => {
    setOutput(formData);
  }, [formData]);

  return (
    <>
      <VStack>
        <input
          type="text"
          onChange={(evt) => setformSlug(evt.target.value)}
          placeholder="Form slug"
          value={formSlug}
        />
        <input
          type="text"
          onChange={(evt) => setPatientId(evt.target.value)}
          placeholder="Patient ID"
          value={patientId}
        />
      </VStack>
    </>
  );
};
