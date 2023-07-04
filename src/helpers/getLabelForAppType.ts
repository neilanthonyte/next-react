import { TAppType } from "next-shared/src/models/App";

const appTypeToLabel: { [type: string]: string } = {
  "bluetooth-receiver": "Bluetooth Receiver",
  companion: "Companion",
  dashboard: "Dashboard",
  "ehr-extension": "Helix extension",
};

export const getLabelForAppType = (type: TAppType) => {
  return appTypeToLabel[type];
};
