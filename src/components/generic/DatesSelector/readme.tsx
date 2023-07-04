import * as React from "react";
import moment from "moment";

import { DatesSelector } from ".";
import {
  Block,
  BlockHeader,
  BlockTitle,
  BlockHeaderInputs,
  BlockBody,
} from "../../structure/Block";

import { TFrequencies } from "next-shared/src/types/TFrequencies";
import { THorizontalPositions } from "next-shared/src/types/layouts";
import { useState } from "react";
import { IDateRange } from "../../../hooks/useBookingSlots";
import { timestampFuture } from "./data/timestamps";

export const StandardUsage = () => {
  const [dateRange, setDateRange] = useState<IDateRange>(null);

  return (
    <>
      <span data-test="DatesSelector-scenario-standard">
        <DatesSelector
          onDateRangeChange={(startDate, endDate) => {
            setDateRange({
              startDate: moment.unix(startDate).format("YYYY-MM-DD"),
              endDate: moment.unix(endDate).format("YYYY-MM-DD"),
            });
          }}
        />
      </span>
      <pre>{JSON.stringify(dateRange, null, 2)}</pre>
    </>
  );
};

export const PositionedRightDateSelector = () => {
  const [dateRange, setDateRange] = useState<IDateRange>(null);
  return (
    <>
      <span data-test="DatesSelector-scenario-position">
        <DatesSelector
          onDateRangeChange={(startDate, endDate) => {
            setDateRange({
              startDate: moment.unix(startDate).format("YYYY-MM-DD"),
              endDate: moment.unix(endDate).format("YYYY-MM-DD"),
            });
          }}
          position={THorizontalPositions.Right}
        />
      </span>
      <pre>{JSON.stringify(dateRange, null, 2)}</pre>
    </>
  );
};
export const WithAllFrequencies = () => {
  const [dateRange, setDateRange] = useState<IDateRange>(null);
  const frequencies = [
    TFrequencies.Day,
    TFrequencies.Week,
    TFrequencies.Month,
    TFrequencies.Biannual,
    TFrequencies.Annual,
  ];

  return (
    <>
      <span data-test="DatesSelector-scenario-allFrequencies">
        <DatesSelector
          onDateRangeChange={(startDate, endDate) => {
            setDateRange({
              startDate: moment.unix(startDate).format("YYYY-MM-DD"),
              endDate: moment.unix(endDate).format("YYYY-MM-DD"),
            });
          }}
          frequencies={frequencies}
        />
      </span>
      <pre>{JSON.stringify(dateRange, null, 2)}</pre>
    </>
  );
};

export const WithPresetDate_3MonthsFromNow = () => {
  const [dateRange, setDateRange] = useState<IDateRange>(null);

  const frequencies = [
    TFrequencies.Day,
    TFrequencies.Week,
    TFrequencies.Month,
    TFrequencies.Biannual,
    TFrequencies.Annual,
  ];

  return (
    <>
      <span data-test="DatesSelector-scenario-presetDate">
        <DatesSelector
          onDateRangeChange={(startDate, endDate) => {
            setDateRange({
              startDate: moment.unix(startDate).format("YYYY-MM-DD"),
              endDate: moment.unix(endDate).format("YYYY-MM-DD"),
            });
          }}
          frequencies={frequencies}
          initialEndDate={timestampFuture}
        />
      </span>
      <pre>{JSON.stringify(dateRange, null, 2)}</pre>
    </>
  );
};

export const WithDisabledDate_1YearFromNow = () => {
  const [dateRange, setDateRange] = useState<IDateRange>(null);

  const frequencies = [
    TFrequencies.Day,
    TFrequencies.Week,
    TFrequencies.Month,
    TFrequencies.Biannual,
    TFrequencies.Annual,
  ];

  return (
    <>
      <span data-test="DatesSelector-scenario-maxDate">
        <DatesSelector
          onDateRangeChange={(startDate, endDate) => {
            setDateRange({
              startDate: moment.unix(startDate).format("YYYY-MM-DD"),
              endDate: moment.unix(endDate).format("YYYY-MM-DD"),
            });
          }}
          frequencies={frequencies}
          maxDate={moment().add(1, "year").unix()}
        />
      </span>
      <pre>{JSON.stringify(dateRange, null, 2)}</pre>
    </>
  );
};

export const DemoBlock = () => {
  const [dateRange, setDateRange] = useState<IDateRange>(null);

  return (
    <>
      <Block>
        <BlockHeader>
          <BlockTitle>Block title</BlockTitle>
          <BlockHeaderInputs>
            <DatesSelector
              onDateRangeChange={(startDate) => {
                setDateRange({
                  startDate: moment.unix(startDate).format("YYYY-MM-DD"),
                  endDate: moment.unix(startDate).format("YYYY-MM-DD"),
                });
              }}
              frequencies={[TFrequencies.Day]}
            />
          </BlockHeaderInputs>
        </BlockHeader>
        <BlockBody>Block body</BlockBody>
      </Block>
      <pre>{JSON.stringify(dateRange, null, 2)}</pre>
    </>
  );
};
