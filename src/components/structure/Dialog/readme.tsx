import React from "react";
import faker from "faker";

import { useDebug } from "../../../debug/DemoWrapper";
import { Dialog, DialogHeader, DialogBody, DialogFooter } from ".";
import { TDialogSizes } from "next-shared/src/types/dialogs";

export const DemoStandard = () => {
  useDebug({ test: { componentName: "Dialog", scenario: "standard" } });

  return (
    <Dialog>
      <DialogHeader>Abnormal message</DialogHeader>
      <DialogBody>
        <p>{faker.lorem.words(20)}</p>
        <p>{faker.lorem.words(20)}</p>
      </DialogBody>
    </Dialog>
  );
};

export const DemoPresetSizes = () => {
  useDebug({ test: { componentName: "Dialog", scenario: "sizes" } });

  return Object.values(TDialogSizes).map((size) => (
    <Dialog size={size} key={size}>
      <DialogHeader>{size}</DialogHeader>
      <DialogBody>
        <p>{faker.lorem.words(20)}</p>
      </DialogBody>
    </Dialog>
  ));
};

export const DemoAccept = () => {
  const { setOutput } = useDebug({
    test: { componentName: "Dialog", scenario: "accept" },
  });

  return (
    <Dialog>
      <DialogHeader>With accept</DialogHeader>
      <DialogBody>
        <p>{faker.lorem.words(20)}</p>
        <p>{faker.lorem.words(20)}</p>
      </DialogBody>

      <DialogFooter onAccept={() => setOutput("Accept")} />
    </Dialog>
  );
};

export const DemoCancel = () => {
  const { setOutput } = useDebug({
    test: { componentName: "Dialog", scenario: "cancel" },
  });

  return (
    <Dialog>
      <DialogHeader>With cancel</DialogHeader>
      <DialogBody>
        <p>{faker.lorem.words(20)}</p>
        <p>{faker.lorem.words(20)}</p>
      </DialogBody>
      <DialogFooter onCancel={() => setOutput("Cancel")} />
    </Dialog>
  );
};

export const DemoActions = () => {
  const { setOutput } = useDebug({
    test: { componentName: "Dialog", scenario: "actions" },
  });

  return (
    <Dialog>
      <DialogHeader>With actions</DialogHeader>
      <DialogBody>
        <p>{faker.lorem.words(20)}</p>
        <p>{faker.lorem.words(20)}</p>
      </DialogBody>
      <DialogFooter
        onCancel={() => setOutput("Cancel")}
        onAccept={() => setOutput("Accept")}
        actions={[
          { label: "No", onClick: () => setOutput("No") },
          { label: "Yes", onClick: () => setOutput("Yes") },
        ]}
      />
    </Dialog>
  );
};

export const DemoFooterChildren = () => {
  const { setOutput } = useDebug({
    test: { componentName: "Dialog", scenario: "footer-children" },
  });

  return (
    <Dialog>
      <DialogHeader>With children in footer</DialogHeader>
      <DialogBody>
        <p>{faker.lorem.words(20)}</p>
        <p>{faker.lorem.words(20)}</p>
      </DialogBody>
      <DialogFooter
        onCancel={() => setOutput("Cancel")}
        onAccept={() => setOutput("Accept")}
        actions={[
          { label: "No", onClick: () => setOutput("No") },
          { label: "Yes", onClick: () => setOutput("Yes") },
        ]}
      >
        <p>{faker.lorem.words(20)}</p>
      </DialogFooter>
    </Dialog>
  );
};

export const DemoFooterSticky = () => {
  useDebug({
    test: { componentName: "Dialog", scenario: "footer-sticky" },
  });

  return (
    <Dialog>
      <DialogHeader>With sticky footer</DialogHeader>
      <DialogBody>
        <p>{faker.lorem.paragraphs(7)}</p>
        <p>{faker.lorem.paragraphs(7)}</p>
      </DialogBody>
      <DialogFooter
        isSticky={true}
        onCancel={() => false}
        onAccept={() => true}
      />
    </Dialog>
  );
};
