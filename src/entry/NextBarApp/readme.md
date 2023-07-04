### Standard usage

To test with real client, the easiest way is to set the session in the debug section with an existing session (look for "sessionId" in the "Settings" tab of a logged in Next Bar). To put a patient, enter the ehr patient id. (available again in the "Settings" tab).
The bar will load the patient (if existing), but will provide mocked name and DOB

```jsx harmony
import { DemoStandard } from "./readme";
<DemoStandard />;
```