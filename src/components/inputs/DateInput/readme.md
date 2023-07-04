### Standard usage

```jsx
import { DateInput } from "./";
initialState = { value: "2015-09-23" };
<div data-test="DateInput-scenario-standard">
  <div data-test="input">
    <DateInput
      onInputChange={value => {
        setState({ value: value });
      }}
      value={state.value}
      maxDate={"2018-01-01"}
      minDate={"2012-01-01"}
      dateFormat={"YYYY-MM-DD"}
    />
  </div>
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
    {" | "}
    <a onClick={() => setState({ value: null })}>Clear all (null)</a>
  </p>
</div>;
```

Disabled:

```jsx
import { DateInput } from "./";
initialState = { value: "2014-08-14" };
<div data-test="DateInput-scenario-disabled">
  <div data-test="input">
    <DateInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
      dateFormat={"YYYY-MM-DD"}
      disabled={true}
    />
  </div>
  <p>
    "<span data-test="output">{state.value}</span>"
  </p>
</div>;
```

### Date ranges

Please note the automatic placement of the default value, namely that the current year is normally
above, but defaults to below when the `maxYear` is this year.

```jsx
import { DateInput } from "./";
const now = moment().format("YYYY-MM-DD");
const inFuture = moment()
  .add(10, "year")
  .format("YYYY-MM-DD");
const inPast = moment()
  .subtract(10, "year")
  .format("YYYY-MM-DD");

<div>
  <p>No max/min</p>
  <DateInput
    onInputChange={value => {
      alert(value);
    }}
    dateFormat={"YYYY-MM-DD"}
  />
  <p>Max set to now</p>
  <DateInput
    onInputChange={value => {
      alert(value);
    }}
    maxDate={now}
    dateFormat={"YYYY-MM-DD"}
  />
  <p>Max in future</p>
  <DateInput
    onInputChange={value => {
      alert(value);
    }}
    maxDate={inFuture}
    dateFormat={"YYYY-MM-DD"}
  />
  <p>Min set to now</p>
  <DateInput
    onInputChange={value => {
      alert(value);
    }}
    minDate={now}
    dateFormat={"YYYY-MM-DD"}
  />
  <p>Min in past</p>
  <DateInput
    onInputChange={value => {
      alert(value);
    }}
    minDate={inPast}
    dateFormat={"YYYY-MM-DD"}
  />
  <p>Both max and min</p>
  <DateInput
    dateFormat={"YYYY-MM-DD"}
    maxDate={inFuture}
    minDate={inPast}
    onInputChange={value => {
      alert(value);
    }}
  />
</div>;
```

### Shortened date inputs

Year month (`YYYY-MM`)

```jsx
import { DateInput } from "./";
initialState = {
  value: "2014-08"
};
<div data-test="DateInput-scenario-shortened-YYYY-MM">
  <div data-test="input">
    <DateInput
      dateFormat={"YYYY-MM"}
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
    {" | "}
    <a onClick={() => setState({ value: null })}>Clear all (null)</a>
  </p>
</div>;
```

Month day (`MM-DD`)

```jsx
import { DateInput } from "./";
initialState = {
  value: "08-24"
};
<div data-test="DateInput-scenario-shortened-MM-DD">
  <div data-test="input">
    <DateInput
      dateFormat={"MM-DD"}
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
    {" | "}
    <a onClick={() => setState({ value: null })}>Clear all (null)</a>
  </p>
</div>;
```

Month only (`MM`)

```jsx
import { DateInput } from "./";
initialState = {
  value: "08"
};
<div data-test="DateInput-scenario-shortened-MM">
  <div data-test="input">
    <DateInput
      dateFormat={"MM"}
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
    {" | "}
    <a onClick={() => setState({ value: null })}>Clear all (null)</a>
  </p>
</div>;
```

Year only (`YYYY`)

```jsx
import { DateInput } from "./";
initialState = {
  value: "2014"
};
<div data-test="DateInput-scenario-shortened-YYYY">
  <div data-test="input">
    <DateInput
      dateFormat={"YYYY"}
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
    {" | "}
    <a onClick={() => setState({ value: null })}>Clear all (null)</a>
  </p>
</div>;
```

### Handle incorrect values

Will clear state and show empty fields if passed a value it does not recognise, or does not match the dateFormat value

```jsx
import { DateInput } from "./";
initialState = {
  output1: "2020-12",
  output2: "2019-11-30",
  output3: "10",
  output4: "2023-12-24"
};
<div>
  <DateInput
    dateFormat={"YYYY-MM"}
    onInputChange={value => {
      setState({ output1: value });
    }}
    value={state.output1}
  />
  <p>
    <p>State: {JSON.stringify(state.output1)} </p>
    <a onClick={() => setState({ output1: "" })}>Clear</a>
    {" | "}
    <a onClick={() => setState({ output1: "2030-12-19" })}>
      Set to "2030-12-19"
    </a>
  </p>
  <br />
  <DateInput
    dateFormat={"YYYY-MM-DD"}
    onInputChange={value => {
      setState({ output2: value });
    }}
    value={state.output2}
  />
  <p>
    <p>State: {JSON.stringify(state.output2)} </p>
    <a onClick={() => setState({ output2: "" })}>Clear</a>
    {" | "}
    <a onClick={() => setState({ output2: "12-19" })}>Set to "12-19"</a>
  </p>
  <br />
  <DateInput
    dateFormat={"MM"}
    onInputChange={value => {
      setState({ output3: value });
    }}
    value={state.output3}
  />
  <p>
    <p>State: {JSON.stringify(state.output3)} </p>
    <a onClick={() => setState({ output3: "" })}>Clear</a>
    {" | "}
    <a onClick={() => setState({ output3: "2030-12-19" })}>
      Set to "2030-12-19"
    </a>
  </p>
  <br />
  <DateInput
    dateFormat={"YYYY-MM-DD"}
    onInputChange={value => {
      setState({ output4: value });
    }}
    value={state.output4}
  />
  <p>
    <p>State: {JSON.stringify(state.output4)} </p>
    <a onClick={() => setState({ output4: "" })}>Clear</a>
    {" | "}
    <a onClick={() => setState({ output4: "22-12-2032" })}>
      Set to "22-12-2032"
    </a>
  </p>
</div>;
```
