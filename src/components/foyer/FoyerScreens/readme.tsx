import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { FoyerScreens } from ".";

const views = [
  {
    icon: "nav-news",
    render: () => (
      <div style={{ backgroundColor: "pink", height: "100vh" }}>
        Ea nulla magna adipisicing dolore Lorem exercitation. Nisi qui commodo
        reprehenderit cupidatat ut aliquip ut. Lorem Lorem tempor exercitation
        aliqua adipisicing nostrud est irure eu adipisicing. Ullamco cupidatat
        quis nisi velit non sunt sint minim proident qui ea quis dolore
        reprehenderit. Sit amet nostrud incididunt ad laborum nisi veniam ut
        laboris anim.
      </div>
    ),
  },
  {
    icon: "nav-anatomy",
    render: () => (
      <div style={{ backgroundColor: "yellow", height: "100vh" }}>
        Nulla ad cupidatat elit reprehenderit ipsum dolor. Anim ad cupidatat
        incididunt fugiat cillum eu velit proident laboris in elit magna quis.
        Consequat consectetur eu esse excepteur dolore ex laborum labore. Mollit
        duis laborum nisi magna est est cupidatat nulla ea duis tempor proident
        dolor velit.
      </div>
    ),
  },
  {
    icon: "nav-doodle",
    render: () => (
      <div style={{ backgroundColor: "orange", height: "100vh" }}>
        Irure sunt sint dolor duis ad do sint esse sit nulla sunt id.
        Adipisicing occaecat commodo laborum occaecat amet dolore sunt irure
        non. Sit ad ad ex Lorem quis ut qui amet. Ad ut in aliquip excepteur ad
        do nostrud nisi. Consectetur nostrud ea excepteur aliquip id et mollit
        ea nostrud ex.
      </div>
    ),
  },
];

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "FoyerScreens",
      scenario: "standard",
    },
  });

  return <FoyerScreens screens={views} />;
};
