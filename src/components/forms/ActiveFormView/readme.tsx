import * as React from "react";
import { useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";

import { createGuid } from "next-shared/src/helpers/guid";
import { MultiFormMenu } from "../MultiFormMenu";
import { ActiveFormView } from ".";
import { ActiveFormHandler } from "../ActiveFormHandler";
import { IFormDetailsMulti, EFormType } from "next-shared/src/types/formTypes";
import { initFormData } from "./example/initFormData";
import { PatientNote } from "../../atoms/PatientNote";

const simpleSchema: IFormDetailsMulti = {
  type: EFormType.Multi,
  sections: [
    {
      label: "First section",
      schema: {
        type: EFormType.Single,
        fields: [
          {
            label: "First field",
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
        fields: [
          {
            label: "Second field",
            map: "foo.secondDetail",
            type: "text",
            required: true,
          },
        ],
      },
    },
    {
      label: "Third section",
      schema: {
        type: EFormType.Single,
        fields: [
          {
            label: "Third field",
            map: "foo.thirdDetail",
            type: "text",
          },
        ],
      },
    },
  ],
};

export const DemoStandard = () => {
  const [result, setResult] = useState();
  return (
    <ActiveFormHandler>
      <div style={{ display: "flex" }}>
        <div style={{ width: "200px" }}>
          <MultiFormMenu />
        </div>
        <div style={{ flexGrow: 1 }}>
          <ActiveFormView
            schema={simpleSchema}
            onSuccess={setResult}
            data={{}}
          />
          <div className="debug">{JSON.stringify(result, null, 2)}</div>
        </div>
      </div>
    </ActiveFormHandler>
  );
};

export const DemoRemoteForm: React.FC = ({}) => {
  const [formUrl, setFormUrl] = useState<string>(
    window.localStorage.getItem("demoMultiFormUrl"),
  );
  let storedData = null;
  try {
    storedData = JSON.parse(window.localStorage.getItem("demoMultiFormData"));
  } catch (error) {
    console.warn("bad data");
  }
  const [data, _setData] = useState<any>(storedData || initFormData);
  const [schema, setSchema] = useState<any>();
  const [output, setOutput] = useState<any>();

  const setUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    window.localStorage.setItem("demoMultiFormUrl", url);
    setFormUrl(url);
  };
  const setData = (data: any) => {
    let json = null;

    try {
      json = JSON.parse(data);
    } catch (error) {
      console.warn("bad data");
    }
    if (json) {
      _setData(json);
      window.localStorage.setItem("demoMultiFormData", data);
    } else {
      _setData(null);
      window.localStorage.removeItem("demoMultiFormData");
    }
  };

  const refresh = useCallback(() => {
    if (!formUrl) return;

    axios
      .get(formUrl)
      .then((res: any) => {
        const schema = res.data;
        setSchema({ ...schema, version: createGuid() });
      })
      .catch();
  }, [formUrl]);

  useEffect(() => {
    refresh();
  }, [formUrl, data]);

  const isMulti = useMemo(() => schema && schema.type === "multi", [schema]);
  const reasonForVisit =
    !!output && output["observation:ReasonForVisit"]?.component[0]?.valueString;

  return (
    <>
      <div>
        <input
          value={formUrl || ""}
          onChange={setUrl}
          placeholder="Form URL"
          style={{ width: "100%" }}
        ></input>
        <a onClick={refresh}>Refresh</a>
      </div>

      <div>
        <textarea
          placeholder="Form data"
          style={{ width: "100%" }}
          onChange={(evt) => setData(evt.target.value)}
          value={!!data ? JSON.stringify(data, null, 2) : ""}
          rows={10}
        />
      </div>

      {schema && (
        <ActiveFormHandler>
          <div style={{ display: "flex" }}>
            {isMulti && (
              <div style={{ width: "200px" }}>
                <MultiFormMenu />
              </div>
            )}
            <div style={{ flexGrow: 1 }}>
              <ActiveFormView
                schema={schema}
                data={data}
                key={schema.version}
                onSuccess={setOutput}
              />
            </div>
          </div>
        </ActiveFormHandler>
      )}
      <div className="debug">
        <pre>{JSON.stringify(output, null, 2)}</pre>
        {!!reasonForVisit && <PatientNote data={JSON.parse(reasonForVisit)} />}
      </div>
    </>
  );
};
