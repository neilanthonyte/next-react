import * as React from "react";
import { useEffect, useState } from "react";

import { useDebug } from "../../../debug/DemoWrapper";
import { SingleOptionsInput } from "../../inputs/SingleOptionsInput";
import { EFilterType, Filter } from ".";

// used for integration tests
export const FILTER_TYPE_ACTION = "type";
export const FILTER_VALUE_DEMO = "Yellow";

export const DemoStandard = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "Filter",
      scenario: "standard",
    },
  });

  const [filter, setFilter] = useState<string>();
  const [type, setType] = useState<EFilterType>(EFilterType.Primary);

  useEffect(() => {
    setActions([
      {
        label: `Toggle type - currently ${type}`,
        action: () =>
          setType((t) =>
            t === EFilterType.Primary
              ? EFilterType.Secondary
              : EFilterType.Primary,
          ),
        test: FILTER_TYPE_ACTION,
      },
    ]);
  }, [type]);

  return (
    <Filter
      label={`Color: ${filter || "any"}`}
      type={type}
      value={filter}
      onChange={(newVal) => {
        setOutput(newVal);
        setFilter(newVal);
      }}
      onClear={() => setFilter(undefined)}
      renderInput={(props) => (
        <div data-test="options-input">
          <SingleOptionsInput
            options={["Blue", "Green", FILTER_VALUE_DEMO]}
            {...props}
          />
        </div>
      )}
    />
  );
};
