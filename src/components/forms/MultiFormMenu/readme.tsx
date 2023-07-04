import * as React from "react";
import { useState, useContext, useEffect } from "react";
import * as _ from "lodash";
import * as faker from "faker";

import { MultiFormMenu } from ".";
import { FormStateContext, IFormSectionState } from "../FormStateContext";
import { ActiveFormHandler } from "../ActiveFormHandler";
import { EFormSectionStatus } from "../MultiForm";

const Inner = () => {
  const { reset, clear, activeSection, setActiveSection, sections } =
    useContext(FormStateContext);

  const randomise = () => {
    const rand = _.random(2, 10, false);
    const sections = _.times(rand, () => {
      const section: IFormSectionState = {
        label: faker.lorem.words(4),
        status: EFormSectionStatus.INCOMPLETE,
      };
      return section;
    });
    reset(sections);
  };

  useEffect(() => {
    randomise();
  }, []);

  const next = () => {
    setActiveSection(Math.min(sections.length, activeSection + 1));
  };
  const prev = () => {
    setActiveSection(Math.max(0, activeSection - 1));
  };
  const setStatus = (status: EFormSectionStatus) => {
    const sectionsUpdate = [...sections];
    sectionsUpdate[activeSection] = {
      ...sectionsUpdate[activeSection],
      status,
    };
    reset(sectionsUpdate, activeSection);
  };

  return (
    <>
      <MultiFormMenu />
      <div className="debug">
        <p>
          <a onClick={randomise}>Randomise</a>
          {" | "}
          <a onClick={clear}>Clear</a>
          {" | "}
          <a onClick={next}>Next</a>
          {" | "}
          <a onClick={prev}>Prev</a>
          {" | "}
          <a onClick={() => setStatus(EFormSectionStatus.COMPLETE)}>Complete</a>
          {" | "}
          <a onClick={() => setStatus(EFormSectionStatus.INVALID)}>Error</a>
          {" | "}
          Sections: {activeSection}
        </p>
      </div>
    </>
  );
};

export const DemoStandard = () => {
  return (
    <ActiveFormHandler>
      <Inner />
    </ActiveFormHandler>
  );
};
