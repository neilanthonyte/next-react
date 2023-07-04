### Basic Usage

```jsx harmony
import { ButtonToolbar, ButtonToolbarLeft, ButtonToolbarRight } from "./";
import { Button } from "../../atoms/Button";

const onClick = () => {};

<ButtonToolbar>
  <ButtonToolbarLeft>
    <Button onClick={onClick}>Button 1</Button>
    <Button onClick={onClick}>Button 2</Button>
  </ButtonToolbarLeft>
  <ButtonToolbarRight>
    <Button onClick={onClick}>Button 3</Button>
    <Button onClick={onClick}>Button 4</Button>
  </ButtonToolbarRight>
</ButtonToolbar>;
```
