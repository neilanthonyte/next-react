import * as React from "react";
import moment from "moment";
import { useState, useEffect } from "react";

import { NextBarReleasableTableRow } from ".";
import { mockMedicalStaffSession } from "next-shared/src/mockData/mockAuth";
import { mockLetters } from "next-shared/src/mockData/mockLetters";
import { PatientLetter } from "next-shared/src/models/PatientLetter";
import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import { NextAppHandlerWeb } from "../../../../handlers/NextAppHandlerWeb";
import { useClient } from "../../../../../hooks/useClient";

export const Inner = () => {
  const client = useClient();
  const [releasable, setReleasable] = useState(mockLetters[1]);

  const release = () => {
    const newReleasable = {
      ...releasable.serialize(),
      released: moment().unix(),
    };
    setReleasable(PatientLetter.unserialize({ ...newReleasable }));
  };

  const unrelease = () => {
    const newReleasable = {
      ...releasable.serialize(),
      released: false,
    };
    setReleasable(PatientLetter.unserialize({ ...newReleasable }));
  };

  useEffect(() => {
    client.auth.setSession(mockMedicalStaffSession);
  }, [client]);

  return (
    <table>
      <tbody>
        <NextBarReleasableTableRow
          result={releasable}
          onRelease={() => Promise.resolve(release())}
          onUnrelease={() => Promise.resolve(unrelease())}
        />
      </tbody>
    </table>
  );
};

export const Demo = () => {
  return (
    <NextAppHandlerWeb>
      <Inner />
    </NextAppHandlerWeb>
  );
};
