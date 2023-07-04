```jsx
import { AnatomiesViewConnected } from "./";
const { Provider } = require("react-redux");
const { createStore, combineReducers, applyMiddleware } = require("redux");
const createSagaMiddleware = require("redux-saga").default;
const MemoryRouter = require("react-router-dom").MemoryRouter;

const { AnatomiesMenu, AnatomiesListing } = require("./index");
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
    <AnatomiesViewConnected />
  </MemoryRouter>
</Provider>;
```
