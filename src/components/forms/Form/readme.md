### Remote form

Hot reloading of a form:

```jsx harmony
import { DemoRemote } from "./readme";
<DemoRemote />;
```

### All input types

```jsx harmony
import { DemoInputs } from "./readme";
<DemoInputs />;
```

### Conditionals

```jsx harmony
import { DemoConditionalForm } from "./readme";
<DemoConditionalForm />;
```

### Scoring

```jsx harmony
import { DemoScoredForm } from "./readme";
<DemoScoredForm />;
```

### Data transformations

Allows data to be remapped prior to be filled into the form. This allows for simpler schema structures by, for
example, mapping array values to specific fields.

The resulting fields will be prefixed with `$` to ensure they do not clash with the existing field values.

```jsx harmony
import { DemoTransformersForm } from "./readme";
<DemoTransformersForm />;
```

### Suggestion validation

```jsx harmony
import { DemoSuggestions } from "./readme";
<DemoSuggestions />;
```
