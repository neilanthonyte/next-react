import moment from "moment";

export function getDateOfBirthString(dob: string) {
  const age = moment().diff(dob, "years");
  return `${moment(dob).format("Do MMM YYYY")} (${age} yo)`;
}
