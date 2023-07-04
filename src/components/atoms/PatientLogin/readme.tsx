import * as React from "react";

import { PatientLogin } from ".";

export const DemoStandard = () => {
  return (
    <>
      <div style={{ maxWidth: "440px", border: "2px solid blue" }}>
        <PatientLogin />
      </div>
      <div className="debug"></div>
    </>
  );
};
