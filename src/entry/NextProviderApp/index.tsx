import * as React from "react";

import { NextAutoUpdate } from "../../components/atoms/NextAutoUpdate";
import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";
import { ProviderApp } from "../../components/provider-app/ProviderApp";

export const NextProviderApp: React.FC = () => (
  <NextAppHandlerWeb>
    <NextAutoUpdate />
    <ProviderApp />
  </NextAppHandlerWeb>
);
