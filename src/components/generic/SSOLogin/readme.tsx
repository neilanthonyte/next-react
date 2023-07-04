import * as React from "react";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { SSOLogin } from "./index";

export const Demo: React.FC = () => {
  return (
    <NextAppHandlerWeb>
      <SSOLogin>Login with Microsoft</SSOLogin>
    </NextAppHandlerWeb>
  );
};
