/**
 * Helper function returning an avatar icon based on supplied patient gender
 */
export const getAvatarIconForPatient = (
  patient: fhir3.Patient,
): "avatar-male" | "avatar-female" | "avatar-genderless" => {
  const gender = patient.gender;
  const genderLookup: any = { male: "avatar-male", female: "avatar-female" };
  return genderLookup[gender] || "avatar-genderless";
};
