import * as React from "react";
import * as _ from "lodash";

import {
  LineChart,
  ILineChartPoint,
  ILineOption,
  ILineChartMultiPoint,
} from ".";
import { useState, useMemo } from "react";

export const genData = (count: number, status?: string): ILineChartPoint[] => {
  let value = 0;
  const offset = 1000 * 60 * 60 * 24;

  return _.times(count, (i) => {
    const t = new Date();
    t.setTime(offset * i);

    value += _.random(-40, 60);
    return status ? [t, value, status] : [t, value];
  });
};

export const DemoStandard = () => {
  const [, setRender] = useState<number>();
  const refresh = () => setRender(Math.random());

  return (
    <>
      <div style={{ height: "400px" }}>
        <LineChart
          line={genData(100)}
          legend={{ show: true }}
          xAxis={{ label: "Widgets" }}
          yAxis={{ label: "Date" }}
          lineOptions={[{ label: "Stock trends" }]}
        />
      </div>
      <div style={{ height: "400px" }}>
        <LineChart
          line={genData(10)}
          legend={{ show: true }}
          xAxis={{ label: "Widgets" }}
          yAxis={{ label: "Date" }}
          lineOptions={[
            {
              label: "Scores",
              lineStyle: "hard",
              dotSize: 40,
              dotText: (v) => Math.round(v).toString(),
            },
          ]}
        />
      </div>
      <div style={{ height: "400px" }}>
        <LineChart
          line={genData(5, "warning")}
          legend={{ show: true }}
          xAxis={{ label: "Widgets" }}
          yAxis={{ label: "Date" }}
          lineOptions={[
            {
              label: "Scores",
              lineStyle: "hard",
              dotSize: 40,
              dotText: (v) => Math.round(v).toString(),
            },
          ]}
        />
      </div>
      <p>
        <a onClick={refresh}>Refresh</a>
      </p>
    </>
  );
};

const multiLineData: ILineChartMultiPoint[] = _.times(30, (i) => {
  const t = new Date();
  t.setTime(t.getTime() + i * 1000 * 60);
  // generate random data, including occasional nulls
  const val1 = _.random(0, 50);
  const val2 = Math.random() < 0.9 ? _.random(50, 100) : null;

  return [t, [val1, val2], i > 20];
});

export const DemoMultiLine = () => {
  const [showLegend, setShowLegend] = useState<boolean>(true);
  const [useOptions, setUseOptions] = useState<boolean>(true);

  const lineOptions: ILineOption[] = [
    {
      label: "New South Wales",
      // gradient: [
      //   [0, -1],
      //   [40, 0],
      //   [60, 1],
      //   [80, 2],
      // ],
    },
    {
      label: "Victoria",
      // gradient: [
      //   [0, -1],
      //   [40, 0],
      //   [60, 1],
      //   [80, 2],
      // ],
    },
  ];

  return (
    <>
      <div style={{ height: "400px", border: "1px solid blue" }}>
        <LineChart
          data={multiLineData}
          lineOptions={useOptions ? lineOptions : null}
          legend={{ show: true }}
          key={`key-${useOptions}`}
        />
      </div>
      <p>
        <a onClick={() => setShowLegend(!showLegend)}>Toggle legend</a>
        {" | "}
        <a onClick={() => setUseOptions(!useOptions)}>Toggle options</a>
      </p>
    </>
  );
};

export const DemoColorGradients = () => {
  const data: ILineChartMultiPoint[] = _.times(30, (i) => {
    const t = new Date();
    t.setTime(t.getTime() + i * 1000 * 60);
    return [t, _.random(0, 50), i > 20];
  });

  const lineOptions: ILineOption[] = [
    {
      gradient: [
        [0, -1],
        [40, 0],
        [60, 1],
        [80, 2],
      ],
    },
  ];

  return <LineChart line={data} lineOptions={lineOptions} />;
};

export const DemoSyncedSelection = () => {
  const [selection, setSelection] = useState<number>(0);
  const data = useMemo(() => {
    return genData(10);
  }, []);
  const setDate = (date: Date) => setSelection(date ? date.getTime() : 0);

  return (
    <div>
      <LineChart
        line={data}
        lineOptions={[
          {
            gradient: [
              [0, 0],
              [40, 1],
            ],
          },
        ]}
        selectedDate={selection}
        onSelectionChange={setDate}
      />
      <LineChart
        line={data}
        lineOptions={[
          {
            gradient: [
              [0, 0],
              [40, 1],
            ],
          },
        ]}
        selectedDate={selection}
        onSelectionChange={setDate}
      />
    </div>
  );
};

export const DemoNewData = () => {
  const genPoint = (pending = false): ILineChartPoint => {
    return [new Date(), _.random(0, 100), pending];
  };

  const [data, setData] = useState<ILineChartPoint[]>([genPoint()]);

  const extendChart = () => {
    setData([...data, genPoint(true)]);
  };

  return (
    <>
      <LineChart
        key="chart"
        line={data}
        lineOptions={[
          {
            gradient: [
              [0, -1],
              [40, 0],
              [60, 1],
              [80, 2],
            ],
          },
        ]}
      />
      <p key="controls">
        <a onClick={extendChart}>Add point</a>
      </p>
    </>
  );
};
