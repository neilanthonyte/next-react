### Basic icon - takes on current font sizeOverride

```jsx
import { Icon } from "./";
<Icon name="spinner" />;
```

### Preset icon sizes

```jsx
import { Icon } from "./";
<>
  <Icon name="spinner" size="xs" />
  <Icon name="spinner" size="sm" />
  <Icon name="spinner" size="md" />
  <Icon name="spinner" size="lg" />
</>;
```

### Callback on click

```jsx
import { Icon } from "./";
initialState = { action: null };
<div data-test="Icon-scenario-click">
  <div data-test="component">
    <Icon
      name="spinner"
      size="lg"
      onClick={() => setState({ action: "Click" })}
    />
    <h4 style={{ marginTop: "32px" }}>
      Selected action: <span data-test="label">{state.action}</span>
    </h4>
  </div>
</div>;
```

### Icon with a child Icon

```jsx
import { Icon } from "./";
<div data-test="Icon-scenario-child-icon">
  <div data-test="component">
    <Icon name="spinner" size="lg">
      <Icon name="goal" variant="success" />
    </Icon>
  </div>
</div>;
```

### As a link

```jsx
import { Icon } from "./";
import { MemoryRouter } from "react-router-dom";

const setLanguage = (language) => setState({ language });

<MemoryRouter>
  <Icon name="close" to="/foo" />
</MemoryRouter>;
```

### All icons

```jsx
import { AllIcons } from "./";
<AllIcons />;
```
