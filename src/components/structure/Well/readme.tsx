import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";
import { Page } from "../Page";
import {
  PageSection,
  PageSectionBody,
  PageSectionHeader,
  PageSectionTitle,
} from "../PageSection";
import { Well, WellContent, WellOptions } from ".";
import { EHeaderVariant } from "../../abstract/Section/components/Header";

export const DemoStandard = () => {
  useDebug({
    test: {
      componentName: "Well",
      scenario: "standard",
    },
  });

  return (
    <Well>
      <WellContent>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, temporibus tempore minus recusandae culpa reiciendis
          nam pariatur odit incidunt velit dolores autem molestiae rem
          repudiandae consequuntur delectus. Illum, itaque sit.
        </p>
      </WellContent>
    </Well>
  );
};

export const DemoOptions = () => {
  useDebug({
    test: {
      componentName: "Well",
      scenario: "options",
    },
  });

  return (
    <Well>
      <WellOptions>
        Any options for the content go here, e.g. filters / select all /
        deselect all
      </WellOptions>
      <WellContent>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          Exercitationem, temporibus tempore minus recusandae culpa reiciendis
          nam pariatur odit incidunt velit dolores autem molestiae rem
          repudiandae consequuntur delectus. Illum, itaque sit.
        </p>
      </WellContent>
    </Well>
  );
};

export const DemoPage = () => {
  useDebug({
    test: {
      componentName: "Well",
      scenario: "page",
    },
  });

  return (
    <Page>
      <PageSection>
        <PageSectionHeader
          variant={EHeaderVariant.Well}
          actions={[
            {
              label: "Action 1",
              onClick: () => {},
              buttonVariant: "secondary",
            },
            {
              label: "Action 2",
              onClick: () => {},
              buttonVariant: "primary",
            },
          ]}
        >
          <PageSectionTitle>Well section 1</PageSectionTitle>
        </PageSectionHeader>
        <PageSectionBody>
          <Well>
            <WellOptions>
              Any options for the content go here, e.g. filters / select all /
              deselect all
            </WellOptions>
            <WellContent>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, temporibus tempore minus recusandae culpa
                reiciendis nam pariatur odit incidunt velit dolores autem
                molestiae rem repudiandae consequuntur delectus. Illum, itaque
                sit.
              </p>
            </WellContent>
          </Well>
        </PageSectionBody>
      </PageSection>
      <PageSection>
        <PageSectionHeader>
          <PageSectionTitle>Normal section</PageSectionTitle>
        </PageSectionHeader>
        <PageSectionBody>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem, temporibus tempore minus recusandae culpa reiciendis
            nam pariatur odit incidunt velit dolores autem molestiae rem
            repudiandae consequuntur delectus. Illum, itaque sit.
          </p>
        </PageSectionBody>
      </PageSection>
      <PageSection>
        <PageSectionHeader
          variant={EHeaderVariant.Well}
          actions={[
            {
              label: "Add",
              onClick: () => {},
              buttonVariant: "primary",
              icon: "action-add",
            },
          ]}
        >
          <PageSectionTitle>Well section 1</PageSectionTitle>
        </PageSectionHeader>
        <PageSectionBody>
          <Well>
            <WellOptions>
              Any options for the content go here, e.g. filters / select all /
              deselect all
            </WellOptions>
            <WellContent>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Exercitationem, temporibus tempore minus recusandae culpa
                reiciendis nam pariatur odit incidunt velit dolores autem
                molestiae rem repudiandae consequuntur delectus. Illum, itaque
                sit.
              </p>
            </WellContent>
          </Well>
        </PageSectionBody>
      </PageSection>
    </Page>
  );
};
