import { TAppType } from "next-shared/src/models/App";

const appTypeToIcon: { [type: string]: string } = {
  "bluetooth-receiver": "bluetooth",
  companion: "ipad-2",
  dashboard: "screen",
  "ehr-extension": "specialist",
};

export const getIconForAppType = (type: TAppType) => {
  return appTypeToIcon[type];
};
