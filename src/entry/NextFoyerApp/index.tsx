import * as React from "react";

import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";
import { FoyerApp } from "../../components/foyer/FoyerApp";

export const NextFoyerApp: React.FC = () => (
  <NextAppHandlerWeb>
    <FoyerApp />
  </NextAppHandlerWeb>
);
