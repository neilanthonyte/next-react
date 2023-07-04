import { History } from "history";

import { scrollToAnchor } from "./scrollToAnchor";

export function initHashScrolling(history: History) {
  history.listen(() => {
    scrollToAnchor();
  });
}
