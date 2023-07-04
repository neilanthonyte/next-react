import * as React from "react";
import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { ISODate, ISODATE_FORMAT } from "next-shared/src/types/dateTypes";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { EInputLayout } from "next-shared/src/types/layouts";

import { useDebug } from "../../../debug/DemoWrapper";
import { VStack } from "../../structure/VStack";
import { CalendarRangeInput, CalendarSingleInput, ISODateRange } from ".";

export const CALENDAR_INPUT_TEST_DISABLE_TOGGLE_BTN = "toggle-disabled";

export const DemoSingle = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "CalendarInput",
      scenario: "single",
    },
  });

  const [value, setValue] = useState<ISODate>();
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    setActions([
      {
        action: () => setDisabled((s) => !s),
        label: "Toggle disabled",
        test: CALENDAR_INPUT_TEST_DISABLE_TOGGLE_BTN,
      },
    ]);
  }, []);

  useEffect(() => {
    setOutput(value);
  }, [value]);

  return (
    <VStack>
      <CalendarSingleInput
        onInputChange={setValue}
        value={value}
        disabled={disabled}
      />
      <CalendarSingleInput
        onInputChange={setValue}
        value={value}
        disabled={disabled}
        stdSize={EStandardSizes.ExtraSmall}
      />
      <CalendarSingleInput
        onInputChange={setValue}
        value={value}
        disabled={disabled}
        stdSize={EStandardSizes.Small}
      />
      <CalendarSingleInput
        onInputChange={setValue}
        value={value}
        disabled={disabled}
        stdSize={EStandardSizes.Large}
      />
    </VStack>
  );
};

export const DemoRange = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "CalendarInput",
      scenario: "range",
    },
  });

  const [value, setValue] = useState<ISODateRange>({
    from: dayjs().subtract(5, "d").format(ISODATE_FORMAT),
    to: dayjs().format(ISODATE_FORMAT),
  });
  const [disabled, setDisabled] = useState<boolean>();

  useEffect(() => {
    setActions([
      {
        action: () => setDisabled((s) => !s),
        label: "Toggle disabled",
      },
    ]);
  }, []);

  useEffect(() => {
    setOutput(value);
  }, [value]);

  return (
    <VStack>
      <CalendarRangeInput
        onInputChange={setValue}
        value={value}
        disabled={disabled}
      />
      <CalendarRangeInput
        onInputChange={setValue}
        value={value}
        disabled={disabled}
        stdSize={EStandardSizes.ExtraSmall}
      />
      <CalendarRangeInput
        onInputChange={setValue}
        value={value}
        disabled={disabled}
        stdSize={EStandardSizes.Small}
      />
      <CalendarRangeInput
        onInputChange={setValue}
        value={value}
        disabled={disabled}
        stdSize={EStandardSizes.Medium}
      />
      <CalendarRangeInput
        onInputChange={setValue}
        value={value}
        disabled={disabled}
        stdSize={EStandardSizes.Large}
      />
    </VStack>
  );
};

export const DemoInline = () => {
  useDebug({
    test: {
      componentName: "CalendarInput",
      scenario: "inline",
    },
  });

  const [valueSingle, setValueSingle] = useState<ISODate>();
  const [valueRange, setValueRange] = useState<ISODateRange>();

  return (
    <VStack>
      <CalendarSingleInput
        layout={EInputLayout.Inline}
        onInputChange={setValueSingle}
        value={valueSingle}
      />
      <CalendarRangeInput
        layout={EInputLayout.Inline}
        onInputChange={setValueRange}
        value={valueRange}
      />
    </VStack>
  );
};
