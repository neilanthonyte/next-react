```
initialState= {value: null};
<Slider min={10} max={50} value={state.value} onChange={newValue => setState({value: newValue})}/>
```

### Update on props change

```
initialState = {
  min: 5,
  max: 10,
  value: 8
};
<div>
  <Slider
    min={state.min}
    max={state.max}
    showValue={true}
    value={state.value}
    showLimits={true}
    onChange={newValue => setState({value: newValue})}
  />
  <a onClick={() => setState({min:0,max:20})}>Change limits</a>
  <a onClick={() => setState({value:10})}>Change value</a>
</div>
```

### With set initial value

```
initialState= {value: 48};
<Slider min={10} max={50} value={state.value} onChange={newValue => setState({value: newValue})} />
```

### With set step increments

```
initialState= {value: 15.6};
<Slider min={10} max={50} step={0.2} value={state.value} showValue={true} onChange={newValue => setState({value: newValue})} />
```

### With current value

```
initialState= {value: 48};
<Slider min={10} max={50} value={state.value} showValue={true} onChange={newValue => setState({value: newValue})} />
```

### With limits

```
initialState= {value: 48};
<Slider min={10} max={50} value={state.value} showValue={true} showLimits={true} onChange={newValue => setState({value: newValue})} />
```

### With controls

```
initialState= {value: 34};
<Slider min={10} max={50} value={state.value} showValue={true} showControls={true} onChange={newValue => setState({value: newValue})} />
```

### With timestamps

```
const moment = require("moment");
const min = +moment(Date.now()).add(30, "minutes").format("X");
const max = +moment(Date.now()).add(5, "hours").format("X");
const step = +moment.duration(30, "minutes").asSeconds();
const format = (v) => moment.unix(v).format("hh:mm a");
initialState= {value: min};
<Slider min={min} max={max} value={state.value} showValue={true} step={step} formatFn={format} showControls={true} onChange={newValue => setState({value: newValue})} />
```
