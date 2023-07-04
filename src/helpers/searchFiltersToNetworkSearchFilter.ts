import { ISearchFilter } from "next-shared/src/types/ISearchFilter";
import {
  INetworkSearchFilters,
  EDeliveryMethod,
  EBookingBillingType,
  EGender,
  EOpenHours,
} from "next-shared/src/types/INetworkSearchResults";

export const defaultNetworkSearchFiltersValue: INetworkSearchFilters = {
  deliveryMethod: null,
  gender: null,
  billing: null,
  openHours: null,
};

export const searchFiltersToNetworkSearchFilter = (
  filters: ISearchFilter[],
): INetworkSearchFilters => {
  // default to empty default filter value
  const networkFilters = { ...defaultNetworkSearchFiltersValue };
  if (!filters) {
    return networkFilters;
  }

  Object.keys(EDeliveryMethod).forEach((deliveryKey) => {
    const filter = filters.find((f) => f.value === deliveryKey);
    if (filter) {
      networkFilters.deliveryMethod = filter.value as EDeliveryMethod;
    }
  });

  Object.keys(EBookingBillingType).forEach((billingKey) => {
    const filter = filters.find((f) => f.value === billingKey);
    if (filter) {
      networkFilters.billing = filter.value as EBookingBillingType;
    }
  });

  Object.keys(EGender).forEach((genderKey) => {
    const filter = filters.find((f) => f.value === genderKey);
    if (filter) {
      networkFilters.gender = filter.value as EGender;
    }
  });

  Object.keys(EOpenHours).forEach((openHourKey) => {
    const filter = filters.find((f) => f.value === openHourKey);
    if (filter) {
      networkFilters.openHours = filter.value as EOpenHours;
    }
  });

  return networkFilters;
};
