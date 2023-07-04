import moment from "moment";

import { ICreditCard } from "next-shared/src/types/ICreditCard";

export const creditCardIsExpired = (creditCard: ICreditCard) =>
  creditCard &&
  moment(creditCard.expirationDate, "MM/YYYY")
    .endOf("month")
    .isBefore(moment());
