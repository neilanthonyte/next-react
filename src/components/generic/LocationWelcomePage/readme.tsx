import { mockMedicalStaffSessionWithAppAndPatient } from "next-shared/src/mockData/mockAuth";
import * as React from "react";
import { useEffect } from "react";

import { LocationWelcomePage } from ".";
import { useClient } from "../../../hooks/useClient";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <Inner />
    </NextAppHandlerWeb>
  );
};

const Inner = () => {
  const client = useClient();
  useEffect(() => {
    client.auth.setSession(mockMedicalStaffSessionWithAppAndPatient);
  }, []);
  return (
    <>
      <div data-test="LocationWelcomePage-scenario-standard">
        <div data-test="component">
          <LocationWelcomePage />
        </div>
      </div>
      <div data-test="LocationWelcomePage-scenario-greet">
        <div data-test="component">
          <LocationWelcomePage greetPatientInSession={true} />
        </div>
      </div>
      <div data-test="LocationWelcomePage-scenario-children">
        <div data-test="component">
          <LocationWelcomePage>
            <div>
              <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit</h4>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas
                veniam, nam incidunt voluptatem quis deleniti reprehenderit in
                quisquam facere eius quaerat mollitia nemo fugiat odit vel
                corporis. Debitis, explicabo voluptate.
              </p>
            </div>
          </LocationWelcomePage>
        </div>
      </div>
    </>
  );
};
