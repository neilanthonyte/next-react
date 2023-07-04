import * as React from "react";
import { useState } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { SearchInput } from ".";

export const DemoStandard = () => {
  const [result, setResult] = useState<string>();
  return (
    <>
      <div>
        <SearchInput onChange={setResult} value={result} />
        <p>
          Selected: {`"`}
          <span data-test="output">{result}</span>
          {`"`}
          <br />
          <a onClick={() => setResult("")}>Clear</a>
        </p>
      </div>
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};

export const DemoSizes = () => {
  const [result, setResult] = useState<string>();
  return Object.values(EStandardSizes).map((size) => (
    <SearchInput
      onChange={setResult}
      key={size}
      value={result}
      stdSize={size}
    />
  ));
};

export const DemoKeypad = () => {
  const [result, setResult] = useState<string>();
  return (
    <>
      <div>
        <SearchInput
          onChange={(value) => {
            setResult(value);
          }}
          value={result}
          keypadOptions={[{ label: "a", value: "a" }]}
        />
        <p>
          Selected: {`"`}
          <span data-test="output">{result}</span>
          {`"`}
          <br />
          <a onClick={() => setResult("")}>Clear</a>
        </p>
      </div>
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};
