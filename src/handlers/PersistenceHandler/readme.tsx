import * as React from "react";
import { useState } from "react";

import { PersistenceHandler } from ".";
import { useRequiredContext } from "../../hooks/useRequiredContext";
import { PersistenceContext } from "../../contexts/PersistenceContext";

export const PersistenceDebug: React.FC = () => {
  const [value, setValue] = useState<any>();

  const { getItem, setItem, removeItem } =
    useRequiredContext(PersistenceContext);

  return (
    <>
      <h4>Persistence debug</h4>
      <ul>
        <li>
          <span>
            Test value in local storage: {value}{" "}
            <a
              onClick={async () =>
                setValue(JSON.stringify(await getItem("test")))
              }
            >
              (get value now)
            </a>
          </span>
        </li>
        <li>
          <span>
            Add 1 to count{" "}
            <a
              onClick={async () => {
                const item = await getItem("test");
                await setItem("test", JSON.stringify(+item + 1));
              }}
            >
              (set value now)
            </a>
          </span>
        </li>
        <li>
          <span>Remove count </span>
          <a onClick={async () => await removeItem("test")}>(remove value)</a>
        </li>
      </ul>
    </>
  );
};

export const Demo: React.FC = () => {
  return (
    <PersistenceHandler>
      <PersistenceDebug />
    </PersistenceHandler>
  );
};
