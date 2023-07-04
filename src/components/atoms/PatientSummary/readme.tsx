import * as React from "react";
import { useEffect, useState } from "react";

import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { TLayoutDirections } from "next-shared/src/types/layouts";
import { EColorScheme } from "next-shared/src/types/colorScheme";

import { PatientSummary } from ".";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoStandard = () => {
  const [layout, setLayout] = useState<TLayoutDirections>(
    TLayoutDirections.Row,
  );
  const [colorScheme, setColorScheme] = useState<EColorScheme>(
    EColorScheme.Dark,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { setActions } = useDebug({
    test: {
      componentName: "PatientSummary",
      scenario: "standard",
    },
  });

  useEffect(() => {
    setActions([
      {
        label: "Set layout to row",
        action: () => setLayout(TLayoutDirections.Row),
      },
      {
        label: "Set layout to column",
        action: () => setLayout(TLayoutDirections.Column),
      },
      {
        label: "Set scheme to light",
        action: () => setColorScheme(EColorScheme.Light),
      },
      {
        label: "Set scheme to dark",
        action: () => setColorScheme(EColorScheme.Dark),
      },
      {
        label: "Set loading to true",
        action: () => setIsLoading(true),
      },
      {
        label: "Set loading to false",
        action: () => setIsLoading(false),
      },
    ]);
  }, []);

  return (
    <div
      style={{
        background: colorScheme === EColorScheme.Dark ? "black" : "white",
      }}
    >
      <PatientSummary
        name={mockPatients[0].getDisplayName()}
        dob={mockPatients[0].fhir.birthDate}
        colorScheme={colorScheme}
        layout={layout}
        isLoading={isLoading}
      >
        <span>Children are rendered here</span>
      </PatientSummary>
    </div>
  );
};
