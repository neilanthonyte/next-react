### Standard usage

```jsx harmony
import { Button } from "../../atoms/Button";
import {
  ButtonToolbar,
  ButtonToolbarLeft,
  ButtonToolbarRight
} from "../ButtonToolbar";
import {
  DetailsPanel,
  DetailsPanelBody,
  DetailsPanelFooter,
  DetailsPanelHeader
} from "./";
import { List, ListItem } from "../List";

const style = { height: "800px" };

<div style={style}>
  <DetailsPanel>
    <DetailsPanelHeader>
      <h3>{faker.lorem.words(1)}</h3>
    </DetailsPanelHeader>
    <DetailsPanelBody>
      <List>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem>{faker.lorem.words(3)}</ListItem>
        <ListItem isActive={true}>Active</ListItem>
        <ListItem badge={3}>With badge</ListItem>
      </List>
    </DetailsPanelBody>
    <DetailsPanelFooter>
      <ButtonToolbar>
        <ButtonToolbarLeft>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </ButtonToolbarLeft>
        <ButtonToolbarRight>
          <Button>Button 3</Button>
          <Button>Button 4</Button>
        </ButtonToolbarRight>
      </ButtonToolbar>
    </DetailsPanelFooter>
  </DetailsPanel>
</div>;
```

### Background State

```jsx harmony
import { Button } from "../../atoms/Button";
import {
  ButtonToolbar,
  ButtonToolbarLeft,
  ButtonToolbarRight
} from "../ButtonToolbar";
import {
  DetailsPanel,
  DetailsPanelBody,
  DetailsPanelFooter,
  DetailsPanelHeader
} from "./";
import { List, ListItem } from "../List";

const style = { height: "300px", border: "1px solid #bbb" };

<>
  <div style={style}>
    <DetailsPanel state={"current"}>
      <DetailsPanelHeader>
        <h3>Current</h3>
      </DetailsPanelHeader>
      <DetailsPanelBody>
        <List>
          <ListItem>{faker.lorem.words(3)}</ListItem>
          <ListItem>{faker.lorem.words(3)}</ListItem>
          <ListItem>{faker.lorem.words(3)}</ListItem>
        </List>
      </DetailsPanelBody>
      <DetailsPanelFooter>
        <ButtonToolbar>
          <ButtonToolbarLeft>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </ButtonToolbarLeft>
          <ButtonToolbarRight>
            <Button>Button 3</Button>
            <Button>Button 4</Button>
          </ButtonToolbarRight>
        </ButtonToolbar>
      </DetailsPanelFooter>
    </DetailsPanel>
  </div>
  <div style={style}>
    <DetailsPanel state={"other"}>
      <DetailsPanelHeader>
        <h3>Other</h3>
      </DetailsPanelHeader>
      <DetailsPanelBody>
        <List>
          <ListItem>{faker.lorem.words(3)}</ListItem>
          <ListItem>{faker.lorem.words(3)}</ListItem>
          <ListItem>{faker.lorem.words(3)}</ListItem>
        </List>
      </DetailsPanelBody>
      <DetailsPanelFooter>
        <ButtonToolbar>
          <ButtonToolbarLeft>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </ButtonToolbarLeft>
          <ButtonToolbarRight>
            <Button>Button 3</Button>
            <Button>Button 4</Button>
          </ButtonToolbarRight>
        </ButtonToolbar>
      </DetailsPanelFooter>
    </DetailsPanel>
  </div>
  <div style={style}>
    <DetailsPanel state={"ready"}>
      <DetailsPanelHeader>
        <h3>Ready</h3>
      </DetailsPanelHeader>
      <DetailsPanelBody>
        <List>
          <ListItem>{faker.lorem.words(3)}</ListItem>
          <ListItem>{faker.lorem.words(3)}</ListItem>
          <ListItem>{faker.lorem.words(3)}</ListItem>
        </List>
      </DetailsPanelBody>
      <DetailsPanelFooter>
        <ButtonToolbar>
          <ButtonToolbarLeft>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </ButtonToolbarLeft>
          <ButtonToolbarRight>
            <Button>Button 3</Button>
            <Button>Button 4</Button>
          </ButtonToolbarRight>
        </ButtonToolbar>
      </DetailsPanelFooter>
    </DetailsPanel>
  </div>
  <div style={style}>
    <DetailsPanel state={"none"}>
      <DetailsPanelHeader>
        <h3>None</h3>
      </DetailsPanelHeader>
      <DetailsPanelBody>
        <List>
          <ListItem>{faker.lorem.words(3)}</ListItem>
          <ListItem>{faker.lorem.words(3)}</ListItem>
          <ListItem>{faker.lorem.words(3)}</ListItem>
        </List>
      </DetailsPanelBody>
      <DetailsPanelFooter>
        <ButtonToolbar>
          <ButtonToolbarLeft>
            <Button>Button 1</Button>
            <Button>Button 2</Button>
          </ButtonToolbarLeft>
          <ButtonToolbarRight>
            <Button>Button 3</Button>
            <Button>Button 4</Button>
          </ButtonToolbarRight>
        </ButtonToolbar>
      </DetailsPanelFooter>
    </DetailsPanel>
  </div>
</>;
```
