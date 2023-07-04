import * as React from "react";
import { useState } from "react";
import { MemoryRouter } from "react-router";

import {
  Resource,
  ResourceHeader,
  ResourceType,
  ResourceBody,
  ResourceActions,
  ResourceAction,
  ResourceFooter,
  ResourceActionAlt,
  ResourceContent,
  ResourceSource,
} from ".";
import { VStack } from "../../structure/VStack";
import { PendingStyleDebug } from "../../debug/PendingStyleDebug";
import { Grid } from "../../structure/Grid";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoStandard = () => {
  useDebug({ test: { componentName: "Resource", scenario: "standard" } });
  return (
    <Resource>
      <ResourceHeader>
        <ResourceType>Resource Type</ResourceType>
      </ResourceHeader>
      <ResourceBody>
        <ResourceContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iusto
          fugit at, nisi possimus iure! Cupiditate, consequatur iste! Aliquid
          unde modi voluptas nemo! Nesciunt ea veritatis est iste atque
          inventore!
        </ResourceContent>
      </ResourceBody>
    </Resource>
  );
};

export const DemoIcon = () => {
  useDebug({ test: { componentName: "Resource", scenario: "icon" } });
  return (
    <Resource>
      <ResourceHeader icon="alcohol">
        <ResourceType>Resource Type</ResourceType>
      </ResourceHeader>
      <ResourceBody>
        <ResourceContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iusto
          fugit at, nisi possimus iure! Cupiditate, consequatur iste! Aliquid
          unde modi voluptas nemo! Nesciunt ea veritatis est iste atque
          inventore!
        </ResourceContent>
      </ResourceBody>
    </Resource>
  );
};

export const DemoHeaderAction = () => {
  const { setOutput } = useDebug({
    test: { componentName: "Resource", scenario: "header" },
  });

  return (
    <Resource>
      <ResourceHeader
        icon="alcohol"
        action={{ label: "Edit", onClick: () => setOutput("headerAction") }}
      >
        <ResourceType>Resource Type</ResourceType>
      </ResourceHeader>
      <ResourceBody>
        <ResourceContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iusto
          fugit at, nisi possimus iure! Cupiditate, consequatur iste! Aliquid
          unde modi voluptas nemo! Nesciunt ea veritatis est iste atque
          inventore!
        </ResourceContent>
      </ResourceBody>
    </Resource>
  );
};

export const DemoSelectable = () => {
  useDebug({
    test: { componentName: "Resource", scenario: "selectable" },
  });
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <Resource onSelect={() => setIsSelected((s) => !s)} isSelected={isSelected}>
      <ResourceHeader icon="alcohol">
        <ResourceType>Resource Type</ResourceType>
      </ResourceHeader>
      <ResourceBody>
        <ResourceContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque iusto
          fugit at, nisi possimus iure! Cupiditate, consequatur iste! Aliquid
          unde modi voluptas nemo! Nesciunt ea veritatis est iste atque
          inventore!
        </ResourceContent>
      </ResourceBody>
    </Resource>
  );
};

export const DemoFooter = () => {
  const { setOutput } = useDebug({
    test: { componentName: "Resource", scenario: "footer" },
  });

  return (
    <VStack>
      <Resource>
        <ResourceHeader icon="alcohol">
          <ResourceType>Alcohol</ResourceType>
        </ResourceHeader>
        <ResourceBody>
          <ResourceContent>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
            consequuntur atque iure incidunt labore tempore, deserunt voluptate
            quis delectus aut vel nisi! Ad harum ullam aperiam, adipisci quae in
            blanditiis.
          </ResourceContent>
        </ResourceBody>
        <ResourceFooter>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          autem quasi ipsum fugiat
        </ResourceFooter>
      </Resource>
      <Resource>
        <ResourceHeader icon="alcohol">
          <ResourceType>Alcohol</ResourceType>
        </ResourceHeader>
        <ResourceBody>
          <ResourceContent>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
            consequuntur atque iure incidunt labore tempore, deserunt voluptate
            quis delectus aut vel nisi! Ad harum ullam aperiam, adipisci quae in
            blanditiis.
          </ResourceContent>
        </ResourceBody>
        <ResourceFooter
          action={{
            label: "Details",
            onClick: () => setOutput("footerAction"),
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          autem quasi ipsum fugiat
        </ResourceFooter>
      </Resource>
      <Resource>
        <ResourceHeader icon="alcohol">
          <ResourceType>Alcohol</ResourceType>
        </ResourceHeader>
        <ResourceBody>
          <ResourceContent>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
            consequuntur atque iure incidunt labore tempore, deserunt voluptate
            quis delectus aut vel nisi! Ad harum ullam aperiam, adipisci quae in
            blanditiis.
          </ResourceContent>
        </ResourceBody>
        <ResourceFooter
          action={{
            label: "Details",
            onClick: () => setOutput("footerAction"),
          }}
        />
      </Resource>
    </VStack>
  );
};

export const DemoSource = () => {
  useDebug({
    test: { componentName: "Resource", scenario: "source" },
  });
  return (
    <VStack>
      <Resource>
        <ResourceBody>
          <ResourceContent>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
            consequuntur atque iure incidunt labore tempore, deserunt voluptate
            quis delectus aut vel nisi! Ad harum ullam aperiam, adipisci quae in
            blanditiis.
          </ResourceContent>
        </ResourceBody>
        <ResourceSource title="Resource title" />
      </Resource>
      <Resource>
        <ResourceBody>
          <ResourceContent>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
            consequuntur atque iure incidunt labore tempore, deserunt voluptate
            quis delectus aut vel nisi! Ad harum ullam aperiam, adipisci quae in
            blanditiis.
          </ResourceContent>
        </ResourceBody>
        <ResourceSource description="Resource description" />
      </Resource>
      <Resource>
        <ResourceBody>
          <ResourceContent>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
            consequuntur atque iure incidunt labore tempore, deserunt voluptate
            quis delectus aut vel nisi! Ad harum ullam aperiam, adipisci quae in
            blanditiis.
          </ResourceContent>
        </ResourceBody>
        <ResourceSource
          title="Resource title"
          description="Resource description"
        />
      </Resource>
      <Resource>
        <ResourceBody>
          <ResourceContent>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
            consequuntur atque iure incidunt labore tempore, deserunt voluptate
            quis delectus aut vel nisi! Ad harum ullam aperiam, adipisci quae in
            blanditiis.
          </ResourceContent>
        </ResourceBody>
        <ResourceSource
          imageSrc="http://lorempixel.com/100/100"
          title="Resource title"
          description="Resource description"
        />
      </Resource>
      <Resource>
        <ResourceBody>
          <ResourceContent>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
            consequuntur atque iure incidunt labore tempore, deserunt voluptate
            quis delectus aut vel nisi! Ad harum ullam aperiam, adipisci quae in
            blanditiis.
          </ResourceContent>
        </ResourceBody>
        <ResourceSource
          imageSrc="http://lorempixel.com/200/100"
          description="Resource description"
        />
      </Resource>
      <Resource>
        <ResourceBody>
          <ResourceContent>
            Placed inside a footer with an action.
          </ResourceContent>
        </ResourceBody>
        <ResourceFooter
          action={{
            label: "Details",
            onClick: () => {
              return;
            },
          }}
        >
          <ResourceSource
            imageSrc="http://lorempixel.com/200/100"
            description="Resource description"
          />
        </ResourceFooter>
      </Resource>
    </VStack>
  );
};

export const DemoActions = () => {
  const { setOutput } = useDebug({
    test: { componentName: "Resource", scenario: "actions" },
  });

  return (
    <Resource>
      <ResourceHeader icon="alcohol">
        <ResourceType>Alcohol</ResourceType>
      </ResourceHeader>
      <ResourceBody>
        <ResourceContent>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
          consequuntur atque iure incidunt labore tempore, deserunt voluptate
          quis delectus aut vel nisi! Ad harum ullam aperiam, adipisci quae in
          blanditiis.
        </ResourceContent>
      </ResourceBody>
      <ResourceActions>
        <ResourceAction onClick={() => setOutput("accept")}>
          Accept
        </ResourceAction>
        <ResourceActionAlt onClick={() => setOutput("reject")}>
          Reject
        </ResourceActionAlt>
      </ResourceActions>
    </Resource>
  );
};

export const DemoFillContainer = () => {
  const { setOutput } = useDebug({
    test: { componentName: "Resource", scenario: "fill-container" },
  });

  return (
    <PendingStyleDebug>
      <div
        style={{
          height: 250,
          width: 300,
        }}
      >
        <Resource fillContainer={true}>
          <ResourceHeader>
            <ResourceType>Fill container</ResourceType>
          </ResourceHeader>
          <ResourceBody onViewMoreContent={() => setOutput("See more")}>
            <ResourceContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
              consequuntur atque iure incidunt labore tempore, deserunt
              voluptate quis delectus aut vel nisi! Ad harum ullam aperiam,
              adipisci quae in blanditiis. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Impedit consequuntur atque iure
              incidunt labore tempore, deserunt voluptate quis delectus aut vel
              nisi! Ad harum ullam aperiam, adipisci quae in blanditiis.
            </ResourceContent>
          </ResourceBody>
        </Resource>
      </div>
    </PendingStyleDebug>
  );
};

export const DemoFillContainerExamples = () => {
  const { setOutput } = useDebug({
    test: { componentName: "Resource", scenario: "fill-container-examples" },
  });

  return (
    <PendingStyleDebug>
      <VStack>
        <div
          style={{
            height: 250,
            border: "1px solid red",
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <Resource fillContainer={true}>
            <ResourceHeader>
              <ResourceType>Fill container</ResourceType>
            </ResourceHeader>
            <ResourceBody onViewMoreContent={() => setOutput("View more")}>
              <ResourceContent>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Impedit consequuntur atque iure incidunt labore tempore,
                deserunt voluptate quis delectus aut vel nisi! Ad harum ullam
                aperiam, adipisci quae in blanditiis. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Impedit consequuntur atque
                iure incidunt labore tempore, deserunt voluptate quis delectus
                aut vel nisi! Ad harum ullam aperiam, adipisci quae in
                blanditiis.
              </ResourceContent>
            </ResourceBody>
            <ResourceFooter
              action={{
                label: "Details",
                onClick: () => {
                  return;
                },
              }}
            >
              <ResourceSource description="Resource description" />
            </ResourceFooter>
          </Resource>
          <Resource>
            <ResourceHeader>
              <ResourceType>Standard</ResourceType>
            </ResourceHeader>
            <ResourceBody>
              <ResourceContent>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Impedit consequuntur atque iure incidunt labore tempore,
                deserunt voluptate quis delectus aut vel nisi! Ad harum ullam
                aperiam, adipisci quae in blanditiis. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Impedit consequuntur atque
                iure incidunt labore tempore, deserunt voluptate quis delectus
                aut vel nisi! Ad harum ullam aperiam, adipisci quae in
                blanditiis.
              </ResourceContent>
            </ResourceBody>
            <ResourceFooter
              action={{
                label: "Details",
                onClick: () => {
                  return;
                },
              }}
            >
              <ResourceSource description="Resource description" />
            </ResourceFooter>
          </Resource>
        </div>
        <div
          style={{
            height: 500,
            border: "1px solid red",
            display: "flex",
            alignItems: "flex-start",
            marginTop: 200,
          }}
        >
          <Resource fillContainer={true}>
            <ResourceHeader>
              <ResourceType>Fill container</ResourceType>
            </ResourceHeader>
            <ResourceBody>
              <ResourceContent>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Impedit consequuntur atque iure incidunt labore tempore,
                deserunt voluptate quis delectus aut vel nisi! Ad harum ullam
                aperiam, adipisci quae in blanditiis. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Impedit consequuntur atque
                iure incidunt labore tempore, deserunt voluptate quis delectus
                aut vel nisi! Ad harum ullam aperiam, adipisci quae in
                blanditiis.
              </ResourceContent>
            </ResourceBody>
            <ResourceFooter
              action={{
                label: "Details",
                onClick: () => {
                  return;
                },
              }}
            >
              <ResourceSource description="Resource description" />
            </ResourceFooter>
          </Resource>
          <Resource>
            <ResourceHeader>
              <ResourceType>Standard</ResourceType>
            </ResourceHeader>
            <ResourceBody>
              <ResourceContent>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Impedit consequuntur atque iure incidunt labore tempore,
                deserunt voluptate quis delectus aut vel nisi! Ad harum ullam
                aperiam, adipisci quae in blanditiis. Lorem ipsum dolor sit
                amet, consectetur adipisicing elit. Impedit consequuntur atque
                iure incidunt labore tempore, deserunt voluptate quis delectus
                aut vel nisi! Ad harum ullam aperiam, adipisci quae in
                blanditiis.
              </ResourceContent>
            </ResourceBody>
            <ResourceFooter
              action={{
                label: "Details",
                onClick: () => {
                  return;
                },
              }}
            >
              <ResourceSource description="Resource description" />
            </ResourceFooter>
          </Resource>
        </div>
      </VStack>
    </PendingStyleDebug>
  );
};

export const DemoUrl = () => {
  useDebug({
    test: { componentName: "Resource", scenario: "url" },
  });
  return (
    <MemoryRouter>
      <Grid>
        <Resource url="#">
          <ResourceHeader>
            <ResourceType>Fill container</ResourceType>
          </ResourceHeader>
          <ResourceBody>
            <ResourceContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
              consequuntur atque iure incidunt labore tempore, deserunt
              voluptate quis delectus aut vel nisi! Ad harum ullam aperiam,
              adipisci quae in blanditiis.
            </ResourceContent>
          </ResourceBody>
          <ResourceFooter
            action={{
              label: "Details",
              onClick: () => {
                return;
              },
            }}
          >
            <ResourceSource description="Resource description" />
          </ResourceFooter>
        </Resource>
        <Resource url="#">
          <ResourceHeader>
            <ResourceType>Standard</ResourceType>
          </ResourceHeader>
          <ResourceBody>
            <ResourceContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
              consequuntur atque iure incidunt labore tempore, deserunt
              voluptate.
            </ResourceContent>
          </ResourceBody>
          <ResourceFooter
            action={{
              label: "Details",
              onClick: () => {
                return;
              },
            }}
          >
            <ResourceSource description="Resource description" />
          </ResourceFooter>
        </Resource>
        <Resource url="#">
          <ResourceHeader>
            <ResourceType>Fill container</ResourceType>
          </ResourceHeader>
          <ResourceBody>
            <ResourceContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            </ResourceContent>
          </ResourceBody>
          <ResourceFooter
            action={{
              label: "Details",
              onClick: () => {
                return;
              },
            }}
          >
            <ResourceSource description="Resource description" />
          </ResourceFooter>
        </Resource>
        <Resource url="#">
          <ResourceHeader>
            <ResourceType>Standard</ResourceType>
          </ResourceHeader>
          <ResourceBody>
            <ResourceContent>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
              consequuntur atque iure incidunt labore tempore, deserunt
              voluptate quis delectus.
            </ResourceContent>
          </ResourceBody>
          <ResourceFooter
            action={{
              label: "Details",
              onClick: () => {
                return;
              },
            }}
          >
            <ResourceSource description="Resource description" />
          </ResourceFooter>
        </Resource>
      </Grid>
    </MemoryRouter>
  );
};
