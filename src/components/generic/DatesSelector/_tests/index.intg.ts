import * as _ from "lodash";
import moment from "moment-timezone";
import { Selector } from "testcafe";

import { DatesSelectorCtrl } from "./index.ctrl";
import { frequencyToDateDisplayFormat } from "../../../../helpers/frequencyToDateDisplayFormat";
import { TFrequencies } from "next-shared/src/types/TFrequencies";
import { THorizontalPositions } from "next-shared/src/types/layouts";
import { timestampFuture, timestampNow } from "../data/timestamps";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("DatesSelector").page("http://0.0.0.0:6060/#!/DatesSelector");

test("dates selector functions correctly", async (t) => {
  const example = Selector(toTestSelector("DatesSelector-scenario-standard"));
  const datesSelector = new DatesSelectorCtrl(example, t);

  let timestamp = timestampNow;

  await datesSelector.expectSelectedFrequency(_.upperFirst(TFrequencies.Day));
  await datesSelector.expectDisplayDate(
    frequencyToDateDisplayFormat(timestamp, TFrequencies.Day),
  );

  await datesSelector.clickNextButton();
  timestamp = moment.unix(timestamp).add(1, "day").unix();
  await datesSelector.expectSelectedFrequency(_.upperFirst(TFrequencies.Day));
  await datesSelector.expectDisplayDate(
    frequencyToDateDisplayFormat(timestamp, TFrequencies.Day),
  );

  await datesSelector.clickFrequency(TFrequencies.Week);
  await datesSelector.expectSelectedFrequency(_.upperFirst(TFrequencies.Week));
  await datesSelector.expectDisplayDate(
    frequencyToDateDisplayFormat(timestamp, TFrequencies.Week),
  );

  await datesSelector.clickPreviousButton();
  timestamp = moment.unix(timestamp).subtract(1, "week").unix();
  await datesSelector.expectSelectedFrequency(_.upperFirst(TFrequencies.Week));
  await datesSelector.expectDisplayDate(
    frequencyToDateDisplayFormat(timestamp, TFrequencies.Week),
  );

  await datesSelector.clickFrequency(TFrequencies.Month);
  await datesSelector.expectSelectedFrequency(_.upperFirst(TFrequencies.Month));
  await datesSelector.expectDisplayDate(
    frequencyToDateDisplayFormat(timestamp, TFrequencies.Month),
  );

  await datesSelector.clickNextButton();
  timestamp = moment.unix(timestamp).add(1, "month").unix();
  await datesSelector.expectSelectedFrequency(_.upperFirst(TFrequencies.Month));
  await datesSelector.expectDisplayDate(
    frequencyToDateDisplayFormat(timestamp, TFrequencies.Month),
  );
});

test("dates selector positions correctly", async (t) => {
  const example = Selector(toTestSelector("DatesSelector-scenario-position"));
  const datesSelector = new DatesSelectorCtrl(example, t);

  await datesSelector.expectPosition(THorizontalPositions.Right);
});

test("all frequencies can be selected an show the correct date format", async (t) => {
  const example = Selector(
    toTestSelector("DatesSelector-scenario-allFrequencies"),
  );
  const datesSelector = new DatesSelectorCtrl(example, t);

  const frequencies = Object.values(TFrequencies).reverse();

  for (const frequency of frequencies) {
    await datesSelector.clickFrequency(frequency as TFrequencies);

    switch (frequency) {
      case TFrequencies.Day:
        await datesSelector.expectSelectedFrequency(
          _.upperFirst(TFrequencies.Day),
        );
        await datesSelector.expectDisplayDate(
          frequencyToDateDisplayFormat(timestampNow, TFrequencies.Day),
        );
        break;
      case TFrequencies.Week:
        await datesSelector.expectSelectedFrequency(
          _.upperFirst(TFrequencies.Week),
        );
        await datesSelector.expectDisplayDate(
          frequencyToDateDisplayFormat(timestampNow, TFrequencies.Week),
        );
        break;
      case TFrequencies.Month:
        await datesSelector.expectSelectedFrequency(
          _.upperFirst(TFrequencies.Month),
        );
        await datesSelector.expectDisplayDate(
          frequencyToDateDisplayFormat(timestampNow, TFrequencies.Month),
        );
        break;
      case TFrequencies.Biannual:
        await datesSelector.expectSelectedFrequency(
          _.upperFirst(TFrequencies.Biannual),
        );
        await datesSelector.expectDisplayDate(
          frequencyToDateDisplayFormat(timestampNow, TFrequencies.Biannual),
        );
        break;
      case TFrequencies.Annual:
        await datesSelector.expectSelectedFrequency(
          _.upperFirst(TFrequencies.Annual),
        );
        await datesSelector.expectDisplayDate(
          frequencyToDateDisplayFormat(timestampNow, TFrequencies.Annual),
        );
        break;
      default:
        throw new Error(`${frequency} not supported`);
    }
  }
});

test("can set a preselected date", async (t) => {
  const example = Selector(toTestSelector("DatesSelector-scenario-presetDate"));
  const datesSelector = new DatesSelectorCtrl(example, t);

  const frequencies = Object.values(TFrequencies).reverse();

  for (const frequency of frequencies) {
    await datesSelector.clickFrequency(frequency as TFrequencies);

    switch (frequency) {
      case TFrequencies.Day:
        await datesSelector.expectSelectedFrequency(
          _.upperFirst(TFrequencies.Day),
        );
        await datesSelector.expectDisplayDate(
          frequencyToDateDisplayFormat(timestampFuture, TFrequencies.Day),
        );
        break;
      case TFrequencies.Week:
        await datesSelector.expectSelectedFrequency(
          _.upperFirst(TFrequencies.Week),
        );
        await datesSelector.expectDisplayDate(
          frequencyToDateDisplayFormat(timestampFuture, TFrequencies.Week),
        );
        break;
      case TFrequencies.Month:
        await datesSelector.expectSelectedFrequency(
          _.upperFirst(TFrequencies.Month),
        );
        await datesSelector.expectDisplayDate(
          frequencyToDateDisplayFormat(timestampFuture, TFrequencies.Month),
        );
        break;
      case TFrequencies.Biannual:
        await datesSelector.expectSelectedFrequency(
          _.upperFirst(TFrequencies.Biannual),
        );

        await datesSelector.expectDisplayDate(
          frequencyToDateDisplayFormat(timestampFuture, TFrequencies.Biannual),
        );
        break;
      case TFrequencies.Annual:
        await datesSelector.expectSelectedFrequency(
          _.upperFirst(TFrequencies.Annual),
        );

        await datesSelector.expectDisplayDate(
          frequencyToDateDisplayFormat(timestampFuture, TFrequencies.Annual),
        );
        break;
      default:
        throw new Error(`${frequency} not supported`);
    }
  }
});

test("cannot go past the set max date", async (t) => {
  const example = Selector(toTestSelector("DatesSelector-scenario-maxDate"));
  const datesSelector = new DatesSelectorCtrl(example, t);

  await datesSelector.clickFrequency(TFrequencies.Annual);
  await datesSelector.clickNextButton();

  await datesSelector.expectNextButtonDisabled();
});
