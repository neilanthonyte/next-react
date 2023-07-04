import * as React from "react";
import { useEffect, useState } from "react";
import faker from "faker";

import { TColorVariants } from "next-shared/src/types/TColorVariants";

import { useDebug } from "../../../debug/DemoWrapper";
import { Button } from "../../generic/Button";
import { OptionsPopover } from ".";

//  used in integration test
export const MOCK_OPTIONS_POPOVER_TEST_SECTION_LABEL = "Section";
export const MOCK_OPTIONS_POPOVER_TEST_OPTION_LABEL = "Option";
export const MOCK_OPTIONS_POPOVER_TEST_ATTRIBUTE = "option";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "OptionsPopover",
      scenario: "standard",
    },
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const target = (
    <Button onClick={() => setIsPopoverOpen(true)}>Open popover</Button>
  );

  return (
    <OptionsPopover
      open={isPopoverOpen}
      closeHandler={() => setIsPopoverOpen(false)}
      target={target}
      sections={[
        {
          options: [
            { label: "Bar", onClick: () => setOutput("Bar") },
            { label: "Foo", onClick: () => setOutput("Foo") },
          ],
        },
      ]}
    />
  );
};

export const DemoIcons = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "OptionsPopover",
      scenario: "icons",
    },
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const target = (
    <Button onClick={() => setIsPopoverOpen(true)}>Open popover</Button>
  );

  const longOptionLabel = faker.random.words(6);

  return (
    <OptionsPopover
      open={isPopoverOpen}
      closeHandler={() => setIsPopoverOpen(false)}
      target={target}
      sections={[
        {
          options: [
            {
              label: "Bar",
              onClick: () => setOutput("Bar"),
              icon: "nutrition",
            },
            {
              label: longOptionLabel,
              onClick: () => setOutput(longOptionLabel),
              icon: "address",
            },
          ],
        },
      ]}
    />
  );
};

export const DemoColorIcon = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "OptionsPopover",
      scenario: "color-icon",
    },
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const target = (
    <Button onClick={() => setIsPopoverOpen(true)}>Open popover</Button>
  );

  return (
    <OptionsPopover
      open={isPopoverOpen}
      closeHandler={() => setIsPopoverOpen(false)}
      target={target}
      sections={[
        {
          options: [
            {
              label: "Bar",
              onClick: () => setOutput("Bar"),
              icon: "nutrition",
              iconColorVariant: TColorVariants.Error,
            },
            {
              label: "Foo",
              onClick: () => setOutput("Foo"),
              icon: "address",
              iconColorVariant: TColorVariants.Info,
            },
          ],
        },
      ]}
    />
  );
};

export const DemoSectionLabel = () => {
  const { setOutput, output, setTestAttributes } = useDebug({
    test: {
      componentName: "OptionsPopover",
      scenario: "section-label",
    },
  });

  useEffect(() => {
    setTestAttributes({ [MOCK_OPTIONS_POPOVER_TEST_ATTRIBUTE]: output });
  }, [output]);

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const target = (
    <Button onClick={() => setIsPopoverOpen(true)}>Open popover</Button>
  );

  return (
    <OptionsPopover
      open={isPopoverOpen}
      closeHandler={() => setIsPopoverOpen(false)}
      target={target}
      sections={[
        {
          label: MOCK_OPTIONS_POPOVER_TEST_SECTION_LABEL,
          options: [
            {
              label: MOCK_OPTIONS_POPOVER_TEST_OPTION_LABEL,
              onClick: () => setOutput(MOCK_OPTIONS_POPOVER_TEST_OPTION_LABEL),
              icon: "nutrition",
            },
            { label: "Foo", onClick: () => setOutput("Foo"), icon: "address" },
          ],
        },
        {
          label: faker.random.word(),
          options: [
            {
              label: "Bar",
              onClick: () => setOutput("Bar"),
              icon: "nutrition",
            },
            { label: "Foo", onClick: () => setOutput("Foo"), icon: "address" },
          ],
        },
      ]}
    />
  );
};

export const DemoDisabled = () => {
  const { setOutput, output, setTestAttributes } = useDebug({
    test: {
      componentName: "OptionsPopover",
      scenario: "disabled",
    },
  });

  useEffect(() => {
    setTestAttributes({ [MOCK_OPTIONS_POPOVER_TEST_ATTRIBUTE]: output });
  }, [output]);

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const target = (
    <Button onClick={() => setIsPopoverOpen(true)}>Open popover</Button>
  );

  return (
    <OptionsPopover
      open={isPopoverOpen}
      closeHandler={() => setIsPopoverOpen(false)}
      target={target}
      sections={[
        {
          label: faker.random.word(),
          options: [
            {
              label: "Bar",
              onClick: () => setOutput("Bar"),
              icon: "nutrition",
              isDisabled: true,
            },
            {
              label: MOCK_OPTIONS_POPOVER_TEST_OPTION_LABEL,
              onClick: () => setOutput(MOCK_OPTIONS_POPOVER_TEST_OPTION_LABEL),
              icon: "address",
            },
          ],
        },
        {
          label: faker.random.word(),
          isDisabled: true,
          options: [
            {
              label: "Bar",
              onClick: () => setOutput("Bar"),
              icon: "nutrition",
            },
            { label: "Foo", onClick: () => setOutput("Foo"), icon: "address" },
          ],
        },
      ]}
    />
  );
};
