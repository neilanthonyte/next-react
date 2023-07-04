import * as React from "react";
import { AgentUserConfigForm } from "./index";
import { useState } from "react";

const exampleConfig = {};

export const Demo: React.FC = () => {
  const [config, setConfig] = useState<any>(exampleConfig);

  return (
    <div>
      <AgentUserConfigForm
        config={config}
        onCancel={() => alert("cancelled")}
        onSave={setConfig}
      />
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </div>
  );
};
