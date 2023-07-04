### App mode

Modified to feel more like an mobile app modal.

```jsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./";

initialState = { open: false };
const openModal = () => setState({ open: true });
const closeModal = () => setState({ open: false });

<div>
  <button onClick={openModal}>Open modal</button>
  <Modal open={state.open} onClose={closeModal} appMode={true}>
    <ModalHeader>Simple centered modal</ModalHeader>
    <ModalBody>
      {_.times(10, (i) => (
        <p>{faker.lorem.words(50)}</p>
      ))}
    </ModalBody>
    <ModalFooter onAccept={closeModal} />
  </Modal>
</div>;
```

### Sizes with content

```jsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./";

initialState = { size: false };
const open = (size) => setState({ size });
const close = () => setState({ size: false });

<div data-test="base-modal-scenario">
  <p data-test="modal-size-buttons">
    <button onClick={() => open("sm")}>Small modal</button>
    <button onClick={() => open("md")}>Medium (default) modal</button>
    <button onClick={() => open("lg")}>Large modal</button>
    <button onClick={() => open("full")}>Full modal</button>
    <button onClick={() => open("liquid")}>Liquid modal (fit to size)</button>
  </p>
  <Modal size={state.size} open={!!state.size} onClose={close}>
    <ModalHeader>Simple centered modal</ModalHeader>
    <ModalBody>{faker.lorem.words(100)}</ModalBody>
    <ModalFooter onAccept={close} />
  </Modal>
</div>;
```

### Sizes, no content (for testing)

```jsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./";

initialState = { size: false };
const open = (size) => setState({ size });
const close = () => setState({ size: false });

<div>
  <p>
    <button onClick={() => open("sm")}>Small modal</button>
    <button onClick={() => open("md")}>Medium (default) modal</button>
    <button onClick={() => open("lg")}>Large modal</button>
    <button onClick={() => open("full")}>Full modal</button>
    <button onClick={() => open("liquid")}>Liquid modal (fit to size)</button>
  </p>
  <Modal size={state.size} open={!!state.size} onClose={close}>
    <ModalHeader>Simple centered modal</ModalHeader>
    <ModalBody>{faker.lorem.words(1)}</ModalBody>
    <ModalFooter onAccept={close} />
  </Modal>
</div>;
```

### Sticky header and footer

```jsx
import { Modal, ModalHeader, ModalBody, ModalFooter } from "./";

initialState = { size: false, appMode: false };
const open = (size, appMode) => setState({ size, appMode });
const close = () => setState({ size: false });

<div>
  <p>
    <button onClick={() => open("sm", false)}>Small modal</button>
    <button onClick={() => open("md", false)}>Medium (default) modal</button>
    <button onClick={() => open("lg", false)}>Large modal</button>
    <button onClick={() => open("full", false)}>Full modal</button>
    <button onClick={() => open("liquid", false)}>
      Liquid modal (fit to size)
    </button>
    <button onClick={() => open("sm", true)}>Small modal (App mode)</button>
    <button onClick={() => open("md", true)}>
      Medium (default) modal (App mode)
    </button>
    <button onClick={() => open("lg", true)}>Large modal (App mode)</button>
    <button onClick={() => open("full", true)}>Full modal (App mode)</button>
    <button onClick={() => open("liquid", true)}>
      Liquid modal (fit to size) (App mode)
    </button>
  </p>
  <Modal
    size={state.size}
    open={!!state.size}
    sticky={true}
    appMode={state.appMode}
    onClose={close}
  >
    <ModalHeader>Sticky modal</ModalHeader>
    <ModalBody>{faker.lorem.words(1000)}</ModalBody>
    <ModalFooter onAccept={close} />
  </Modal>
</div>;
```
