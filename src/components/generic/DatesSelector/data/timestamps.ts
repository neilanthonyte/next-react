import moment from "moment-timezone";

export const timestampNow = moment().unix();
export const timestampFuture = moment().add(6, "month").unix();
