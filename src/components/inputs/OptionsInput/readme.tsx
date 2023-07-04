import * as React from "react";
import { useMemo, useState } from "react";
import faker from "faker";
import { uniq } from "lodash";

import { OptionsInput } from ".";
import { VStack } from "../../structure/VStack";

export const DemoIcons = () => {
  const [result, setResult] = useState(null);

  const options = [
    {
      label: "Medications",
      icon: "medications",
      value: "medications",
    },
    {
      label: "Medical article",
      icon: "education",
      value: "Education",
    },
    {
      label: "Something with a long label",
      icon: "lotus",
      value: "Something",
    },
    {
      label: "Missing icon",
      value: "Missing icon",
    },
  ];

  return (
    <div data-test="OptionsInput-scenario-standard">
      <div data-test="component">
        <OptionsInput
          options={options}
          value={result}
          onInputChange={setResult}
          variant="icons"
        />
      </div>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export const DemoDropdown = () => {
  const [result, setResult] = useState(null);

  const words = useMemo(() => uniq(faker.lorem.words(10).split(" ")), []);

  return (
    <div data-test="OptionsInput-scenario-standard">
      <div data-test="component">
        <OptionsInput
          options={words}
          value={result}
          onInputChange={setResult}
          variant="dropdown"
        />
      </div>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export const DemoMultiDropdown = () => {
  const [result, setResult] = useState(null);

  const words = useMemo(() => uniq(faker.lorem.words(10).split(" ")), []);

  return (
    <div data-test="OptionsInput-scenario-standard">
      <div data-test="component">
        <OptionsInput
          options={words}
          value={result}
          onInputChange={setResult}
          allowMultiple={true}
          variant="dropdown"
        />
      </div>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export const DemoVariations = () => {
  const [result, setResult] = useState(null);

  const words = useMemo(() => uniq(faker.lorem.words(10).split(" ")), []);

  return (
    <div data-test="OptionsInput-scenario-grid">
      <div data-test="component">
        <VStack>
          <OptionsInput
            options={words}
            value={result}
            onInputChange={setResult}
            variant="grid"
          />
          <OptionsInput
            options={words}
            value={result}
            onInputChange={setResult}
            variant="inline"
          />
          <OptionsInput
            options={words}
            value={result}
            onInputChange={setResult}
            allowMultiple={true}
            variant="dropdown"
          />
        </VStack>
      </div>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export const DemoInlineMultiple = () => {
  const [result, setResult] = useState(null);

  const words = useMemo(() => uniq(faker.lorem.words(10).split(" ")), []);

  return (
    <div data-test="OptionsInput-scenario-standard">
      <div data-test="component">
        <OptionsInput
          options={words}
          value={result}
          onInputChange={setResult}
          allowMultiple={true}
          variant="inline"
        />
      </div>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export const DemoDots = () => {
  const [result, setResult] = useState(null);

  const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div data-test="OptionsInput-scenario-standard">
      <div data-test="component">
        <OptionsInput
          options={daysOfMonth}
          value={result}
          onInputChange={setResult}
          variant="dots"
        />
      </div>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult(null)}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};

export const DemoDotsMultiple = () => {
  const [result, setResult] = useState<number[]>([]);

  const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div data-test="OptionsInput-scenario-standard">
      <div data-test="component">
        <OptionsInput
          options={daysOfMonth}
          value={result}
          onInputChange={setResult}
          allowMultiple={true}
          variant="dots"
        />
      </div>
      <div className="debug">
        Actions:{" "}
        <a data-test="reset" onClick={() => setResult([])}>
          reset
        </a>
        <br />
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
      </div>
    </div>
  );
};
