import { IOption } from "../../../helpers/standardizeOptions";
import { EDevices } from "./EDevices";

export const deviceOptions: IOption<string>[] = [
  {
    // icon: "otoscope",
    icon: "ear",
    label: "Otoscope",
    value: EDevices.Otoscope,
  },
  {
    icon: "eye",
    label: "Ophthalmoscope",
    value: EDevices.Ophthalmoscope,
  },
  {
    icon: "skin",
    label: "Dermatoscope",
    value: EDevices.Dermatoscope,
  },
  {
    icon: "photo",
    label: "Photo",
    value: EDevices.Photo,
  },
];
