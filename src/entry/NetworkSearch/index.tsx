import * as React from "react";
import { MemoryRouter } from "react-router";

import { Search } from "next-react/src/components/search/Search";
import { NextAppHandlerWeb } from "next-react/src/components/handlers/NextAppHandlerWeb";

import { GeoHandler } from "../../handlers/GeoHandler";
import { SearchHandler } from "../../handlers/SearchHandler";

export interface INetworkSearchProps {}

/**
 * Self contained Next Search component.
 */
export const NetworkSearch: React.FC<INetworkSearchProps> = ({}) => {
  return (
    <MemoryRouter>
      <NextAppHandlerWeb>
        <GeoHandler>
          <SearchHandler>
            <Search />
          </SearchHandler>
        </GeoHandler>
      </NextAppHandlerWeb>
    </MemoryRouter>
  );
};
