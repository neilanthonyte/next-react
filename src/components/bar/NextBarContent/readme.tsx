import * as React from "react";
import * as _ from "lodash";
import * as faker from "faker";

import { usePager } from "../../../hooks/usePager";
import { NextBarContent, NextBarContentBody, NextBarContentFooter } from ".";
import { Card, CardBody } from "../../structure/Card";

const data = _.times(5, () => ({
  title: faker.lorem.words(4),
  description: faker.lorem.words(_.random(10, 100)),
}));

export const Demo = () => {
  const [Pager, pagedData] = usePager(3, data);

  const items = _.times(3, (i: number) =>
    i < pagedData.length ? (
      <Card key={i}>
        <CardBody>
          <h3>{pagedData[i].title}</h3>
          <p>{pagedData[i].description}</p>
        </CardBody>
      </Card>
    ) : (
      <div />
    ),
  );

  return (
    <div style={{ height: "400px" }}>
      <NextBarContent>
        <NextBarContentBody>{items}</NextBarContentBody>
        <NextBarContentFooter>
          <Pager />
        </NextBarContentFooter>
      </NextBarContent>
    </div>
  );
};
