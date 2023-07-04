### Basic

```jsx
import { Faq, FaqBody, FaqHeader, FaqTitle } from "./";

<div>
  <Faq>
    <FaqHeader>{faker.lorem.words(4)}</FaqHeader>
    <FaqBody>{faker.lorem.paragraphs(3)}</FaqBody>
  </Faq>
  <Faq>
    <FaqHeader>{faker.lorem.words(4)}</FaqHeader>
    <FaqBody>{faker.lorem.paragraphs(3)}</FaqBody>
  </Faq>
  <Faq>
    <FaqHeader>{faker.lorem.words(4)}</FaqHeader>
    <FaqBody>{faker.lorem.paragraphs(3)}</FaqBody>
  </Faq>
  <Faq>
    <FaqHeader>{faker.lorem.words(4)}</FaqHeader>
    <FaqBody>{faker.lorem.paragraphs(3)}</FaqBody>
  </Faq>
</div>;
```
