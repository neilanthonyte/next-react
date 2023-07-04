```jsx
import { Legals } from "./";
const lead =
  "<h2>Legal document</h2><p>Ex reprehenderit officia nulla culpa aliquip nostrud consectetur. Esse deserunt enim quis est ea. Voluptate exercitation eiusmod cillum dolore commodo sit laborum ex minim.</p>";

const sections = [
  {
    heading: "First section",
    body:
      "<p>Dolore in amet cillum minim exercitation do nulla. Aliquip elit nisi velit eu id laboris. Dolor officia aute labore Lorem occaecat et dolor.</p>"
  },
  {
    heading: "Second section",
    body:
      "<p>Dolore in amet cillum minim exercitation do nulla. Aliquip elit nisi velit eu id laboris. Dolor officia aute labore Lorem occaecat et dolor.</p>"
  },
  {
    heading: "Third section",
    body:
      "<p>Dolore in amet cillum minim exercitation do nulla. Aliquip elit nisi velit eu id laboris. Dolor officia aute labore Lorem occaecat et dolor.</p>"
  }
];

<Legals lead={lead} sections={sections} />;
```
