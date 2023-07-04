import * as React from "react";
import { useState } from "react";
import { MemoryRouter } from "react-router";

import { Button, AltButton, BlockButton, TButtonVariant } from ".";
import { HStack } from "../../structure/HStack";
import { VStack } from "../../structure/VStack";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { ErrorBoundary } from "../../structure/ErrorBoundary";
import { delay } from "../../../helpers/delay";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoStandard = () => {
  const sizes = [null, "xs", "sm", "md", "lg"];
  const variants = ["primary", "secondary"];
  const style = { display: "inline-block", padding: "0 5px 5px 0" };

  const onClick = () => {
    return;
  };

  return (
    <VStack>
      <div>
        <Button onClick={onClick}>Default</Button>{" "}
        <AltButton onClick={onClick}>AltButton</AltButton>{" "}
        <Button disabled={true}>Disabled</Button>
      </div>
      <div>
        <Button onClick={onClick} icon="close">
          With icon
        </Button>
        <AltButton onClick={onClick} icon="close">
          With icon
        </AltButton>
      </div>
      <BlockButton>BlockButton</BlockButton>
      <>
        {variants.map((s) => (
          <span key={s} style={style}>
            <Button onClick={onClick} variant={s as TButtonVariant}>
              {s}
            </Button>
          </span>
        ))}
      </>
      <>
        {sizes.map((s) => (
          <span key={s} style={style}>
            <Button onClick={onClick} size={s as EStandardSizes}>
              {s || "default"}
            </Button>
            <Button size={s as EStandardSizes} label="label">
              {s || "default"}
            </Button>
          </span>
        ))}
      </>
      <h3>Variants</h3>
      <div>
        {Object.values(TColorVariants).map((v: TColorVariants) => (
          <span key={v}>
            <Button onClick={onClick} status={v}>
              {v || "default"}
            </Button>{" "}
          </span>
        ))}
      </div>
      <HStack>
        <BlockButton onClick={onClick} badge={10}>
          Text
        </BlockButton>
        <br />
        <BlockButton onClick={onClick} variant="secondary" badge={5}>
          Button
        </BlockButton>
      </HStack>
    </VStack>
  );
};

export const DemoLinkButton = () => {
  return (
    <MemoryRouter>
      <div>
        <Button to={"/"}>Home</Button> <AltButton to={"/"}>Home</AltButton>
      </div>
    </MemoryRouter>
  );
};

export const DemoConfirmation = () => {
  const [action, setAction] = useState<string>();
  return (
    <>
      <Button onClick={() => setAction("confirmed 1")} shouldConfirm={true}>
        Default
      </Button>{" "}
      <Button
        onClick={() => setAction("confirmed 2")}
        shouldConfirm={{
          title: "Sit in irure consectetur sit.",
          description:
            "Id eu exercitation minim ea Lorem nulla aliquip magna. Minim id sint",
        }}
      >
        Custom text
      </Button>
      <div className="debug">{action}</div>
    </>
  );
};

export const DemoClickBehaviour = () => {
  return (
    <>
      <Button
        onClick={() =>
          new Promise((res) => {
            setTimeout(() => res(true), 1500);
          })
        }
      >
        Disable on success (default)
      </Button>{" "}
      <Button
        disableOnSuccess={false}
        onClick={() =>
          new Promise((res) => {
            setTimeout(() => res(true), 1500);
          })
        }
      >
        Re-enabled on success
      </Button>{" "}
      <Button
        onClick={() =>
          new Promise((res, rej) => {
            setTimeout(() => rej(), 1500);
          })
        }
      >
        Enabled on error (default)
      </Button>{" "}
      <Button
        disableOnError={true}
        onClick={() =>
          new Promise((res, rej) => {
            setTimeout(() => rej(), 1500);
          })
        }
      >
        Disabled on error
      </Button>
    </>
  );
};

async function thisThrows() {
  await delay(500);
  throw new Error("Thrown from thisThrows()");
}

export const DemoPromiseSupport = () => {
  const { setOutput } = useDebug();
  const [status, setStatus] = useState("original");
  const obj = {};
  // @ts-ignore
  obj.then = (f) => {
    setTimeout(() => {
      setStatus("updated");
      f();
    }, 1500);
  };

  return (
    <>
      <Button
        onClick={() =>
          new Promise((res) => {
            setTimeout(() => res(true), 1500);
          })
        }
      >
        Promise resolve
      </Button>{" "}
      <AltButton
        onClick={() =>
          new Promise((res, rej) => {
            setTimeout(() => rej(true), 1500);
          }).catch(() => {
            setOutput("responding to Promise.error");
          })
        }
      >
        Promise reject
      </AltButton>{" "}
      <ErrorBoundary>
        <Button
          onClick={async () => {
            try {
              return await thisThrows();
            } catch (e) {
              setOutput("responding to error");
              throw e;
            }
          }}
        >
          Promise throws error
        </Button>
      </ErrorBoundary>{" "}
      <Button onClick={() => obj}>Custom promise</Button>
      <div className="debug">{status}</div>
    </>
  );
};

export const DemoChevron = () => {
  useDebug({
    test: { componentName: "Button", scenario: "chevron" },
  });

  return (
    <Button
      showChevron={true}
      onClick={() => {
        return;
      }}
    >
      Action
    </Button>
  );
};

export const DemoOptions = () => {
  useDebug({
    test: { componentName: "Button", scenario: "options" },
  });

  return (
    <Button
      hasOptions={true}
      onClick={() => {
        return;
      }}
    >
      Action
    </Button>
  );
};

export const DemoOptionsInteractive = () => {
  const { setOutput } = useDebug({
    test: { componentName: "Button", scenario: "options-interactive" },
  });

  return (
    <Button
      hasOptions={true}
      onClick={() => setOutput("default")}
      onOptionsMenuClick={() => setOutput("options")}
    >
      Action
    </Button>
  );
};
