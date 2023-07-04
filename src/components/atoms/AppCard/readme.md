### Standard

```jsx
import { AppCard } from "./";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";

<MockNextApiClient>
  <AppCard
    app={{
      appId: "asdfqwer1234-app-companion",
      label: "Jeff's Companion (Red)",
      accessCode: null,
      type: "companion",
      scopeId: "asdfqwer1234-scope-companion",
      scope: {
        lastActivity: 1572319122,
        scopeId: "asdfqwer1234-scope-companion",
        type: "room",
        cmsLocationId: 4703,
        label: "Back room",
        state: {},
        staffMemberId: null,
        patientId: null,
        staffMember: null,
        patient: null,
        bleDevices: null,
      },
    }}
  />
</MockNextApiClient>;
```

### With access code

```jsx
import { AppCard } from "./";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";

<MockNextApiClient>
  <AppCard
    app={{
      appId: "asdfqwer1234-app-companion",
      label: "Blue Companion",
      accessCode: "123add2",
      type: "companion",
      scopeId: "asdfqwer1234-scope-companion",
      scope: {
        lastActivity: 1572319122,
        scopeId: "asdfqwer1234-scope-companion",
        type: "room",
        cmsLocationId: 4703,
        label: "Back room",
        state: {},
        staffMemberId: null,
        patientId: null,
        staffMember: null,
        patient: null,
        bleDevices: null,
      },
    }}
  />
</MockNextApiClient>;
```
