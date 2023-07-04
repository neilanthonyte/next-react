import * as React from "react";
import { useMemo, useState } from "react";

import { IFormSchema } from "next-shared/src/types/formTypes";

import { CameraUploadContext } from "../../../contexts/CameraUploadContext";
import {
  PayDockContext,
  IPayDockContextValue,
} from "../../../contexts/PayDockContext";

import { Form } from ".";
import { FormFetcher } from "./examples/FormFetcher";
import { IUploadDetails } from "../../../client/modules/IUploadDetails";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { PatientNote } from "../../atoms/PatientNote";
import { useDebug } from "../../../debug/DemoWrapper";

export const DemoSuggestions = () => {
  const { setOutput } = useDebug();
  const fields: IFormSchema = [
    {
      type: "options",
      map: "foo",
      label: "Remote options",
      options: [],
      variant: "inline",
      suggestion: {
        // HACK needs to match a real world value as the validation does not work with mock
        name: "PaymentCategory",
        prop: "data",
      },
      required: true,
    },
  ];
  return (
    <>
      <p>
        Please test with a real client as the validation does not work with mock
      </p>
      <Form schema={fields} onSuccess={setOutput} />
    </>
  );
};

export const DemoRemote = () => {
  return <FormFetcher />;
};

export const DemoInputs = () => {
  const [result, setResult] = useState();

  const options = ["one", "two", "three", "four"];

  const payDockProvider: IPayDockContextValue = {
    gatewayId: "5c8f40f94aba3c6d7f3e3245", // dev gateway
    prefillData: {
      email: "test@example.com",
      nameOnCard: "Joe Bloggs",
    },
  };

  const uploadProvider = {
    getUploadDetails: function () {
      const upload: IUploadDetails = {
        url: "upload-camera-image",
        method: "PUT",
        headers: {},
        fileKey:
          "testing-folder/2eb7c43a-ea47-4573-9c01-c80508eaa811/no-pre-existing.jpeg",
      };

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(upload);
        }, 1500);
      }) as Promise<IUploadDetails>;
    },
    getSignedImageUrl: (key: string) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("http://lorempixel.com/g/400/200/");
        }, 1000);
      }) as Promise<string>;
    },
  };

  return (
    <NextAppHandlerWeb>
      <PayDockContext.Provider value={payDockProvider}>
        <CameraUploadContext.Provider value={uploadProvider}>
          <div data-test="Form-scenario-inputTypes">
            <div data-test="form">
              <Form
                schema={[
                  {
                    label: "Text",
                    type: "text",
                    map: "text",
                    placeholder: "Please enter...",
                    hint: "name.firstName",
                  },
                  {
                    label: "Text multi-line",
                    type: "text",
                    map: "textMultiLine",
                    allowNewlines: true,
                  },
                  {
                    label: "Boolean Input",
                    type: "boolean",
                    map: "boolean",
                  },
                  {
                    type: "options",
                    map: "optionsInlineSingle",
                    label: "Inline single value",
                    options: options,
                    variant: "inline",
                  },
                  {
                    type: "options",
                    map: "optionsInlineMulti",
                    label: "Inline multi value",
                    options: options,
                    variant: "inline",
                    allowMultiple: true,
                  },
                  {
                    type: "options",
                    map: "optionsDropdownSingle",
                    label: "Dropdown single value",
                    options: options,
                    variant: "dropdown",
                  },
                  {
                    type: "options",
                    map: "optionsDropdownMulti",
                    label: "Dropdown multi value",
                    options: options,
                    variant: "dropdown",
                    allowMultiple: true,
                  },
                  {
                    label: "Automatic options - inline",
                    type: "options",
                    map: "optionsAutoInline",
                    options: options.slice(0, 2),
                  },
                  {
                    label: "Automatic options - dropdown",
                    type: "options",
                    map: "optionsAutoDropdown",
                    options: options,
                  },
                  {
                    label: "Rating example",
                    type: "likert",
                    map: "likert-happiness",
                    preset: "happiness5",
                    value: 5,
                  },
                  {
                    label: "Date",
                    type: "date",
                    map: "dateFull",
                    dateFormat: "YYYY-MM-DD",
                  },
                  {
                    label: "Date - year/month",
                    type: "date",
                    map: "dateYearMonth",
                    dateFormat: "YYYY-MM",
                  },
                  {
                    label: "Date - month/day",
                    type: "date",
                    map: "dateMonthDay",
                    dateFormat: "MM-DD",
                  },
                  {
                    label: "Calendar - single",
                    type: "calendarSingle",
                    map: "calendarSingle",
                  },
                  {
                    label: "Calendar - range",
                    type: "calendarRange",
                    map: "calendarRange",
                    required: true,
                  },
                  {
                    label: "Email",
                    type: "email",
                    map: "email",
                    placeholder: "name@example.com",
                  },
                  {
                    label: "Number",
                    type: "number",
                    map: "number",
                    placeholder: "1234...",
                  },
                  // {
                  //   label: "Temperature",
                  //   type: "temperature",
                  //   map: "temperature",
                  // },
                  {
                    label: "Password",
                    type: "password",
                    map: "password",
                  },
                  {
                    type: "passwordConfirm",
                    map: "password",
                    label: "Password with confirm",
                    required: true,
                  },
                  {
                    type: "medicareNumber",
                    map: "medicareNumber",
                    label: "Medicare Card Number",
                  },
                  {
                    label: "Legal document",
                    type: "acceptLegals",
                    map: "acceptLegals",
                    contentUrl: "/terms.json",
                  },
                  {
                    type: "hidden",
                    map: "hidden",
                    defaultValue: "HIDDEN",
                  },
                  {
                    type: "postcode",
                    map: "postcode",
                    label: "Postcode (pseudo field)",
                  },
                  {
                    type: "phone",
                    map: "phone",
                    label: "Phone number (pseudo field)",
                  },
                  {
                    type: "dvaNumber",
                    map: "dvaNumber",
                    label: "DVA Number (pseudo field)",
                  },
                  {
                    type: "concessionCardNumber",
                    map: "concessionCardNumber",
                    label: "Concession Card (pseudo field)",
                  },
                  {
                    type: "individualHealthcareIdentifier",
                    map: "individualHealthcareIdentifier",
                    label: "IHN (pseudo field)",
                  },
                  {
                    type: "imageUpload",
                    label: "Gallery",
                    map: "posterImage",
                    uploadNameSpace: "testing",
                    maxFileSize: 10 * 1024 * 1024, // 10MB
                    useGuidForFileName: true,
                    maxImages: 5,
                    metadata: {
                      // provide extra data where needed by other parts of the system, e.g. CMS upload
                      _fieldHandle: "myImageField",
                    },
                  },
                  {
                    type: "camera",
                    map: "camera",
                    label: "Profile Upload",
                    videoEnvironment: "user",
                    videoWidth: 300,
                    mode: "auto",
                  },
                  {
                    label: "Credit card",
                    description:
                      "To allow for automatic payments please provide your credit card details.",
                    type: "creditCard",
                    map: "CreditCard",
                  },
                  {
                    label: "Date of birth",
                    description:
                      "Set this field to anywhere between 10 and 20 years ago to expose the conditional field.",
                    type: "date",
                    map: "conditionalSource",
                    dateFormat: "YYYY-MM-DD",
                    maxDate: "NOW()",
                    minDate: "NOW().offset(-110, 'years')",
                  },
                  {
                    label: "Conditionally hidden field 1",
                    type: "text",
                    map: "foo",
                    conditional: {
                      condition: "age",
                      path: "/conditionalSource",
                      minAge: 10,
                      maxAge: 20,
                      type: "visible",
                    },
                  },
                  {
                    type: "options",
                    label: "Gender",
                    description:
                      "Set this field to 'Male' to expose the conditional field.",
                    map: "genderConditionalSource",
                    options: {
                      Male: "male",
                      Female: "female",
                      Other: "unknown",
                    },
                    variant: "inline",
                  },
                  {
                    label: "Conditionally hidden field 2",
                    type: "text",
                    map: "bar",
                    conditional: {
                      path: "/genderConditionalSource",
                      match: "male",
                      type: "visible",
                    },
                  },
                ]}
                data={{
                  text: "Hello world",
                  CreditCard: {
                    cardType: "mastercard",
                    maskedNumber: "**** **** **** 5432",
                    expirationDate: "02/2020",
                  },
                  posterImage: [
                    {
                      _fieldHandle: "myImageField",
                      id: 101,
                      url: "https://www.placecage.com/gif/200/200?randomNumber=137",
                    },
                  ],
                }}
                onSuccess={(data) => {
                  setResult(data);
                }}
              />
            </div>
            <div>
              <h4>Output</h4>
              <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        </CameraUploadContext.Provider>
      </PayDockContext.Provider>
    </NextAppHandlerWeb>
  );
};

export const DemoScoredForm: React.FC = () => {
  const [result, setResult] = useState();

  const schema: IFormSchema = useMemo(
    () => [
      {
        type: "group",
        map: "root",
        fields: [
          {
            label: "About how often did you feel tired out for no good reason?",
            noteLabel: "Question A",
            map: "a",
            type: "options",
            variant: "inline",
            required: true,
            options: {
              "None of the time": {
                score: 1,
                label: "None of the time",
              },
              "A little of the time": {
                score: 2,
                label: "A little of the time",
              },
              "Some of the time": {
                score: 3,
                label: "Some of the time",
              },
              "Most of the time": {
                score: 4,
                label: "Most of the time",
              },
              "All of the time": {
                score: 5,
                label: "All of the time",
              },
            },
          },
          {
            label: "About how often did you feel nervous?",
            map: "b",
            type: "options",
            variant: "inline",
            required: true,
            options: {
              "None of the time": {
                score: 1,
                label: "None of the time",
              },
              "A little of the time": {
                score: 2,
                label: "A little of the time",
              },
              "Some of the time": {
                score: 3,
                label: "Some of the time",
              },
              "Most of the time": {
                score: 4,
                label: "Most of the time",
              },
              "All of the time": {
                score: 5,
                label: "All of the time",
              },
            },
          },
          {
            label: "About how often did you feel hopeless?",
            map: "c",
            type: "options",
            variant: "inline",
            required: true,
            options: {
              "None of the time": {
                score: 1,
                label: "None of the time",
              },
              "A little of the time": {
                score: 2,
                label: "A little of the time",
              },
              "Some of the time": {
                score: 3,
                label: "Some of the time",
              },
              "Most of the time": {
                score: 4,
                label: "Most of the time",
              },
              "All of the time": {
                score: 5,
                label: "All of the time",
              },
            },
          },
          {
            label: "About how often did you feel restless or fidgety?",
            map: "d",
            type: "options",
            variant: "inline",
            required: true,
            options: {
              "None of the time": {
                score: 1,
                label: "None of the time",
              },
              "A little of the time": {
                score: 2,
                label: "A little of the time",
              },
              "Some of the time": {
                score: 3,
                label: "Some of the time",
              },
              "Most of the time": {
                score: 4,
                label: "Most of the time",
              },
              "All of the time": {
                score: 5,
                label: "All of the time",
              },
            },
          },
          {
            label:
              "About how often did you feel so restless you could not sit still?",
            map: "e",
            type: "options",
            variant: "inline",
            required: true,
            options: {
              "None of the time": {
                score: 1,
                label: "None of the time",
              },
              "A little of the time": {
                score: 2,
                label: "A little of the time",
              },
              "Some of the time": {
                score: 3,
                label: "Some of the time",
              },
              "Most of the time": {
                score: 4,
                label: "Most of the time",
              },
              "All of the time": {
                score: 5,
                label: "All of the time",
              },
            },
          },
          {
            map: "score",
            type: "score",
            formulaSrc: "root",
            formula: "2 * ( a.score + b.score + c.score + d.score + e.score )",
            grades: [
              {
                min: 1,
                max: 19,
                value: "Likely to be well",
              },
              {
                min: 20,
                max: 24,
                value: "Likely to have a mild disorder",
              },
              {
                min: 25,
                max: 29,
                value: "Likely to have a moderate disorder",
              },
              {
                min: 30,
                max: 50,
                value: "Likely to have a severe disorder",
              },
            ],
          },
          {
            map: "score2",
            type: "score",
            formulaSrc: "root",
            formula:
              "((a.score < 3 ? a.score + 3 * b.score + e.score : a.score * c.score)-0)/(100-0)",
            grades: [
              {
                min: 0,
                max: 50,
                value: "Low",
              },
              {
                min: 51,
                max: 100,
                value: "High",
              },
            ],
          },
          {
            map: "score3",
            type: "score",
            formula: "score.score - score2.score + 2 * a.score",
            formulaSrc: "root",
            grades: [
              {
                min: -Infinity,
                max: 0,
                value: "Negative",
              },
              {
                min: 0,
                max: Infinity,
                value: "Positive",
              },
            ],
          },
        ],
      },
    ],
    [],
  );

  return (
    <div>
      <div>
        <Form schema={schema} onSuccess={setResult} />
      </div>
      <div>
        <h4>Output</h4>
        <pre data-test="output">{JSON.stringify(result, null, 2)}</pre>
        <h4>Patient Note</h4>
        {!!result && <PatientNote data={result} />}
      </div>
    </div>
  );
};

export const DemoTransformersForm = () => {
  const { setOutput } = useDebug();
  return (
    <Form
      schema={[
        {
          label: "Phone",
          type: "text",
          map: "$mobile",
          allowMultiple: true,
        },
        {
          label: "Email",
          type: "email",
          map: "$email",
          allowMultiple: true,
        },
        {
          label: "Allow SMS contact",
          type: "boolean",
          map: "$allowSms",
        },
        {
          label: "Reason for visit",
          type: "text",
          map: "$patientNote.reasonForVisit",
        },
      ]}
      data={{
        telecom: [
          {
            value: "Mobile 1",
            system: "phone",
            use: "mobile",
          },
          {
            value: "Mobile 2",
            system: "phone",
            use: "mobile",
          },
          {
            value: "email.1@example.com",
            system: "email",
          },
          {
            value: "Mobile 3",
            system: "phone",
            use: "mobile",
          },
          {
            value: "email.2@example.com",
            system: "email",
          },
          {
            value: "Missing",
            system: "missing",
          },
        ],
        extension: [
          {
            url: "http://example.com/SMSContact",
            valueBool: true,
          },
          {
            url: "http://example.com/ignore",
            valueBool: true,
          },
          {
            url: "http://example.com/patientNote",
            valueString: '{"reasonForVisit":"Feeling unwell"}',
          },
        ],
      }}
      dataTransformers={[
        {
          type: "arrayToField",
          path: "telecom",
          filter: "system=phone|use=mobile",
          src: "value",
          dest: "mobile",
          allowMultiple: true,
        },
        {
          type: "arrayToField",
          path: "telecom",
          filter: "system=email",
          src: "value",
          dest: "email",
          allowMultiple: true,
        },
        {
          type: "arrayToField",
          path: "extension",
          filter: "url=http://example.com/SMSContact",
          src: "valueBool",
          dest: "allowSms",
        },
        {
          type: "arrayToField",
          path: "extension",
          filter: "url=http://example.com/patientNote",
          src: "valueString",
          asJson: true,
          dest: "patientNote",
        },
      ]}
      onSuccess={(data) => {
        setOutput(data);
      }}
    />
  );
};

export const DemoConditionalForm = () => {
  const { setOutput } = useDebug();
  return (
    <Form
      schema={[
        {
          type: "text",
          label: "Populate to enable next field",
          map: "first",
        },
        {
          type: "text",
          label: "Populate to enable next field",
          map: "second",
          conditional: {
            path: "../first",
            isPresent: true,
            type: "enable",
          },
        },
        {
          type: "text",
          label: "Disabled until the second field contains data",
          map: "third",
          conditional: {
            path: "../second",
            isPresent: true,
            type: "enable",
          },
        },
        {
          label: "Min max",
          description: "Pick between 30 and 50",
          type: "temperature",
          map: "temperature",
          required: true,
        },
        {
          label: "Reason Why",
          type: "text",
          map: "reasonWhy",
          conditional: {
            maxValue: 50,
            minValue: 30,
            path: "../temperature",
            type: "visible",
          },
        },
        {
          label: "Toggle based",
          description: "Set to true to reveal next field",
          type: "boolean",
          map: "conditionalBoolean-control",
          defaultValue: false,
        },
        {
          type: "text",
          label: "I'm now visible",
          map: "conditionalBoolean-content",
          conditional: {
            path: "../conditionalBoolean-control",
            match: true,
            type: "visible",
          },
        },
        {
          label: "Conditional with allowMultiple",
          type: "boolean",
          map: "conditionalBooleanMultiple-control",
          defaultValue: true,
        },
        {
          type: "text",
          label: "I'm now visible",
          map: "conditionalBooleanMultiple-content",
          allowMultiple: true,
          conditional: {
            path: "../conditionalBooleanMultiple-control",
            match: true,
            type: "visible",
          },
        },
        {
          label: "Field must be populated",
          type: "text",
          map: "conditionalTextPopulated",
          description: "Type something to reveal the next field",
        },
        {
          type: "text",
          label: "I'm now visible",
          map: "conditionalTextPopulated-content",
          conditional: {
            path: "../conditionalTextPopulated",
            isPresent: true,
            type: "visible",
          },
        },
        {
          label: "Text based",
          description: "Set to 'A' to reveal next field",
          type: "text",
          map: "conditionalText",
        },
        {
          type: "text",
          label: "I'm now visible",
          map: "conditionalText-val",
          conditional: {
            path: "../conditionalText",
            match: "A",
            type: "visible",
          },
        },
        {
          type: "options",
          label: "Option based",
          map: "conditionalOptions",
          options: ["Show", "Hide", "Indifferent"],
          variant: "inline",
        },
        {
          type: "text",
          label: "I'm now visible",
          map: "conditionalOptions-val",
          conditional: {
            path: "../conditionalOptions",
            match: "Show",
            type: "visible",
          },
        },
        {
          type: "options",
          label: "Option based (allow multiple)",
          map: "conditionalOptionsMultiple",
          options: ["Show", "Hide", "Indifferent"],
          variant: "inline",
          allowMultiple: true,
        },
        {
          type: "text",
          label: "I'm now visible",
          map: "conditionalOptionsMultiple-val",
          conditional: {
            path: "../conditionalOptionsMultiple",
            match: "Show",
            type: "visible",
          },
        },
        {
          label: "Conditional group",
          type: "boolean",
          map: "conditionalGroup",
          defaultValue: false,
        },
        {
          type: "group",
          map: "conditionalGroup-val",
          conditional: {
            path: "../conditionalGroup",
            match: true,
            type: "visible",
          },
          fields: [
            {
              type: "text",
              map: "field1",
            },
          ],
        },
        {
          label: "Conditional allowMultiple group",
          type: "boolean",
          map: "conditionalGroupMultiple",
          defaultValue: true,
        },
        {
          type: "group",
          map: "conditionalGroupMultiple-val",
          allowMultiple: true,
          conditional: {
            path: "../conditionalGroupMultiple",
            match: true,
            type: "visible",
          },
          fields: [
            {
              type: "text",
              map: "field1",
            },
          ],
        },
        {
          type: "group",
          map: "conditionalWithinGroup",
          fields: [
            {
              label: "Toggle based within a group",
              description: "Set to true to reveal next field",
              type: "boolean",
              map: "conditionalBoolean-control",
              defaultValue: false,
            },
            {
              type: "text",
              label: "I'm now visible",
              map: "conditionalBoolean-content",
              conditional: {
                path: "../conditionalBoolean-control",
                match: true,
                type: "visible",
              },
            },
          ],
        },
        {
          type: "options",
          label: "An option must be selected",
          options: ["Foo", "Bar", "Baz"],
          map: "optionMustBeSelected",
          allowMultiple: true,
          variant: "inline",
        },
        {
          type: "text",
          label: "An options was selected above",
          map: "optionsWereSelected",
          conditional: {
            path: "../optionMustBeSelected",
            isPresent: true,
            type: "visible",
          },
        },
        {
          type: "options",
          label: "`Foo` must be selected",
          options: ["Foo", "Bar", "Baz"],
          map: "fooMustBeSelected",
          allowMultiple: true,
          variant: "inline",
        },
        {
          type: "text",
          label: "`Foo` was selected above",
          map: "fooWasSelected",
          conditional: {
            path: "../fooMustBeSelected",
            match: "Foo",
            type: "visible",
          },
        },
        {
          type: "options",
          label: "Only `Foo` and `Baz` must be selected",
          options: ["Foo", "Bar", "Baz"],
          map: "onlyFooAndBazMustBeSelected",
          allowMultiple: true,
          variant: "inline",
        },
        {
          type: "text",
          label: "`Foo` and `Baz` were selected above",
          map: "fooAndBazWasSelected",
          conditional: {
            path: "../onlyFooAndBazMustBeSelected",
            match: ["Baz", "Foo"],
            type: "visible",
          },
        },
        {
          type: "options",
          label: "`Foo` or `Baz` must be selected, other values are allowed",
          options: ["Foo", "Bar", "Baz"],
          map: "fooOrBazSelected",
          allowMultiple: false,
          variant: "inline",
        },
        {
          type: "text",
          label: "`Foo` and/or `Baz` were selected above",
          map: "fooOrBazWasSelected",
          conditional: {
            path: "../fooOrBazSelected",
            matchAny: ["Foo", "Baz"],
            type: "visible",
          },
        },
        {
          type: "group",
          label: "Group type with allowMultiple = true",
          allowMultiple: true,
          map: "allowMultipleGroup",
          fields: [
            {
              type: "text",
              label: "Enter something into this to show the hidden input",
              map: "textInput",
            },
            {
              type: "text",
              label: "Something was entered now this is enabled",
              map: "disabledTextInput",
              conditional: {
                path: "../textInput",
                isPresent: true,
                type: "enable",
              },
            },
            {
              type: "text",
              label: "Something was entered now this is visible",
              map: "hiddenTextInput",
              conditional: {
                path: "../disabledTextInput",
                isPresent: true,
                type: "visible",
              },
            },
          ],
        },
      ]}
      onSuccess={(data) => {
        setOutput(data);
      }}
    />
  );
};

/*

### Remotely loaded values

Suggestions can be used to pre-fetch some prop data that an input might need. To setup, please
follow these steps:

##### Frontend

An important detail to note is that the fetching magic exists in the `BaseInput`, so any inputs
wanting to utilise suggestions will need to extend from the `BaseInput`. The reason for this
is that the base input does the fetching and set's some state that contain the suggestion content.

It is then up to the input to choose whether or not to use the suggestions that have been fetched
or the content that was passed to it through props (like `options` for `SingleOptionsInput`).

For further details, please refer to:

- `SingleOptionsInput.tsx` for an example of using the suggestions state value.
- `BaseInput.tsx` for the actual fetching implementation.
- `MockSuggestionsModule.ts` in the spg api for a better understanding of the type of data passed around.

##### Backend/Services

Given the generic nature of suggestions, services are to be implemented on a company by company basis.

See the Next implementation of `SuggestionsService.ts` and the `suggestions.ts` endpoint for an
understanding of the backend implementation.

A key point for backend implementation is that the `name` of the suggestion is what should be used to determine
the data that should be sent back to the client. The `prop` key of the suggestion prop in the form schema is only used for the input to know where that particular set of data belongs.

```jsx harmony
import { Form } from "./";
import { MockApiClient } from "../../debug/MockApiClient";
import { initMockClient } from "../../../../apis/spg/mockClient/initMockClient";

const [state, setState] = React.useState(null);

<div>
  <MockApiClient>
    <Form
      client={initMockClient()}
      schema={[
        {
          type: "options",
          variant: "dropdown",
          label: "Fruits Dropdown",
          map: "fruit",
          options: [],
          remoteSuggestionValidator: "FruitList",
          suggestion: {
            name: "FruitList"
          }
        }
      ]}
      onError={(...a) => {
        console.warn(a);
      }}
      onSuccess={data => {
        setState(data);
      }}
    />
  </MockApiClient>
  <div>Output: {JSON.stringify(state)}</div>
</div>;
```

### Multi-value handling

```jsx harmony
initialState = { value: null };
const options = ["foo", "bar", "wiz", "moo"];
<div data-test="Form-scenario-multiValue">
  <Form
    title="Multi-value fields"
    schema={[
      {
        label: "Multi-value with limit",
        type: "text",
        allowMultiple: true,
        maxInstances: 2,
        required: true
      },
      {
        label: "Multi-value prefill",
        type: "text",
        allowMultiple: true,
        map: "multiPrefill"
      },
      {
        label: "Multi-value no limit",
        type: "text",
        allowMultiple: true,
        required: true
      },
      {
        label: "Multi-value input",
        description: "Multi-value directly supported by the input type",
        type: "options",
        options: options,
        variant: "inline",
        allowMultiple: true,
        required: true
      },
      {
        label: "Multi-value input with prefill",
        type: "options",
        options: options,
        variant: "inline",
        allowMultiple: true,
        required: true,
        map: "multiOptionsPrefill"
      },
      {
        label: "Emergency contacts",
        type: "group",
        allowMultiple: true,
        layout: EFormFieldLayoutType.INLINE,
        fields: [
          {
            type: "name",
            label: "First name",
            map: "firstName"
          },
          {
            type: "surname",
            label: "Last name",
            map: "lastName"
          }
        ]
      },
      {
        label: "Group prefill",
        type: "group",
        allowMultiple: true,
        layout: EFormFieldLayoutType.INLINE,
        map: "groupPrefill",
        fields: [
          {
            type: "text",
            label: "Foo",
            map: "foo"
          },
          {
            type: "text",
            label: "Bar",
            map: "bar"
          }
        ]
      }
    ].map((o, i) => ({ map: `map-${i}`, ...o }))}
    data={{
      multiPrefill: ["velit", "voluptate"],
      multiOptionsPrefill: ["foo", "bar", "wiz", "moo"],
      groupPrefill: [
        {
          foo: "Hello",
          bar: "World"
        },
        {
          foo: "Rick",
          bar: "Morty"
        }
      ]
    }}
    onSuccess={data => {
      setState({ value: data });
    }}
  />
  <div>
    <h4>Output</h4>
    State: "<span data-test="output">{JSON.stringify(state.value)}</span>"<br />
  </div>
</div>;
```

### Handling unrecognised values

To increase the robustness of the form, it will revert to a disabled input for unknown values, i.e.
prepopulated values that are incompatible with the form's validation.

```jsx
initialState = { value: null };
const options = ["foo", "bar", "wiz"];
<div>
  <Form
    schema={[
      {
        type: "options",
        label: "Options (known)",
        variant: "dropdown",
        options: options,
        map: "optionsPresent"
      },
      {
        type: "options",
        label: "Options (unknown)",
        variant: "dropdown",
        options: options,
        map: "optionsMissing"
      },
      {
        type: "phone",
        label: "Phone (valid)",
        map: "phoneKnown"
      },
      {
        type: "phone",
        label: "Phone (invalid)",
        map: "phoneUnknown"
      }
    ]}
    data={{
      optionsPresent: "foo",
      optionsMissing: "missing",
      phoneKnown: "0400111222",
      phoneUnknown: "11223344"
    }}
    onSuccess={value => setState({ value })}
  />
  <div>
    <h4>Output:</h4>
    <pre>{JSON.stringify(state.value, false, 2)}</pre>
  </div>
</div>;
```

The whole object can be mapped if `src` is omitted.

```jsx
initialState = { output: null };
<div>
  <Form
    schema={[
      {
        label: "Card number",
        type: "medicareNumber",
        map: "$medicare.value"
      },
      {
        label: "Expiry",
        type: "date",
        dateFormat: "YYYY-MM",
        map: "$medicare.period.end"
      }
    ]}
    data={{
      identifier: [
        {
          type: {
            coding: [
              {
                system: "http://hl7.org/fhir/v2/0203",
                code: "MC",
                display: "Patient's Medicare Number"
              }
            ]
          },
          system: "http://ns.electronichealth.net.au/id/medicare-number",
          value: "22222222001",
          period: {
            end: "2022-03"
          }
        }
      ]
    }}
    dataTransformers={[
      {
        type: "arrayToField",
        path: "identifier",
        filter: "system=http://ns.electronichealth.net.au/id/medicare-number",
        dest: "medicare"
      }
    ]}
    onSuccess={data => {
      setState({ output: data });
    }}
  />
  <div>
    <h4>Output</h4>
    <pre>{JSON.stringify(state.output, false, 2)}</pre>
  </div>
</div>;
```

### Submit support

You can pass a `Promise` back to the submit button to delay the success status. If you reject the promise, a default error message will be shown.

```jsx
initialState = { output: null };
<div>
  <Form
    schema={[
      {
        type: "text",
        map: "bar"
      }
    ]}
    data={{
      foo: "Disabled content"
    }}
    onSuccess={data =>
      new Promise((res, rej) => {
        setTimeout(() => {
          setState({ output: data });
          rej(true);
        }, 1500);
      })
    }
    submitLabel="Let's do this!"
  />
  <div>
    <h4>Output</h4>
    <pre>{JSON.stringify(state.output, false, 2)}</pre>
  </div>
</div>;
```

### Read-only fields

Disabled fields via `readOnly`:

```jsx
initialState = { output: null };
<div>
  <Form
    schema={[
      {
        type: "text",
        label: "Disabled using readOnly",
        readOnly: true
      },
      {
        type: "text",
        label: "Please use readOnly instead",
        disabled: true
      }
    ].map((n, i) => ({
      ...n,
      map: n.map || `foo${i}`
    }))}
    data={{
      foo0: "Disabled content"
    }}
    onSuccess={output => setState({ output })}
  />
  <div>
    <h4>Output</h4>
    <pre>{JSON.stringify(state.output, false, 2)}</pre>
  </div>
</div>;
```

### Date handling

To refer to today’s date, you can use `NOW()` in the `minDate` and `maxDate` fields. To specify a date
offset from this date, you can use the `offset` function, such as `NOW().offset(1, "days")`
and `NOW().offset(-2, "years")`

```jsx
initialState = { output: null };
<div>
  <Form
    schema={[
      {
        label: "Minimal field",
        type: "date",
        dateFormat: "YYYY-MM-DD"
      },
      {
        label: "FullDate using NOW()",
        type: "date",
        dateFormat: "YYYY-MM-DD",
        maxDate: "NOW()",
        minDate: "NOW().offset(-7,'years')"
      },
      {
        label: "YYYY-MM using NOW()",
        type: "date",
        dateFormat: "YYYY-MM",
        maxDate: "NOW()",
        minDate: "NOW().offset(-7,'years')"
      },
      {
        label: "Max & min date using NOW().offset",
        type: "date",
        dateFormat: "YYYY-MM-DD",
        maxDate: "NOW().offset(10,'years')",
        minDate: "NOW().offset(-7,'years')"
      },
      {
        label: "Next 10 years - as used by medicare",
        type: "date",
        dateFormat: "YYYY-MM",
        maxDate: "NOW().offset(10,'years')",
        minDate: "NOW()"
      },
      {
        label: "Previous 10 years - as used by medicare",
        type: "date",
        dateFormat: "YYYY-MM",
        maxDate: "NOW()",
        minDate: "NOW().offset(-10,'years')"
      }
    ].map((x, i) => ({ ...x, map: `map-${i}` }))}
    onSuccess={output => setState({ output })}
  />
  <div>
    <h4>Output</h4>
    <pre>{JSON.stringify(state.output, false, 2)}</pre>
  </div>
</div>;
```

### Pre-filing the form

Data can be prefilled into the form. The `map` field is used to determine which field the data is assigned to.
It follows the `lodash` notation for referencing the object fields.

```jsx
initialState = { output: null };
<div>
  <Form
    schema={[
      {
        type: "text",
        label: "Foo",
        map: "foo.0.bar"
      },
      {
        type: "text",
        label: "Multiple match 1",
        map: "bar.note"
      },
      {
        type: "text",
        label: "Multiple match 2",
        map: "bar.note"
      },
      {
        type: "options",
        label: "Multi-field",
        map: "multi",
        allowMultiple: true,
        options: ["foo", "bar", "zip"],
        variant: "inline"
      },
      {
        type: "options",
        label: "Multi-field",
        map: "bar.multi",
        allowMultiple: true,
        options: ["foo", "bar", "zip"],
        variant: "multiSelect"
      }
    ]}
    data={{
      foo: [
        {
          bar: "FOO"
        }
      ],
      bar: {
        note: "Do I appear twice?",
        multi: ["foo", "bar"]
      },
      multi: ["foo", "bar"]
    }}
    onSuccess={data => {
      setState({ output: data });
    }}
  />
  <div>
    <h4>Output</h4>
    <pre>{JSON.stringify(state.output, false, 2)}</pre>
  </div>
</div>;
```

Data can be populated from complex objects. To support a review process, the object can include an ID to
indicate it comes from an object on record. These objects can be flagged as being _incorrect_ through the
use of metadata.

```jsx
initialState = { output: null };
<div>
  <Form
    schema={[
      {
        label: "Person",
        type: "group",
        map: "person",
        allowMultiple: true,
        fields: [
          {
            type: "text",
            label: "Name",
            map: "name"
          },
          {
            type: "group",
            label: "Contact",
            allowMultiple: true,
            map: "contact",
            fields: [
              {
                type: "text",
                label: "Label",
                map: "label"
              },
              {
                type: "text",
                label: "Value",
                map: "value"
              }
            ]
          }
        ]
      }
    ]}
    data={{
      person: [
        {
          name: "Bob",
          contact: [
            {
              label: "To be deleted",
              value: "0400000000",
              _floreyMeta: {
                id: 9,
                action: "delete"
              }
            },
            {
              label: "Existing value",
              value: "0262000000",
              _floreyMeta: {
                id: 10
              }
            }
          ]
        },
        {
          name: "John",
          contact: [
            {
              label: "Mobile",
              value: "0400000000"
            }
          ]
        }
      ]
    }}
    onSuccess={data => {
      setState({ output: data });
    }}
  />
  <div>
    <h4>Output</h4>
    <pre>{JSON.stringify(state.output, false, 2)}</pre>
  </div>
</div>;
```

### Reformat the value

You can create your own formatters using regex. The regex should only be anchored to the start, with an initial
distinguishing pattern, e.g. `00`. All subsequent parts should be optional. The pattern should match against both
a minimalist entry (e.g. `0062001122`) and the fully formatted version (e.g. `(00) 6011 1122`).

To prevent the user from entering a value that's too long, consider using `(.*)$/` at the end of the pattern.

When an incomplete value is reformatted, a number of additional formatting characters
will be added to the end of the value. The `formatFilter` is responsible for stripping these values off, to keep
the value consistent. As such, the `formatFilter` will typically be a regex anchored to the end that
matches all inserted characters.

```jsx
initialState = { output: null };
<div>
  <Form
    schema={[
      {
        type: "text",
        map: "format",
        label: "Custom Format",
        description:
          "Add a number that starts with 00 followed by a number of digits",
        formatters: [
          {
            formatPattern: /^(00) ?(\d{0,4})-?(\d{0,4})( #)?(\d{0,1})(.*)$/,
            formatBlueprint: "$1 $2-$3 #$5",
            formatFilter: /[-# ]+$/
          }
        ],
        pattern: /00 \d{4}-\d{4} #\d{1}$/
      },
      {
        type: "text",
        map: "format2",
        label: "Another example",
        description: "Write some letters",
        formatters: [
          {
            formatPattern: /^(\w{2})_?(\w{0,2})_?(\w{0,4})(.*)$/,
            formatBlueprint: "$1_$2_$3",
            formatFilter: /_+$/
          }
        ]
      }
    ]}
    onSuccess={data => {
      setState({ output: data });
    }}
  />
  <div>
    <h4>Output</h4>
    <pre>{JSON.stringify(state.output, false, 2)}</pre>
  </div>
</div>;
```

### Field validations

See below for the available options. Includes `remoteCheck`, which defers to a remote service.

```jsx harmony
initialState = { output: null };
<div>
  <Form
    schema={[
      {
        type: "text",
        map: "required",
        required: true,
        label: "Required field"
      },
      {
        type: "text",
        map: "minLength",
        minLength: 5,
        label: "minLength = 5"
      },
      {
        type: "text",
        map: "maxLength",
        maxLength: 5,
        label: "maxLength = 5"
      },
      {
        type: "number",
        map: "minValue",
        minValue: 1,
        label: "minValue = 1"
      },
      {
        type: "number",
        map: "maxValue",
        maxValue: 5,
        label: "maxValue = 5"
      },
      {
        type: "text",
        map: "mustEqual",
        mustEqual: "value",
        defaultValue: "value",
        label: "mustEqual = value"
      },
      {
        type: "text",
        map: "username",
        label: "Username",
        remoteCheck: "/username"
      }
    ]}
    onSuccess={data => {
      setState({ output: data });
    }}
  />
  <div>
    <h4>Output</h4>
    <pre>{JSON.stringify(state.output, false, 2)}</pre>
  </div>
</div>;
```

### DEBUG: testing

The following is for test purposes only and will be removed soon.

```jsx
import { Form } from "./";

<div data-test="Form-scenario-testDebug">
  <div data-test="form">
    <Form
      disableOnSuccess={false}
      schema={[
        // same as "all inputs"
        {
          label: "Text",
          type: "text",
          map: "text",
          hint: "name.firstName"
        },
        {
          label: "Text multi-line",
          type: "text",
          map: "textMultiLine",
          allowNewlines: true
        },
        // some extra fields to help debug form controller
        {
          label: "A",
          type: "text",
          map: "A"
        },
        {
          label: "B",
          type: "text",
          map: "B"
        },
        {
          label: "C",
          type: "text",
          map: "C"
        },
        {
          label: "Foo A",
          type: "text",
          map: "foo.A",
          allowNewlines: true
        },
        {
          label: "Foo B",
          type: "text",
          map: "foo.B",
          allowNewlines: true
        },
        {
          label: "Foo C",
          type: "text",
          map: "foo.C",
          allowNewlines: true
        }
      ]}
      data={{
        A: "Foo",
        foo: {
          A: "Wiz"
        }
      }}
      onSuccess={data => {
        setState({ output: data });
      }}
    />
  </div>
  <div>
    <h4>Output</h4>
    <pre data-test="output">{JSON.stringify(state.output, false, 2)}</pre>
  </div>
</div>;
```
*/
