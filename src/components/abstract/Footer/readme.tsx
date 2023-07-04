import * as React from "react";
import { useEffect, useState } from "react";
import faker from "faker";

import { useDebug } from "../../../debug/DemoWrapper";
import { Footer } from ".";

// used for integration tests
export const FOOTER_ACCEPT_LABEL_DEMO = "Save";
export const FOOTER_ACCEPT_DISABLED_ACTION = "disable-accept";
export const FOOTER_CANCEL_LABEL_DEMO = "Close";
export const FOOTER_ACTION_LABEL_DEMO = "Foo";

export const DemoStandard = () => {
  useDebug({
    test: {
      componentName: "Footer",
      scenario: "standard",
    },
  });

  return (
    <Footer>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quod
      tempora facilis fugit dolore aspernatur, aut doloribus necessitatibus
      ratione soluta totam vero iure sequi perferendis modi, suscipit deleniti
      aliquam blanditiis?
    </Footer>
  );
};

export const DemoAccept = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "Footer",
      scenario: "accept",
    },
  });

  return <Footer onAccept={() => setOutput("Accept")} />;
};

export const DemoAcceptCustom = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "Footer",
      scenario: "accept-custom",
    },
  });

  useEffect(() => {
    setActions([
      {
        label: "Toggle disabled",
        action: () => setAcceptDisabled((s) => !s),
        test: FOOTER_ACCEPT_DISABLED_ACTION,
      },
    ]);
  }, []);

  const [acceptDisabled, setAcceptDisabled] = useState<boolean>(false);

  return (
    <Footer
      onAccept={() => setOutput(FOOTER_ACCEPT_LABEL_DEMO)}
      acceptLabel={FOOTER_ACCEPT_LABEL_DEMO}
      acceptDisabled={acceptDisabled}
    />
  );
};

export const DemoCancel = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "Footer",
      scenario: "cancel",
    },
  });

  return <Footer onCancel={() => setOutput("Cancel")} />;
};

export const DemoCancelCustom = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "Footer",
      scenario: "cancel-custom",
    },
  });

  return (
    <Footer
      onCancel={() => setOutput(FOOTER_CANCEL_LABEL_DEMO)}
      cancelLabel={FOOTER_CANCEL_LABEL_DEMO}
    />
  );
};

export const DemoActions = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "Footer",
      scenario: "actions",
    },
  });

  return (
    <Footer
      actions={[
        { label: "Bar", onClick: () => setOutput("Bar") },
        {
          label: FOOTER_ACTION_LABEL_DEMO,
          onClick: () => setOutput(FOOTER_ACTION_LABEL_DEMO),
        },
        { label: "Baz", onClick: () => setOutput("Baz"), disabled: true },
      ]}
    />
  );
};

export const DemoAll = () => {
  const { setOutput, setDebugElement } = useDebug({
    test: {
      componentName: "Footer",
      scenario: "all",
    },
  });

  const [wordCount, setWordCount] = useState<number>(5);

  useEffect(() => {
    setDebugElement(
      <input
        type="number"
        value={wordCount}
        onChange={(event) => setWordCount(event.target.valueAsNumber)}
      />,
    );
  }, [wordCount]);

  return (
    <Footer
      onAccept={() => setOutput("Accept")}
      onCancel={() => setOutput("Cancel")}
      actions={[
        { label: "Bar", onClick: () => setOutput("Bar") },
        { label: "Foo", onClick: () => setOutput("Foo") },
        { label: "Baz", onClick: () => setOutput("Baz"), disabled: true },
      ]}
    >
      {faker.lorem.words(wordCount)}
    </Footer>
  );
};
