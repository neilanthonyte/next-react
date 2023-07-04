```jsx
import { AnatomiesSideBarConnected } from "./";
const { Provider } = require("react-redux");
const { createStore, combineReducers, applyMiddleware } = require("redux");
const createSagaMiddleware = require("redux-saga").default;
const MemoryRouter = require("react-router-dom").MemoryRouter;

const reducer = require("../../../../reducers/anatomies").default;
const saga = require("../../../../sagas/anatomies").default;

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({ anatomies: reducer }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(saga);
store.dispatch({ type: "APP_INIT" });

<Provider store={store}>
  <MemoryRouter>
    <div style={{ width: "200px" }}>
      <AnatomiesSideBarConnected />
    </div>
  </MemoryRouter>
</Provider>;
```
