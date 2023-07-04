import moment from "moment";
import { Action } from "next-shared/src/models/Action";
import { ActionFulfillment } from "next-shared/src/models/ActionFulfillment";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";

export const calculateDayFulfillmentSummary = (
  actions: Action[],
  actionsFulfillments: ActionFulfillment[],
  day?: string,
): "successful" | "completed" | "fail" | "partial" | "unknown" => {
  // TODO reinstate
  // let completedCount = 0;
  // let failedCount = 0;
  // let occurrencesCount = 0;
  // const activeDay = day || moment().format("YYYY-MM-DD");

  // const currentTime = currentUnixTimestamp();

  // actions.forEach((action) => {
  //   const occurrences = action.getOccurrencesOnDay(activeDay);
  //   const now = currentUnixTimestamp();

  //   // check if we have occurences
  //   if (occurrences.length) {
  //     // if we do, look for corresponding actionFulfillment
  //     occurrences.forEach((occ) => {
  //       // update occurences count
  //       occurrencesCount++;
  //       const fulfillment = (actionsFulfillments || []).find(
  //         (fulfillment) =>
  //           fulfillment.actionId === action.id && fulfillment.dueAt === occ,
  //       );
  //       // if found, check status and exit
  //       if (fulfillment) {
  //         // if status unknown, don't do anything
  //         if (fulfillment.resolution === "successful") {
  //           completedCount++;
  //         }
  //         if (fulfillment.resolution === "open" && fulfillment.dueAt > now) {
  //           // not due yet, ignore
  //           return;
  //         }
  //         if (fulfillment.resolution === "open") {
  //           failedCount++;
  //         }
  //         return;
  //       }
  //       // if not found and due later in the day, don't do anything
  //       if (occ > currentTime) return;
  //       // else (it was due before now, it's missed)
  //       failedCount++;
  //     });
  //   }
  // });
  // // derive day status based on counts
  // if (occurrencesCount > 0) {
  //   if (completedCount === occurrencesCount) return "completed";
  //   if (completedCount > 0 && failedCount > 0) return "partial";
  //   if (failedCount > 0) return "fail";
  //   if (completedCount > 0) return "successful";
  // }

  // if no match, return unknown
  return "unknown";
};
