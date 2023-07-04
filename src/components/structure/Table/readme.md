### Pin Striped

```jsx harmony
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./";

<div>
  <Table type={"pinStripe"}>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</div>;
```

<!-- ### Candy Cane

```jsx harmony
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./";

<div>
  <Table type={"candyCane"}>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</div>;
```

### Boxed

```jsx harmony
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./";

<div>
  <Table type={"block"}>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
</div>;
```

### Cell Text State

```jsx harmony
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./";

<div>
  <Table type={"pinStripe"}>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell state={"success"}>{faker.lorem.words(3)}</TableCell>
        <TableCell state={"warning"}>{faker.lorem.words(3)}</TableCell>
        <TableCell state={"danger"}>{faker.lorem.words(3)}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>;
```

### Row Background State

```jsx harmony
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./";

<div>
  <Table type={"pinStripe"}>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow variant={"success"}>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow variant={"warning"}>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow variant={"danger"}>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>;
```

### Alignment

```jsx harmony
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./";

<div>
  <p>
    <Table type={"pinStripe"} alignment={"left"}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
          <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
          <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{faker.lorem.words(3)}</TableCell>
          <TableCell>{faker.lorem.words(3)}</TableCell>
          <TableCell>{faker.lorem.words(3)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </p>
  <p>
    <Table type={"pinStripe"} alignment={"center"}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
          <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
          <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{faker.lorem.words(3)}</TableCell>
          <TableCell>{faker.lorem.words(3)}</TableCell>
          <TableCell>{faker.lorem.words(3)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </p>
  <p>
    <Table type={"pinStripe"} alignment={"right"}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
          <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
          <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{faker.lorem.words(3)}</TableCell>
          <TableCell>{faker.lorem.words(3)}</TableCell>
          <TableCell>{faker.lorem.words(3)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </p>
</div>;
```

### colSpan

```jsx harmony
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./";

<div>
  <Table type={"pinStripe"}>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell colSpan={3}>{faker.lorem.words(20)}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>;
```

### Urgent Column

```jsx harmony
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./";

<div>
  <Table type={"pinStripe"}>
    <TableHeader>
      <TableRow>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell>{faker.lorem.words(3)}</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableCell urgent={true}>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell urgent={true}>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell urgent={true}>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell urgent={true}>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell urgent={true}>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>;
```

### Compact with Buttons Left Aligned

```jsx harmony
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHeaderCell,
  TableCell,
} from "./";
import { Button } from "../../atoms/Button";

<div>
  <Table type={"pinStripe"} sizing={"compact"} alignment={"Left"}>
    <TableHeader>
      <TableRow>
        <TableHeaderCell width="30%">{faker.lorem.words(1)}</TableHeaderCell>
        <TableHeaderCell width="30%">{faker.lorem.words(3)}</TableHeaderCell>
        <TableHeaderCell width="20%">{faker.lorem.words(1)}</TableHeaderCell>
        <TableHeaderCell width="20%">{faker.lorem.words(1)}</TableHeaderCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <TableRow color={"red"}>
        <TableCell>{"Red " + faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>
          <div data-test="btn-kick">
            <Button variant="secondary" size="sm">
              Kick
            </Button>
          </div>
        </TableCell>
        <TableCell>
          <div data-test="btn-assign">
            <Button size="sm">Assign</Button>
          </div>
        </TableCell>
      </TableRow>
      <TableRow color={"blue"}>
        <TableCell>{"Blue " + faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>
          <div data-test="btn-kick">
            <Button variant="secondary" size="sm">
              Kick
            </Button>
          </div>
        </TableCell>
        <TableCell>
          <div data-test="btn-assign">
            <Button size="sm">Assign</Button>
          </div>
        </TableCell>
      </TableRow>
      <TableRow color={"green"}>
        <TableCell>{"Green " + faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>
          <div data-test="btn-kick">
            <Button variant="secondary" size="sm">
              Kick
            </Button>
          </div>
        </TableCell>
        <TableCell>
          <div data-test="btn-assign">
            <Button size="sm">Assign</Button>
          </div>
        </TableCell>
      </TableRow>
      <TableRow color={"yellow"}>
        <TableCell>{"Yellow " + faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>
          <div data-test="btn-kick">
            <Button variant="secondary" size="sm">
              Kick
            </Button>
          </div>
        </TableCell>
        <TableCell>
          <div data-test="btn-assign">
            <Button size="sm">Assign</Button>
          </div>
        </TableCell>
      </TableRow>
      <TableRow color={"aqua"}>
        <TableCell>{"Aqua " + faker.lorem.words(3)}</TableCell>
        <TableCell>{faker.lorem.words(3)}</TableCell>
        <TableCell>
          <div data-test="btn-kick">
            <Button variant="secondary" size="sm">
              Kick
            </Button>
          </div>
        </TableCell>
        <TableCell>
          <div data-test="btn-assign">
            <Button size="sm">Assign</Button>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
</div>;
``` -->
