### Standard

```jsx
import { MessageBody, Message } from "./";
<Message>
  <MessageBody>{faker.lorem.words(10)}</MessageBody>
</Message>;
```

### With header

```jsx
import { MessageTitle, MessageBody, Message } from "./";
<Message>
  <MessageTitle>Normal message</MessageTitle>
  <MessageBody>{faker.lorem.words(10)}</MessageBody>
</Message>;
```

### Variations

```jsx
import { SuccessMessage, ErrorMessage, MessageTitle, MessageBody } from "./";
<div>
  <ErrorMessage>
    <MessageTitle>Error message</MessageTitle>
    <MessageBody>{faker.lorem.words(10)}</MessageBody>
  </ErrorMessage>
  <SuccessMessage>
    <MessageTitle>Success message</MessageTitle>
    <MessageBody>{faker.lorem.words(10)}</MessageBody>
  </SuccessMessage>
</div>;
```
