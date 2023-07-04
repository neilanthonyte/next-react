
### Example Standard With Header

```jsx harmony

import { Alert } from "./";

<div data-test="alert-scenario-with-children-and-header"> 
  <Alert title="Password Notice"> Watch out! Make sure you've saved your password. </Alert>
</div>

```

### Example Warning With Header

```jsx harmony

import { Alert } from "./";

<div data-test="alert-scenario-with-variant"> 
  <Alert variant="warning" title="Password Notice"> Watch out! Make sure you've saved your password. </Alert>
</div>


```

### Example Danger With Header

```jsx harmony

import { Alert } from "./";

<Alert variant="success" title="Password Notice"> Watch out! Make sure you've saved your password. </Alert>

```

### Example Success With Header

```jsx harmony

import { Alert } from "./";

<Alert variant="danger" title="Password Notice"> Watch out! Make sure you've saved your password. </Alert>

```

### Example Info With Header

```jsx harmony

import { Alert } from "./";

<Alert variant="info" title="Password Notice"> Watch out! Make sure you've saved your password. </Alert>

```

### Example Without Close Button

```jsx harmony

import { Alert } from "./";

<div data-test="alert-scenario-with-no-close">
  <Alert showClose={false}>{faker.lorem.paragraphs(2)} </Alert>
</div>

```


### Example Without Header

```jsx harmony

import { Alert } from "./";

<div data-test="alert-scenario-with-children-no-header">
  <Alert>{faker.lorem.paragraphs(2)} </Alert>
</div>

```
