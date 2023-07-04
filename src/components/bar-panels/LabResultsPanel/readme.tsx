import * as React from "react";
import { useEffect } from "react";

import { mockMedicalStaffSession } from "next-shared/src/mockData/mockAuth";

import { ActiveTimeHandler } from "../../handlers/ActiveTimeHandler";
import { addParamsToUrl } from "../../../helpers/addParamsToUrl";
import { useClient } from "../../../hooks/useClient";
import { MockNextBarHandler } from "../../handlers/MockNextBarHandler";
import { LabResultsPanel } from "./";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoStandard: React.FC = () => {
  const { setDebugElement } = useDebug({ isFixed: false });
  const client = useClient();

  useEffect(() => client.auth.setSession(mockMedicalStaffSession), []);

  useEffect(() => {
    setDebugElement(
      <div className="debug">
        <ul>
          <li>
            Add <code>?debugClientMethodsError=</code>{" "}
            <a
              href={addParamsToUrl({
                debugClientMethodsError: [
                  "patients.releaseLabResult",
                  "patients.unreleaseLabResult",
                ],
                debugErrorApproach: "reject",
              })}
            >
              (add now)
            </a>
            <a
              href={addParamsToUrl({
                debugClientMethodsError: undefined,
                debugErrorApproach: undefined,
              })}
            >
              (remove now)
            </a>
          </li>
        </ul>
      </div>,
    );
  }, []);

  return (
    <MockNextBarHandler>
      <ActiveTimeHandler>
        <LabResultsPanel />
      </ActiveTimeHandler>
    </MockNextBarHandler>
  );
};
