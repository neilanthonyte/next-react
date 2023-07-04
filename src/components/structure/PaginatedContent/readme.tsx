import * as React from "react";
import faker from "faker";
import times from "lodash/times";

import { useDebug } from "../../../debug/DemoWrapper";

import { PaginatedContent } from ".";
import { Resource, ResourceBody } from "../../generic/Resource";
import { useEffect, useState } from "react";

export const DemoStandard = () => {
  const [itemsQuantity, setItemsQuantity] = useState<number>(4);
  const [itemsPerPage, setItemsPerPage] = useState<number>(2);

  const { setActions, setDebugElement } = useDebug({
    test: {
      componentName: "PaginatedContent",
      scenario: "standard",
    },
  });

  const items = times(itemsQuantity, () => ({
    title: faker.lorem.sentence(4),
    content: faker.lorem.paragraphs(2),
  }));

  useEffect(() => {
    setActions([
      {
        label: "Increase number of items",
        action: () => setItemsQuantity((n) => n + 1),
      },
      {
        label: "Increase items per page",
        action: () => setItemsPerPage((n) => n + 1),
      },
    ]);
  }, []);

  useEffect(() => {
    setDebugElement(
      <>
        <p>Items quantity: {itemsQuantity}</p>
        <p>Items per page: {itemsPerPage}</p>
      </>,
    );
  }, [itemsQuantity, itemsPerPage]);

  return (
    <PaginatedContent itemsPerPage={itemsPerPage}>
      {items.map((item, index) => (
        <Resource fillContainer={true} key={index}>
          <ResourceBody>
            <h4>{item.title}</h4>
            <p>{item.content}</p>
          </ResourceBody>
        </Resource>
      ))}
    </PaginatedContent>
  );
};
