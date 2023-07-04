import * as React from "react";

import { HStack, Solid } from "../../structure/HStack";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { MedicalArticleSideBar, MedicalArticleView } from ".";
import { MemoryRouter } from "react-router";

export const DemoStandard = () => {
  return (
    <MemoryRouter>
      <NextAppHandlerWeb>
        <HStack>
          <Solid>
            <div style={{ width: "200px" }}>
              <MedicalArticleSideBar />
            </div>
          </Solid>
          <MedicalArticleView />
        </HStack>
      </NextAppHandlerWeb>
    </MemoryRouter>
  );
};
