import { ISearchFilter } from "next-shared/src/types/ISearchFilter";
import {
  EGender,
  EDeliveryMethod,
} from "next-shared/src/types/INetworkSearchResults";

export const searchFilters: ISearchFilter[] = [
  {
    title: "Practitioner gender",
    options: { Any: null, Male: EGender.male, Female: EGender.female },
    value: null,
  },
  {
    title: "Appointment delivery",
    options: {
      Any: null,
      Telehealth: EDeliveryMethod.digital,
      "Face to face": EDeliveryMethod.physical,
    },
    value: null,
  },
  // HACK remove until important (all clinics are non-bulk and standard hours)
  // {
  //   title: "Billing",
  //   options: {
  //     Any: null,
  //     Private: EBookingBillingType.private,
  //     "Bulk bill": EBookingBillingType.bulk
  //   },
  //   value: null
  // },
  // {
  //   title: "Time of the day",
  //   options: {
  //     Any: null,
  //     Today: EOpenHours.today,
  //     "After hours": EOpenHours.afterHours,
  //     Weekends: EOpenHours.weekends
  //   },
  //   value: null
  // }
];
