import * as React from "react";
import { useState } from "react";

import { PatientLogOutModal } from ".";

export const DemoStandard = () => {
  const [result, setResult] = useState<string>();
  const [show, setshow] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setshow(true)}>Show</button>
      <PatientLogOutModal
        open={show}
        onDismiss={() => setResult("dismiss")}
        onLogOut={() => setResult("logout")}
      />
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};
