import * as React from "react";
import { useState } from "react";

import { FormSideBar } from ".";

export const DemoStandard = () => {
  const [result, setResult] = useState();
  return (
    <>
      <FormSideBar />
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};
