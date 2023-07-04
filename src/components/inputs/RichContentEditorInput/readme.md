See the `RichContentEditor` component in atoms for more detailed examples.

### Standard

```jsx
import { RichContentEditorInput } from "./";

const [value, setValue] = React.useState(null);
<div data-test="RichContentEditorInput-scenario-basic">
  <RichContentEditorInput value={value} onInputChange={setValue} />
  <p>
    Selected: "<span data-test="output">{value}</span>"<br />
    <a onClick={() => setValue(null)}>Clear</a>
  </p>
</div>;
```

### With existing content

```jsx
import { RichContentEditorInput } from "./";

const [value, setValue] = React.useState(
  `la la <strong> some content in bold </strong>, testing wooo`
);

<RichContentEditorInput value={value} onInputChange={setValue} />;
```

### With custom options

```jsx
import { RichContentEditorInput } from "./";

const [value, setValue] = React.useState(
  `la la <strong> some content in bold </strong>, testing wooo`
);

<RichContentEditorInput
  value={value}
  onInputChange={setValue}
  redactorConfig={{
    buttons: ["bold", "italic", "lists", "link"]
  }}
/>;
```
