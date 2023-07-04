import { IFormSchema } from "next-shared/src/types/formTypes";

export const nextAppSchema: IFormSchema = [
  {
    label: "Type",
    type: "options",
    map: "type",
    required: true,
    variant: "dropdown",
    options: [
      {
        label: "Consult Screen",
        value: "dashboard",
      },
      {
        label: "Next Bar",
        value: "ehr-extension",
      },
      // {
      //   label: "Bluetooth Medical Device",
      //   value: "bluetooth-device",
      // },
      // {
      //   label: "Bluetooth Receiver Hub",
      //   value: "bluetooth-receiver",
      // },
    ],
  },
  {
    label: "Label",
    type: "text",
    map: "label",
    required: true,
    description:
      "Choose a label that identifies the device to other staff members",
    conditional: {
      path: "../type",
      // don't show the label for a bluetooth device
      matchAny: ["ehr-extension", "dashboard", "bluetooth-receiver"],
      type: "visible",
    },
  },
  {
    label: "Bluetooth Device Type",
    type: "options",
    map: "deviceType",
    required: true,
    variant: "dropdown",
    options: [
      {
        label: "Weight Scale",
        value: "weight-scale",
      },
      {
        label: "Blood Pressure",
        value: "blood-pressure",
      },
    ],
    conditional: {
      path: "../type",
      match: "bluetooth-device",
      type: "visible",
    },
  },
  {
    label: "Serial Number",
    type: "text",
    map: "serial",
    description:
      "This is used to associate a bluetooth device to a specific room, please make sure that the serial number is correct. N.B. If the serial number on the device has a dash (-), please insert that.",
    required: true,
    conditional: {
      path: "../type",
      match: "bluetooth-device",
      type: "visible",
    },
  },
];
