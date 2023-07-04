import * as React from "react";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { useDebug } from "../../../debug/DemoWrapper";
import { VStack } from "../../structure/VStack";
import { HStack } from "../../structure/HStack";
import { ButtonWithOptions } from ".";
import { useEffect, useState } from "react";

// used in integration tests
export const BUTTONWITHOPTIONS_OUTPUT = "Add";
export const BUTTONWITHOPTIONS_DEFAULT_OUTPUT = "Default";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "ButtonWithOptions",
      scenario: "standard",
    },
  });
  return (
    <ButtonWithOptions
      optionSections={[
        {
          options: [
            {
              label: "Save and add new one",
              icon: "action-add",
              onClick: () => setOutput(BUTTONWITHOPTIONS_OUTPUT),
            },
            {
              label: "Save and export",
              icon: "action-export",
              onClick: () => setOutput("Export"),
            },
          ],
        },
      ]}
    >
      Save
    </ButtonWithOptions>
  );
};

export const DemoDefaultAction = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "ButtonWithOptions",
      scenario: "default-action",
    },
  });

  return (
    <ButtonWithOptions
      onDefaultClick={() => setOutput(BUTTONWITHOPTIONS_DEFAULT_OUTPUT)}
      optionSections={[
        {
          options: [
            {
              label: "Save and add new one",
              icon: "action-add",
              onClick: () => setOutput(BUTTONWITHOPTIONS_OUTPUT),
            },
            {
              label: "Save and export",
              icon: "action-export",
              onClick: () => setOutput("Export"),
            },
          ],
        },
      ]}
    >
      Save
    </ButtonWithOptions>
  );
};

export const DemoPromise = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "ButtonWithOptions",
      scenario: "promise",
    },
  });

  const [disableOnSuccess, setDisableOnSuccess] = useState<boolean>(false);

  useEffect(() => {
    setActions([
      {
        label: `Toggle disable on success: currently ${disableOnSuccess}`,
        action: () => setDisableOnSuccess((s) => !s),
      },
    ]);
  }, [disableOnSuccess]);

  return (
    <HStack>
      <ButtonWithOptions
        disableOnSuccess={disableOnSuccess}
        optionSections={[
          {
            options: [
              {
                label: "Async success",
                icon: "action-add",
                onClick: () =>
                  new Promise((res) =>
                    setTimeout(() => {
                      res(true);
                      setOutput("Add");
                    }, 2000),
                  ),
              },
              {
                label: "Async fail",
                icon: "action-add",
                onClick: () =>
                  new Promise((_, rej) =>
                    setTimeout(() => {
                      rej();
                      setOutput("Add");
                    }, 2000),
                  ),
              },
            ],
          },
        ]}
      >
        Save
      </ButtonWithOptions>
      <ButtonWithOptions
        onDefaultClick={() => setOutput("Default")}
        disableOnSuccess={disableOnSuccess}
        optionSections={[
          {
            options: [
              {
                label: "Async success",
                icon: "action-add",
                onClick: () =>
                  new Promise((res) =>
                    setTimeout(() => {
                      res(true);
                      setOutput("Add");
                    }, 2000),
                  ),
              },
              {
                label: "Async fail",
                icon: "action-add",
                onClick: () =>
                  new Promise((_, rej) =>
                    setTimeout(() => {
                      rej();
                      setOutput("Add");
                    }, 2000),
                  ),
              },
            ],
          },
        ]}
      >
        Save
      </ButtonWithOptions>
    </HStack>
  );
};

export const DemoVariants = () => {
  const { setOutput } = useDebug();
  return (
    <VStack>
      <h2>Options</h2>
      <h3>Variants</h3>
      <HStack>
        <ButtonWithOptions
          optionSections={[
            {
              options: [
                {
                  label: "Save and add new one",
                  icon: "action-add",
                  onClick: () => setOutput("Add"),
                },
                {
                  label: "Save and export",
                  icon: "action-export",
                  onClick: () => setOutput("Export"),
                },
              ],
            },
          ]}
        >
          Save
        </ButtonWithOptions>
        <ButtonWithOptions
          variant="secondary"
          optionSections={[
            {
              options: [
                {
                  label: "Save and add new one",
                  icon: "action-add",
                  onClick: () => setOutput("Add"),
                },
                {
                  label: "Save and export",
                  icon: "action-export",
                  onClick: () => setOutput("Export"),
                },
              ],
            },
          ]}
        >
          Save
        </ButtonWithOptions>
      </HStack>
      <h3>Statuses</h3>
      <HStack>
        {Object.values(TColorVariants).map((v: TColorVariants) => (
          <ButtonWithOptions
            status={v}
            key={v}
            optionSections={[
              {
                options: [
                  {
                    label: "Save and add new one",
                    icon: "action-add",
                    onClick: () => setOutput("Add"),
                  },
                  {
                    label: "Save and export",
                    icon: "action-export",
                    onClick: () => setOutput("Export"),
                  },
                ],
              },
            ]}
          >
            {v || "Standard"}
          </ButtonWithOptions>
        ))}
      </HStack>
      <h3>Sizes</h3>
      <HStack>
        {Object.values(EStandardSizes).map((s) => (
          <ButtonWithOptions
            size={s}
            key={s}
            optionSections={[
              {
                options: [
                  {
                    label: "Save and add new one",
                    icon: "action-add",
                    onClick: () => setOutput("Add"),
                  },
                  {
                    label: "Save and export",
                    icon: "action-export",
                    onClick: () => setOutput("Export"),
                  },
                ],
              },
            ]}
          >
            {s}
          </ButtonWithOptions>
        ))}
      </HStack>

      <h2>Options with defaults</h2>
      <h3>Variants</h3>
      <HStack>
        <ButtonWithOptions
          onDefaultClick={() => setOutput("Default")}
          optionSections={[
            {
              options: [
                {
                  label: "Save and add new one",
                  icon: "action-add",
                  onClick: () => setOutput("Add"),
                },
                {
                  label: "Save and export",
                  icon: "action-export",
                  onClick: () => setOutput("Export"),
                },
              ],
            },
          ]}
        >
          Save
        </ButtonWithOptions>
        <ButtonWithOptions
          onDefaultClick={() => setOutput("Default")}
          variant="secondary"
          optionSections={[
            {
              options: [
                {
                  label: "Save and add new one",
                  icon: "action-add",
                  onClick: () => setOutput("Add"),
                },
                {
                  label: "Save and export",
                  icon: "action-export",
                  onClick: () => setOutput("Export"),
                },
              ],
            },
          ]}
        >
          Save
        </ButtonWithOptions>
      </HStack>
      <h3>Statuses</h3>
      <HStack>
        {Object.values(TColorVariants).map((v: TColorVariants) => (
          <ButtonWithOptions
            status={v}
            key={v}
            onDefaultClick={() => setOutput("Default")}
            optionSections={[
              {
                options: [
                  {
                    label: "Save and add new one",
                    icon: "action-add",
                    onClick: () => setOutput("Add"),
                  },
                  {
                    label: "Save and export",
                    icon: "action-export",
                    onClick: () => setOutput("Export"),
                  },
                ],
              },
            ]}
          >
            {v || "Standard"}
          </ButtonWithOptions>
        ))}
      </HStack>
      <h3>Sizes</h3>
      <HStack>
        {Object.values(EStandardSizes).map((s) => (
          <ButtonWithOptions
            size={s}
            key={s}
            onDefaultClick={() => setOutput("Default")}
            optionSections={[
              {
                options: [
                  {
                    label: "Save and add new one",
                    icon: "action-add",
                    onClick: () => setOutput("Add"),
                  },
                  {
                    label: "Save and export",
                    icon: "action-export",
                    onClick: () => setOutput("Export"),
                  },
                ],
              },
            ]}
          >
            {s}
          </ButtonWithOptions>
        ))}
      </HStack>
    </VStack>
  );
};
