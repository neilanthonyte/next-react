import * as React from "react";
import { Form } from "../../../components/forms/Form";

import { agentUserConfigFormSchema } from "./schema";

export interface IAgentUserConfigFormProps {
  config: any;
  onCancel(): void;
  onSave(newUserConfig: any): void;
}

export const AgentUserConfigForm: React.FC<IAgentUserConfigFormProps> = ({
  config,
  onCancel,
  onSave,
}) => {
  return (
    <Form
      schema={agentUserConfigFormSchema}
      data={config}
      onCancel={onCancel}
      onSuccess={onSave}
      submitLabel="Save configuration"
    />
  );
};
