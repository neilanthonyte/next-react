#### Tick duration prop (5s)

```jsx harmony
import { TickContext } from "../../../contexts/TickContext";
import { TickHandler } from "./";
<div data-test="TickHandler-tickDuration-counting">
  <TickHandler tickDuration={5}>
    <TickContext.Consumer>
      {({ tick }) => {
        return (
          <div data-test="time">
            {moment.unix(tick).format("YYYY-MM-DD HH:mm:ss")}
          </div>
        );
      }}
    </TickContext.Consumer>
  </TickHandler>
</div>;
```
