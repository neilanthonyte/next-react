import * as React from "react";
import { useState } from "react";

import { MultiForm, EMultiFormDisplayStyle } from ".";
import { EFormType, IFormDetailsMulti } from "next-shared/src/types/formTypes";
import { mockFormSchemas } from "next-shared/src/mockData/mockFormSchemas";
import { appointmentFormPatientNoteLOINC } from "next-shared/src/helpers/constants";

const schema: IFormDetailsMulti = {
  type: EFormType.Multi,
  transformers: [
    {
      type: "arrayToField",
      path: "observation:ReasonForVisit.component",
      filter: `code.coding.0.code=${appointmentFormPatientNoteLOINC}`,
      src: "valueString",
      asJson: true,
      dest: "patientNote",
    },
  ],
  sections: [
    {
      label: "First section",
      schema: {
        type: EFormType.Single,
        fields: [
          {
            label: "First detail",
            map: "foo.firstDetail",
            type: "text",
            required: true,
          },
        ],
      },
    },
    {
      label: "Second section",
      schema: {
        type: EFormType.Single,
        transformers: [
          {
            type: "arrayToField",
            path: "observation:ReasonForVisit.component",
            filter: `code.coding.0.code=${appointmentFormPatientNoteLOINC}`,
            src: "valueString",
            asJson: true,
            dest: "patientNote",
          },
        ],
        fields: [
          {
            map: "foo.secondDetail",
            type: "text",
          },
          {
            label: "Reason for visit",
            noteLabel: "Note label",
            type: "text",
            map: "$patientNote.foo",
          },
          {
            label: "Bar",
            noteLabel: "Note label",
            type: "text",
            map: "$patientNote.bar",
          },
        ],
      },
    },
    {
      label: "Third section",
      schema: {
        type: EFormType.Single,
        transformers: [
          {
            type: "arrayToField",
            path: "observation:ReasonForVisit.component",
            filter: `code.coding.0.code=${appointmentFormPatientNoteLOINC}`,
            src: "valueString",
            asJson: true,
            dest: "patientNote",
          },
        ],
        fields: [
          {
            label: "Wiz",
            noteLabel: "Note label",
            type: "text",
            map: "$patientNote.thirdDetail",
          },
        ],
      },
    },
  ],
};

const data = {
  foo: {
    firstDetail: "Hello",
    secondDetail: "World",
  },
  "observation:ReasonForVisit": {
    component: [
      {
        code: {
          coding: [
            {
              system: "http://loinc.org/",
              code: appointmentFormPatientNoteLOINC,
            },
          ],
        },
        valueString: '{"_foo":"Label","foo":"Value"}',
      },
    ],
  },
};

export const DemoOnboard = () => {
  const [result, setResult] = useState();

  return (
    <>
      <MultiForm
        displayStyle={EMultiFormDisplayStyle.Accordion}
        schema={mockFormSchemas.onboard as IFormDetailsMulti}
        onSuccess={setResult}
      />
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};

export const DemoStandard = () => {
  const [index, setIndex] = useState<number>();
  const [result, setResult] = useState();

  return (
    <div data-test="MultiForm-scenario-basic">
      <div data-test="multi-form">
        <MultiForm
          schema={schema}
          data={data}
          onProgressUpdate={setIndex}
          onSuccess={setResult}
        />
      </div>
      <p>Current section: {index}</p>
      <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};

export const DemoAccordion = () => {
  const [index, setIndex] = useState<number>();
  const [result, setResult] = useState();

  return (
    <div data-test="MultiForm-scenario-accordion">
      <div data-test="multi-form">
        <MultiForm
          schema={schema}
          data={data}
          onProgressUpdate={setIndex}
          onSuccess={setResult}
          displayStyle={EMultiFormDisplayStyle.Accordion}
        />
      </div>
      <p>Current section: {index}</p>
      <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
};
