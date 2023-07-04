import * as React from "react";
import { MemoryRouter } from "react-router";

import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { Search } from ".";
import { GeoHandler } from "../../../handlers/GeoHandler";
import { SearchHandler } from "../../../handlers/SearchHandler";

export const Demo: React.FC = () => {
  return (
    <NextAppHandlerWeb>
      <MemoryRouter>
        <GeoHandler>
          <SearchHandler>
            <div
              data-test="Search-scenario-standard"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "500px",
              }}
            >
              <Search />
            </div>
          </SearchHandler>
        </GeoHandler>
      </MemoryRouter>
    </NextAppHandlerWeb>
  );
};
