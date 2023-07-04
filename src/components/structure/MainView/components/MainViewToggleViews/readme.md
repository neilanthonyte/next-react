```jsx
const Router = require("react-router-dom").MemoryRouter;
const NavLink = require("react-router-dom").NavLink;
const withRouter = require("react-router-dom").withRouter;

// Avoid changing on refresh
const words = {
  short: faker.lorem.words(5),
  mid: faker.lorem.words(100),
  long: faker.lorem.words(300),
};

const Foo = () => (
  <div>
    <header>
      <h1>{words.short}</h1>
    </header>
    <p>
      In-page navigation links: <NavLink to="/tour">jump to tour</NavLink>
    </p>
    <h3>Lots of long content</h3>
    <p>{words.mid}</p>
    <p>{words.mid}</p>
    <p>{words.mid}</p>
  </div>
);

const FooMenu = () => (
  <div>
    <h3>Links</h3>
    <ul>
      <li>
        <NavLink to="/tour">tour 1</NavLink>
      </li>
    </ul>
    <h3>Content</h3>
    <p>{words.mid}</p>
    <p>{words.mid}</p>
    <p>{words.mid}</p>
  </div>
);

const TourFirst = () => (
  <div>
    <header>
      <h1>Welcome</h1>
      <h3>Step 1 of 3</h3>
    </header>
    <p>{words.mid}</p>
    <p>
      <NavLink to="/tour/2">Next page</NavLink>
    </p>
  </div>
);
const TourSecond = () => (
  <div>
    <header>
      <h1>Do something...</h1>
      <h3>Step 2 of 3</h3>
    </header>
    <p>{words.long}</p>
    <p>
      <NavLink to="/tour/3">Next page</NavLink>
    </p>
  </div>
);
const TourThird = () => (
  <div>
    <header>
      <h1>Thanks!</h1>
      <h3>Step 3 of 3</h3>
    </header>
    <p>{words.short}</p>
    <p>
      <NavLink to="/tour/">Start again</NavLink>
    </p>
  </div>
);

const ImageComponent = withRouter(({ match }) => {
  const id = _.get(match, "params.id");
  return (
    <div
      style={{
        backgroundImage: `url("https://picsum.photos/600/800?image=${id}")`,
        backgroundSize: "contain",
        backgroundColor: "#999",
        backgroundPosition: "50%",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        position: "absolute",
      }}
    />
  );
});

const ImageComponentSelect = () => (
  <div>Please select an image from the side menu.</div>
);

const ImageMenu = () => (
  <ul>
    {_.times(10, (i) => (
      <li key={i}>
        <NavLink to={`/images/${i}`}>Image {i}</NavLink>
      </li>
    ))}
  </ul>
);

const FocusImageMenu = () => (
  <ul>
    {_.times(10, (i) => (
      <li key={i}>
        <NavLink to={`/focus-images/${i + 10}`}>Image {i + 10}</NavLink>
      </li>
    ))}
  </ul>
);

const tabs = [
  {
    icon: "avatar-genderless",
    label: "Simple",
    path: "/",
    component: () => <div>Hello world</div>,
  },
  {
    icon: "avatar-genderless",
    label: "With long menu",
    path: "/withMenu",
    component: Foo,
    menu: FooMenu,
  },
  {
    icon: "certificate",
    label: "A tour",
    path: "/tour",
    components: [
      {
        path: "/",
        component: TourFirst,
      },
      {
        path: "/2",
        component: TourSecond,
        focus: {
          redirect: "/tour",
        },
      },
      {
        path: "/3",
        component: TourThird,
      },
    ],
  },
  {
    icon: "edit",
    label: "Images",
    path: "/images",
    menu: ImageMenu,
    components: [
      {
        path: "/",
        component: ImageComponentSelect,
      },
      {
        path: "/:id",
        component: ImageComponent,
      },
    ],
  },
  {
    icon: "edit",
    label: "Images with focus",
    path: "/focus-images",
    menu: FocusImageMenu,
    components: [
      {
        path: "/",
        component: ImageComponentSelect,
      },
      {
        path: "/:id",
        component: ImageComponent,
        focus: {
          redirect: "/focus-images",
        },
      },
    ],
  },
];

<Router>
  <TabbedView tabs={tabs} />
</Router>;
```
