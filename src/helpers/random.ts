import * as _ from "lodash";
import moment from "moment-timezone";

import { unixTimestamp } from "next-shared/src/types/dateTypes";

/**
 * Choose a random element from an array
 */
export const randomFromArr = (array: any[]): any =>
  array[_.random(0, array.length - 1, false)];

/**
 * Choose a random number from 1 to the given number
 */
export const randomNum = (num: number): number => _.random(1, num, false);

/**
 * Choose a random boolean
 */
export const randomBool = (): boolean => !!_.random(0, 1, false);

/**
 * Choose a random unix time stamp from now + 0 to random given minutes
 */
export const randomUnixTimestamp = (mins: number): unixTimestamp =>
  moment().add(_.random(0, mins, false), "minutes").unix();
