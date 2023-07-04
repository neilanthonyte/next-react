### Standard usage

For fields with filters (e.g. telecom and medical cards) we only show next supported fields. On save, only ehr fields matching the filter will be replaced, while others will be retained.
For fields without filters, the whole mapped field will be replaced (e.g. addresses and emergency)

```jsx harmony
import { DemoStandard } from "./readme";
<DemoStandard />;
```

### Bare Next patient

If some data section is not available in Next, it is skipped from the comparison

```jsx harmony
import { DemoNextIncomplete } from "./readme";
<DemoNextIncomplete />;
```

### Bare Ehr patient

```jsx harmony
import { DemoEhrIncomplete } from "./readme";
<DemoEhrIncomplete />;
```

### Rich

Example showing behaviour where an ehr patient has multiple fields per section.

```jsx harmony
import { DemoRich } from "./readme";
<DemoRich />;
```
