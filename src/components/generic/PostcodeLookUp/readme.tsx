import * as React from "react";
import { useState } from "react";

import { PostcodeLookUp } from ".";

export const DemoStandard = () => {
  const [postcode, setPostcode] = useState<string>();

  return (
    <>
      <PostcodeLookUp onValidPostcode={setPostcode} />
      <p>Postcode: {postcode}</p>
    </>
  );
};
