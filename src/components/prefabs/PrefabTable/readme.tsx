import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { cloneDeep, random, times } from "lodash";
import * as faker from "faker";

import { useDebug } from "../../../debug/DemoWrapper";

import { ITableColumn, ITablePagination, PrefabTable } from ".";
import { ITableAction } from "../../atoms/TableActions";
import { Currency } from "../../generic/Currency";
import { TextInput } from "../../inputs/TextInput";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { NumberInput } from "../../inputs/NumberInput";
import { VStack } from "../../structure/VStack";
import { ErrorMessage } from "../../generic/Message";
import { HStack } from "../../structure/HStack";

interface ISimpleData {
  description: string;
  type: string;
  price: number;
  group?: string;
}

const defaultData: ISimpleData[] = [
  {
    description: "Standard",
    type: "MBS",
    price: 750,
    group: "First Group",
  },
  {
    description: "Long",
    type: "MBS",
    price: 600,
    group: "First Group",
  },
  {
    description: "Special",
    type: "MBS",
    price: 600,
    group: "Second Group",
  },
  {
    description: "Foo",
    type: "DVA",
    price: 600,
    group: "Second Group",
  },
  {
    description: "Bar",
    type: "DVA",
    price: 600,
    group: "First Group",
  },
];

const columns: ITableColumn<ISimpleData>[] = [
  {
    heading: "Description",
    width: 60,
    renderCell: (r: ISimpleData) => r.description,
  },
  { heading: "Type", width: 25, renderCell: (r: ISimpleData) => r.type },
  {
    heading: "Price",
    width: 15,
    renderCell: (r: ISimpleData) => <Currency>{r.price / 100}</Currency>,
  },
];

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "PrefabTable",
      scenario: "standard",
    },
  });

  const actions: ITableAction<ISimpleData>[] = useMemo(
    () => [
      {
        label: "Edit",
        icon: "action-edit",
        onClick: setOutput,
      },
      {
        label: "Delete",
        icon: "action-delete",
        onClick: setOutput,
        showInRow: false,
      },
    ],
    [],
  );

  const data = useMemo(() => {
    return cloneDeep(defaultData);
  }, []);

  return (
    <PrefabTable<ISimpleData>
      columns={columns}
      data={data}
      actions={actions}
      onSelection={setOutput}
      groupBy={(item: ISimpleData) => {
        return item?.group || "Unknown Group";
      }}
    />
  );
};

const lotsOfData: ISimpleData[] = times(34, () => ({
  description: faker.lorem.sentence(1),
  price: random(100, 1000),
  type: faker.music.genre(),
}));

export const DemoPagination = () => {
  const { setOutput, setActions } = useDebug({
    test: {
      componentName: "PrefabTable",
      scenario: "pagination",
    },
  });

  const [loadData, setLoadData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    setActions([
      {
        label: "Load data",
        action: () => {
          setLoadData(true);
          setIsLoading(false);
        },
      },
    ]);
  }, []);

  const pageSize = 10;
  const pageCount = Math.ceil(lotsOfData.length / pageSize);
  const pageData = lotsOfData.slice(page * pageSize, (page + 1) * pageSize);

  const pagination: ITablePagination = {
    pageIndex: page,
    pageCount: loadData ? pageCount : 1,
    onPageChange: (newPage: number) => {
      setIsLoading(true);
      setTimeout(() => {
        setPage(newPage);
        setIsLoading(false);
      }, 1000);
    },
  };

  return (
    <PrefabTable<ISimpleData>
      columns={columns}
      data={loadData ? pageData : undefined}
      isLoading={isLoading}
      pagination={pagination}
    />
  );
};

export const DemoEditable = () => {
  const { setActions } = useDebug({
    test: {
      componentName: "PrefabTable",
      scenario: "editable",
    },
  });

  const [editable, setEditable] = React.useState<boolean>(true);
  const [data, setData] = useState<ISimpleData[]>(cloneDeep(defaultData));

  const footer: ISimpleData = {
    description: "",
    type: "Total",
    price: 1200,
  };

  useEffect(() => {
    setActions([
      {
        label: "Toggle edit",
        action: () => setEditable(!editable),
      },
    ]);
  }, [editable]);

  const editColumns = [
    {
      heading: "Description",
      renderCell: (r: ISimpleData, isFooter: boolean) =>
        isFooter ? null : (
          <TextInput
            onInputChange={(value) => {
              // update the value
              const newData = data.map((d) => {
                const row = { ...d };
                if (d === r) {
                  row.description = value;
                }
                return row;
              });
              setData(newData);
            }}
            value={r.description}
            disabled={!editable}
          />
        ),
    },
    { heading: "Type", renderCell: (r: ISimpleData) => r.type },
    {
      heading: "Price",
      renderCell: (r: ISimpleData, isFooter: boolean) =>
        !editable || isFooter ? (
          <Currency>{r.price / 100}</Currency>
        ) : (
          <NumberInput
            onInputChange={(value) => {
              // update the value
              const newData = data.map((d) => {
                const row = { ...d };
                if (d === r) {
                  row.price = value * 100;
                }
                return row;
              });
              setData(newData);
            }}
            value={r.price / 100}
          />
        ),
    },
  ];

  const priceCap = 650;

  const renderPreRow = (data: ISimpleData) => {
    return data.price > priceCap ? (
      <div style={{ padding: "10px 10px 0 10px" }}>
        <ErrorMessage>Please lower the price!</ErrorMessage>
      </div>
    ) : null;
  };
  const renderPostRow = (data: ISimpleData) => {
    return data.description.match("Special") ? (
      <div style={{ padding: "10px", textAlign: "left" }}>
        <label>Please fill in some more details</label>
        <HStack>
          <TextInput onInputChange={() => {}} value={""} />
          <TextInput onInputChange={() => {}} value={""} />
          <TextInput onInputChange={() => {}} value={""} />
        </HStack>
      </div>
    ) : null;
  };

  const actions: ITableAction<ISimpleData>[] = useMemo(() => [], []);

  return (
    <VStack>
      <p>Shows:</p>
      <ul>
        <li>Row colours</li>
        <li>Pre-row information, e.g. warning</li>
        <li>Pre-row information, e.g. inline form</li>
      </ul>
      <PrefabTable<ISimpleData>
        columns={editColumns}
        data={data}
        footerData={footer}
        actions={actions}
        rowStyle={(r) =>
          r.price > priceCap ? { variant: TColorVariants.Warning } : undefined
        }
        renderPreRow={renderPreRow}
        renderPostRow={renderPostRow}
      />
    </VStack>
  );
};
