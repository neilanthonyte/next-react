### Standard Usage

```jsx
import { RichContentEditor } from "./index";

const [value, setValue] = React.useState(null);

<div data-test="RichContentEditor-scenario-basic">
  <RichContentEditor value={value} onInputChange={setValue} />
</div>;
```

### Pre filled content

```jsx
import { RichContentEditor } from "./index";

const [value, setValue] = React.useState(`
<p> Default value <strong> SUP </strong></p>
`);

<div data-test="RichContentEditor-scenario-preset">
  <RichContentEditor value={value} onInputChange={setValue} />;
</div>;
```

### With custom redactor settings

```jsx
import { RichContentEditor } from "./index";

const [value, setValue] = React.useState(`
<p> I have some predefined content, and a custom toolbar! </p>
`);

<RichContentEditor
  value={value}
  onInputChange={setValue}
  redactorConfig={{
    buttons: ["bold", "italic", "lists"],
    toolbarFixed: true
  }}
/>;
```

### Custom tests, only here for integration tests

```jsx
import { RichContentEditor } from "./index";

const [value, setValue] = React.useState(null);

<div data-test="RichContentEditor-scenario-multiple-1">
  <RichContentEditor value={value} onInputChange={setValue} />
</div>;
```

```jsx
import { RichContentEditor } from "./index";

const [value, setValue] = React.useState(null);

<div data-test="RichContentEditor-scenario-multiple-2">
  <RichContentEditor value={value} onInputChange={setValue} />
</div>;
```
