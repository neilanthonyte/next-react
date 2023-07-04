import * as React from "react";
import { useHistory } from "react-router-dom";

import { scrollToAnchor } from "../../../helpers/scrollToAnchor";

export const AnchorScrolling: React.FC = () => {
  const history = useHistory();

  history.listen(() => {
    scrollToAnchor();
  });

  return null;
};
