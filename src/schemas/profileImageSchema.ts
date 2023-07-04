import { EFormType, IFormDetailsSingle } from "next-shared/src/types/formTypes";
import { EInclude } from "../types/IPersonalDetails";

export const profileImageSchema = (include: EInclude): IFormDetailsSingle => ({
  type: EFormType.Single,
  title: "Profile Image",
  description: null,
  data: "Patient",
  transformers: [],
  fields: [
    {
      label: "Profile Image",
      type: "camera",
      videoEnvironment: "user",
      videoWidth: 300,
      isRoundStyle: true,
      mode: "auto",
      map: "Patient.photo.0.url",
      required: include === EInclude.Required,
    },
  ],
});
