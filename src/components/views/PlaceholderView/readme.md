```jsx harmony
import { PlaceholderView } from "./";

<PlaceholderView />;
```

### Dynamic Scaling

```jsx harmony
import { PlaceholderView } from "./";
import { Button } from "../../atoms/Button";

const [data, setData] = React.useState({
  width: 500,
});

<div style={{ width: data.width }}>
  <PlaceholderView />
  <Button
    onClick={() => {
      const newData = { ...data };
      newData.width = Math.floor(Math.random() * 1200) + 50;
      setData(newData);
    }}
  >
    Change View
  </Button>
</div>;
```

### Custom Icon & Instructions

```jsx harmony
import { PlaceholderView } from "./";

<PlaceholderView icon={"tick"} instruction={"How Now Brown Cow"} />;
```

### Using size

```jsx harmony
import { PlaceholderView } from "./";

<PlaceholderView
  stdSize={EStandardSizes.Small}
  icon={"tick"}
  instruction={"How Now Brown Cow"}
/>;
```
