## ToastSlice

### Dark (on light bg)

```jsx
const { ToastSlice } = require("./");

<div style={{ padding: 30, backgroundColor: "#eee" }}>
  <ToastSlice
    title="Example toast"
    description="This is a notification / warning message"
    icon="info"
  />
</div>;
```

### Light (on dark bg)

```jsx
const { ToastSlice } = require("./");

<div style={{ padding: 30, backgroundColor: "#444" }}>
  <ToastSlice
    title="Example toast"
    description="This is a notification / warning message"
    icon="info"
    color="light"
  />
</div>;
```

## ToastController

```jsx
initialState = {
  title: "Hello world",
  description: "This is a toast description",
  icon: "info",
  color: "light"
};
const { ToastController, showToast } = require("./");

<div>
  <ToastController />

  <div>
    <div>
      <label>
        Title:
        <input
          type="text"
          value={state.title}
          onChange={e => setState({ title: e.target.value })}
        />
      </label>
    </div>

    <div>
      <label>
        Description:
        <input
          type="text"
          value={state.description}
          onChange={e => setState({ description: e.target.value })}
        />
      </label>
    </div>

    <div>
      <label>
        Icon:
        <input
          type="text"
          value={state.icon}
          onChange={e => setState({ icon: e.target.value })}
        />
      </label>
    </div>
    <div>
      <label>
        Color:
        <select
          value={state.color}
          onChange={e => setState({ color: e.target.value })}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
  </div>

  <button
    onClick={() =>
      showToast({
        title: state.title,
        description: state.description,
        icon: state.icon,
        color: state.color
      })
    }
  >
    Show toast!
  </button>
</div>;
```
