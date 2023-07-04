import * as React from "react";
import { useCallback, useContext, useMemo } from "react";

import { IFormField } from "next-shared/src/types/formTypes";

import { Form } from "../../../../components/forms/Form";
import {
  Modal,
  ModalBody,
  ModalHeader,
} from "../../../../components/structure/Modal";
import { addParamsToUrl } from "../../../../helpers/addParamsToUrl";
import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";
import { ConfigContext } from "../../../../contexts/ConfigContext";
import { AppConfig, IAppConfig } from "next-shared/src/models/AppConfig";

const formFields: IFormField[] = [
  {
    label: "Use Real Client?",
    map: "useRealClient",
    type: "boolean",
  },
  {
    label: "Mock Patient?",
    map: "debugMockPatient",
    type: "options",
    variant: "inline",
    options: [
      { label: "New", value: "new" },
      { label: "Existing", value: "existing" },
    ],
  },
  {
    label: "Fill Email",
    description: "Set using the environment variable: DEBUG_FILL_EMAIL",
    map: "debugFillEmail",
    type: "text",
  },
  {
    label: "Fill Phone",
    description: "Set using the environment variable: DEBUG_FILL_PHONE",
    map: "debugFillPhone",
    type: "text",
  },
  {
    label: "Chaos Probability",
    description:
      "0 = 0% (no calls purposefully fail), 1 = 100% (all calls fail)",
    map: "debugChaosProbability",
    type: "number",
    minValue: 0,
    maxValue: 1,
  },
  {
    label: "Request Error Count",
    description:
      "The number of failed requests before it reverts to expected behaviour",
    map: "debugRequestErrorCount",
    type: "number",
    incrementValue: 1,
  },
  {
    label: "Client Methods Error",
    description:
      "A subset of client methods to test - otherwise all will be altered.",
    map: "debugClientMethodsError",
    type: "text",
    allowMultiple: true,
  },
  {
    label: "Session ID",
    map: "debugSessionId",
    type: "text",
  },
];

export interface IDemoSettingsModalProps {
  open: boolean;
  onClose: () => any;
}

export const DemoSettingsModal: React.FC<IDemoSettingsModalProps> = ({
  open,
  onClose,
}) => {
  const { config } = useContext(ConfigContext);
  const onSuccess = useCallback((data: any) => {
    window.location.href = addParamsToUrl(data, false);
  }, []);

  const data: IAppConfig = useMemo(() => config.serialize(), [config]);

  return (
    <Modal open={open} onClose={onClose}>
      <ModalHeader>Demo settings</ModalHeader>
      <ModalBody>
        <p>
          The following settings are controlled via the URL params to make it
          easier to capture a particular test setting.
        </p>
        <Form data={data} schema={formFields} onSuccess={onSuccess} />
      </ModalBody>
    </Modal>
  );
};
