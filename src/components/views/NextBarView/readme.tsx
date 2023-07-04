import * as React from "react";
import { CSSProperties, useEffect, useState } from "react";

import { SimpleEventEmitter } from "next-shared/src/lib/SimpleEventEmitter";
import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import { mockPatientsInHelix } from "next-shared/src/mockData/mockPatients";
import { mockMedicalStaffSessionWithAppSerialized } from "next-shared/src/mockData/mockAuth";

import { useClient } from "../../../hooks/useClient";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { useEhrWatcher } from "../../../hooks/watcher/useEhrWatcher";
import { NextBarView } from ".";
import { NextBarHandler } from "../../handlers/NextBarHandler";
import { useDebug } from "next-react/src/debug/DemoWrapper";
import { cloneDeep } from "lodash";

const popupStyle: CSSProperties = {
  backgroundColor: "white",
  width: "100%",
};

const permissions = { a: "a", b: "b", c: "c" };

const scopeNames = [
  "Default room",
  "Lilac room [#a928b0]",
  "Green Room [#014717]",
];

const tabs = [
  {
    icon: "home",
    label: "Tab A",
    permission: permissions.a,
    disabled: false,
    badge: 4,
    component: () => <h1 style={popupStyle}>Tab A</h1>,
  },
  {
    icon: "ipad-2",
    label: "Tab B",
    disabled: false,
    permission: permissions.b,
    component: () => <h1 style={popupStyle}>Tab B</h1>,
  },
  {
    icon: "lotus",
    label: "All access",
    disabled: false,
    component: () => <h1 style={popupStyle}>All access</h1>,
  },
  {
    icon: "faqs",
    label: "All access2",
    disabled: true,
    component: () => <h1 style={popupStyle}>All access2</h1>,
  },
  {
    icon: "pencil",
    label: "Tab B2",
    permission: permissions.b,
    disabled: false,
    component: () => <h1 style={popupStyle}>Tab B2</h1>,
  },
  {
    icon: "drawer",
    label: "Tab A2",
    permission: permissions.a,
    disabled: false,
    component: () => <h1 style={popupStyle}>Tab A2</h1>,
  },
];

const Inner = () => {
  const client = useClient();
  const { setActions, setDebugElement } = useDebug({ isFixed: false });

  const patient = useEhrWatcher(ehrWatcher);

  const [permission, setPermission] = useState<string>();

  const [isFixed, setIsFixed] = useState(false);

  const toggleFixed = () => {
    setIsFixed(!isFixed);
  };
  const togglePatient = () =>
    ehrWatcher.emit("openPatient", patient ? null : mockPatientsInHelix[0]);

  useEffect(() => {
    // TODO not sure why the clone is needed
    const session = cloneDeep(mockMedicalStaffSessionWithAppSerialized);

    client.auth.setSession(
      Session.unserialize({
        ...session,
        permissions: [permission],
      }),
    );
  }, [permission]);

  useEffect(() => {
    setActions([
      {
        label: patient ? "no patient" : "patient",
        action: togglePatient,
      },
    ]);
  }, [setActions, patient]);

  useEffect(() => {
    setDebugElement(
      <p>
        Active permission:
        <select
          onChange={(event) => setPermission(event.target.value)}
          defaultValue={permissions.c}
        >
          {Object.values(permissions).map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </p>,
    );
  }, [permissions]);

  return <NextBarView tabs={tabs} mode={"app"} />;
};

const ehrWatcher = new SimpleEventEmitter();

export const Demo = () => {
  return (
    <NextAppHandlerWeb>
      <NextBarHandler>
        <Inner />
      </NextBarHandler>
    </NextAppHandlerWeb>
  );
};
