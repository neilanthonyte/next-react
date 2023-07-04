import * as React from "react";
import { useState } from "react";

import { ScrollableBar } from "./";

const Item = () => (
  <span
    style={{
      height: "50px",
      minWidth: "50px",
      backgroundColor: "lightgrey",
      border: "1px solid black",
      textAlign: "center",
      display: "block",
      margin: "0 1em",
    }}
  >
    Item
  </span>
);

export const DemoDynamic: React.FC = () => {
  const [array, setArray] = useState(Array(12).fill(null));
  return (
    <div>
      <ScrollableBar showScrollbar="dynamic">
        {array.map((_, i) => (
          <Item key={i} />
        ))}
      </ScrollableBar>
      <button onClick={() => setArray((old) => [null].concat(old))}>
        Add Item
      </button>
      <button onClick={() => setArray((old) => old.slice(1))}>
        Remove Item
      </button>
    </div>
  );
};

export const DemoNever: React.FC = () => {
  const [array, setArray] = useState(Array(12).fill(null));
  return (
    <div>
      <ScrollableBar showScrollbar="never">
        {array.map((_, i) => (
          <Item key={i} />
        ))}
      </ScrollableBar>
      <button onClick={() => setArray((old) => [null].concat(old))}>
        Add Item
      </button>
      <button onClick={() => setArray((old) => old.slice(1))}>
        Remove Item
      </button>
    </div>
  );
};

export const DemoAlways: React.FC = () => {
  const [array, setArray] = useState(Array(12).fill(null));
  return (
    <div>
      <ScrollableBar showScrollbar="always">
        {array.map((_, i) => (
          <Item key={i} />
        ))}
      </ScrollableBar>
      <button onClick={() => setArray((old) => [null].concat(old))}>
        Add Item
      </button>
      <button onClick={() => setArray((old) => old.slice(1))}>
        Remove Item
      </button>
    </div>
  );
};
