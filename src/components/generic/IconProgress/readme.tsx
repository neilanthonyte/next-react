import * as React from "react";

import { IconProgress } from ".";

export const DemoStandard = () => {
  return (
    <div style={{ backgroundColor: "black" }}>
      <IconProgress
        icons={[
          "clinics",
          "doctor-solid",
          "resources",
          "appointments-solid",
          "manage",
        ]}
        step={1}
      />
    </div>
  );
};
