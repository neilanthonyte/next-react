```jsx harmony
import { TimeGanttChart } from "./";

function m(mins) { // minutes from now
  return Math.floor(Date.now() / 1000) + (60 * mins);
}

const data = [
    { item: "Stephen", range: [m(-90), m(-30)] },
    { item: "Bob", range: [m(-60), m(60)] },
    { item: "Ant", range: [m(-5), m(70)] },
    { item: "Robin", range: [m(0), m(85)] },
    { item: "Anne", range: [m(20), m(80)] },
    { item: "Mark", range: [m(10), m(100)] },
    { item: "Joe", range: [m(50), m(80)] },
    { item: "Eve", range: [m(90), m(110)] }
];

<div>
  <TimeGanttChart chartData={data} showCurrentTime={true} />
</div>;
```
