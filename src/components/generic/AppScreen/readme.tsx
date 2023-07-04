import * as React from "react";
import * as _ from "lodash";
import * as faker from "faker";

import { AppScreen, AppScreenHeader, AppScreenBody, AppScreenFooter } from ".";

export const DemoStandard = () => {
  return (
    <AppScreen>
      <AppScreenHeader>
        <h1 style={{ background: "pink" }}>Welcome</h1>
      </AppScreenHeader>
      <AppScreenBody>
        {_.times(20, (index) => (
          <p key={index}>{faker.lorem.words(50)}</p>
        ))}
      </AppScreenBody>
      <AppScreenFooter>
        <div style={{ background: "orange" }}>The footer</div>
      </AppScreenFooter>
    </AppScreen>
  );
};
