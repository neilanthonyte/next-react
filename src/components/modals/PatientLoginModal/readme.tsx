import * as React from "react";
import { useState } from "react";

import { PatientLoginModal } from ".";
import { NextClient } from "../../../client/NextClient";
import { ApiClientContext } from "../../../contexts/ApiClientContext";

import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { ErrorResolverHandler } from "../../handlers/ErrorResolverHandler";
import { nextClientFactory } from "../../../client/nextClientFactory";

const Inner = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <PatientLoginModal open={open} onClose={() => setOpen(false)} />
      <div className="debug"></div>
    </>
  );
};

export const DemoStandard = () => {
  return (
    <MockNextApiClient>
      <ErrorResolverHandler>
        <Inner />
      </ErrorResolverHandler>
    </MockNextApiClient>
  );
};
