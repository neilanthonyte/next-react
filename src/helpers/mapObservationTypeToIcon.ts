const typeToIcon: { [key: string]: string } = {
  "observation:BloodPressure": "obs-blood-pressure",
  "observation:Weight": "obs-weight",
  "observation:Smoking": "smoking",
  "observation:Alcohol": "alcohol",
  "observation:ReasonForVisit": "conditions",
  "observation:PatientForm": "conditions",
  "observation:NoteToPatient": "write",
};

export const mapObservationTypeToIcon = (obsType: string): string => {
  return typeToIcon[obsType] || "metrics";
};
