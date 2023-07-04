import * as React from "react";
import { useState } from "react";

import { ICredentials, LoginForm } from ".";
import { addParamsToUrl } from "../../../helpers/addParamsToUrl";

export const DemoStandard = () => {
  const [result, setResult] = useState<ICredentials>();

  return (
    <>
      <LoginForm onSubmit={(data) => setResult(data)} />
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};
