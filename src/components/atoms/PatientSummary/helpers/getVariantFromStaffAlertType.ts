import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStaffAlertType } from "next-shared/src/types/staffAlerts";

/**
 * Helper function mapping EStaffAlertType to TColorVariants
 */
export const getVariantFromStaffAlertType = (type: EStaffAlertType) => {
  switch (type) {
    case EStaffAlertType.Info:
      return TColorVariants.Info;
    case EStaffAlertType.Warning:
      return TColorVariants.Warning;
    case EStaffAlertType.Danger:
      return TColorVariants.Danger;
    default:
      return TColorVariants.Info;
  }
};
