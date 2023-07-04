import * as React from "react";
import { MemoryRouter } from "react-router";
import * as faker from "faker";
import * as _ from "lodash";

import {
  List,
  ListItem,
  ListItemWrapper,
  ListItemBody,
  ListItemExtras,
} from ".";
import { VStack } from "../VStack";

export const DemoStandard = () => {
  return (
    <MemoryRouter>
      <div style={{ width: "300px" }}>
        <List>
          <ListItem>{faker.lorem.words(3)}</ListItem>
          <ListItem>{faker.lorem.words(3)}</ListItem>
          <ListItem>{faker.lorem.words(3)}</ListItem>
          <ListItem isActive={true}>Active</ListItem>
          <ListItem badge={3}>With badge</ListItem>
          <ListItem isActive={true} badge={10}>
            Active with badge
          </ListItem>
          <ListItem to="#foo">Navigation based</ListItem>
        </List>
      </div>
    </MemoryRouter>
  );
};

export const DemoVariations = () => {
  return (
    <VStack>
      <h4>Plain</h4>
      <List>
        {_.times(10, (i) => (
          <ListItem isActive={i === 2}>{faker.lorem.words(3)}</ListItem>
        ))}
      </List>
      <h4>With numbers</h4>
      <List withNumbers={true}>
        {_.times(10, (i) => (
          <ListItem isActive={i === 2}>{faker.lorem.words(3)}</ListItem>
        ))}
      </List>
      <h4>Separator</h4>
      <List variant={"separator"}>
        {_.times(10, (i) => (
          <ListItem isActive={i === 2}>{faker.lorem.words(3)}</ListItem>
        ))}
      </List>
      <h4>Compact</h4>
      <List scale={"compact"}>
        {_.times(10, (i) => (
          <ListItem isActive={i === 2} badge={i}>
            {faker.lorem.words(3)}
          </ListItem>
        ))}
      </List>
      <h4>Mixed</h4>
      <List variant={"separator"} scale={"compact"} withNumbers={true}>
        {_.times(10, (i) => (
          <ListItem isActive={i === 2}>{faker.lorem.words(3)}</ListItem>
        ))}
      </List>
    </VStack>
  );
};

export const DemoCustomItems = () => {
  return (
    <List>
      <ListItemWrapper isActive={true}>
        <ListItemBody>{faker.lorem.words(4)}</ListItemBody>
        <ListItemExtras>
          <button>Extra</button>
        </ListItemExtras>
      </ListItemWrapper>
      <ListItemWrapper>
        <ListItemBody>{faker.lorem.words(4)}</ListItemBody>
        <ListItemExtras>
          <button>Extra</button>
        </ListItemExtras>
      </ListItemWrapper>
    </List>
  );
};
