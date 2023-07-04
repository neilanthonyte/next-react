import * as React from "react";
import { useState, useEffect } from "react";

import { CreateStaffMemberForm } from ".";
import { StaffMember } from "next-shared/src/models/StaffMember";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { NextClient } from "../../../client/NextClient";
import { useClient } from "../../../hooks/useClient";

const Inner = () => {
  const [result, setResult] = useState<StaffMember>();
  const client: NextClient = useClient();

  useEffect(() => {
    client.auth.setSessionFromSessionId("1d0c219a-ca84-40ff-ad87-2abbbceae992");
  }, []);

  return (
    <>
      <CreateStaffMemberForm onSuccess={setResult} />
      <div className="debug">
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    </>
  );
};

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <Inner />
    </NextAppHandlerWeb>
  );
};
