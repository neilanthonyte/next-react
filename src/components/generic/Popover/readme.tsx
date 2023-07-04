import * as React from "react";
import { useState } from "react";

import { Popover } from ".";

export const DemoSimple: React.FC = () => {
  const [open, setOpen] = useState(false);

  const target = (
    <button data-test="test-button" onClick={() => setOpen(true)}>
      Click me to open Popover
    </button>
  );

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      data-test="Popover-scenario-standard"
    >
      <Popover open={open} closeHandler={() => setOpen(false)} target={target}>
        <div>This is the body of the Popover</div>
      </Popover>
    </div>
  );
};

export const DemoBody: React.FC = () => {
  const [open, setOpen] = useState(false);

  const target = (
    <button data-test="test-button" onClick={() => setOpen(true)}>
      Click me to open Popover
    </button>
  );

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Popover open={open} closeHandler={() => setOpen(false)} target={target}>
        <div>
          <h2>Popover</h2>
          <div>
            <p>This is a more complex example of Popover body content</p>
            <br />
            <p>It shows the kind of content you can place in the body.</p>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <img src="https://www.fillmurray.com/100/100" />
              <form>
                <label htmlFor="foo">Foo:</label>
                <input type="radio" id="foo" name="foo" />
                <label htmlFor="bar">Bar:</label>
                <input type="radio" id="bar" name="bar" />
              </form>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export const DemoForcePosition: React.FC = () => {
  const [open, setOpen] = useState(false);

  const target = (
    <button data-test="test-button" onClick={() => setOpen(true)}>
      Click me to open Popover
    </button>
  );

  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        border: "1px solid black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Popover
        open={open}
        closeHandler={() => setOpen(false)}
        target={target}
        placement={{ position: "above", force: true }}
      >
        <div>
          This popover will always stay above the target regardless of if it has
          space.
        </div>
      </Popover>
    </div>
  );
};
