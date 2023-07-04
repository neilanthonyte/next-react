### Basic usage

```jsx
const data = _.times(10, i => {
  return [_.random(40, 180), _.random(40, 120)];
});

<div style={{ width: "400px", height: "400px" }}>
  <BloodPressure data={data} />
</div>;
```

### Syncing

```jsx
const data = require("./_examples/simpleBloodPressureData").default;
const setSelection = index => setState({ selection: index });
initialState = { selection: 0 };

<div style={{ width: "400px" }}>
  <BloodPressure
    data={data}
    selectedIndex={state.selection}
    onSelectionChange={setSelection}
  />
  <BloodPressure
    data={data}
    selectedIndex={state.selection}
    onSelectionChange={setSelection}
  />
</div>;
```
