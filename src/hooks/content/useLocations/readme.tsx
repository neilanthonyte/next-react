import * as React from "react";
import { MemoryRouter } from "react-router";

import { useLocations } from ".";
import { LocationCard } from "../../../components/atoms/LocationCard";
import { NextAppHandlerWeb } from "../../../components/handlers/NextAppHandlerWeb";
import { List, ListItem } from "../../../components/structure/List";

const Inner = () => {
  const { locations } = useLocations();

  return (
    <List>
      {(locations || []).map((l) => (
        <ListItem key={l.slug}>
          <LocationCard location={l} />
        </ListItem>
      ))}
    </List>
  );
};

export const DemoStandard = () => {
  return (
    <div data-test="useLocations-scenario-standard">
      <NextAppHandlerWeb>
        <MemoryRouter>
          <div data-test="component">
            <Inner />
          </div>
        </MemoryRouter>
      </NextAppHandlerWeb>
    </div>
  );
};
