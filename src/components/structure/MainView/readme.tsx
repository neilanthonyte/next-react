import * as React from "react";
import { useState } from "react";
import { MemoryRouter, NavLink, useParams } from "react-router-dom";
import * as faker from "faker";
import * as _ from "lodash";

import { IMainViewRoute, MainView } from ".";
import { Page, PageHeader, PageTitle } from "../Page";
import { TableOfContents, TableOfContentsItem } from "../TableOfContents";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { TPermissions } from "next-shared/src/types/permissions";
import { SideBar, SideBarBody, SideBarHeader, SideBarTitle } from "../SideBar";
import { SideBarSection } from "../SideBarSection";

const words: string = faker.lorem.words(300);

const ImageComponent = ({}) => {
  const { id } = useParams<any>();
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
};

const ImageComponentSelect = () => (
  <Page>
    <PageHeader>
      <PageTitle>Please select an image from the side menu.</PageTitle>
    </PageHeader>
  </Page>
);

const ImageMenu = () => (
  <SideBar>
    <SideBarHeader>
      <SideBarTitle>Images</SideBarTitle>
    </SideBarHeader>
    <SideBarBody>
      <SideBarSection>
        <TableOfContents>
          {_.times(10, (i) => (
            <TableOfContentsItem href={`/images/${i + 10}`} key={i}>
              Image {i + 10}
            </TableOfContentsItem>
          ))}
        </TableOfContents>
      </SideBarSection>
    </SideBarBody>
  </SideBar>
);

const First = () => <div data-test="first">First</div>;
const Second = () => <div data-test="second">Second</div>;

const Secret = () => (
  <div data-test="secret">I REQUIRED A VERY SPECIFIC PERMISSION TO BE HERE</div>
);

const Listing = () => (
  <div>
    <h2>Show a panel</h2>
    <p>
      <NavLink to="/panel/listing/foo">Show more details &gt;</NavLink>
    </p>
    <p>{words}</p>
    <p>{words}</p>
    <p>{words}</p>
    <p>{words}</p>
    <p>{words}</p>
  </div>
);
const ListingItem = () => (
  <div style={{ padding: "20px" }}>
    <h1>Details</h1>
    <p>{words}</p>
    <p>
      <NavLink to="/panel/listing">Close</NavLink>
    </p>
  </div>
);

const routes: IMainViewRoute[] = [
  {
    icon: "avatar-genderless",
    label: "First",
    path: "/",
    component: First,
  },
  {
    icon: "avatar-genderless",
    label: "Second",
    path: "/second",
    component: Second,
  },
  {
    icon: "avatar-genderless",
    label: "SUPER SECRET",
    path: "/secret",
    permission: TPermissions.SystemAdmin,
    component: Secret,
  },
  {
    icon: "edit",
    label: "Images with focus",
    path: "/images",
    menu: ImageMenu,
    routes: [
      {
        path: "/",
        component: ImageComponentSelect,
      },
      {
        path: "/:id",
        component: ImageComponent,
        focus: true,
      },
    ],
  },
  {
    icon: "edit",
    label: "Side panel",
    path: "/panel",
    routes: [
      {
        path: "/listing",
        component: Listing,
        routes: [
          {
            path: "/:id",
            component: ListingItem,
          },
        ],
      },
    ],
  },
];

export const DemoStandard = () => {
  const [fixed, setFixed] = useState<boolean>(false);
  return (
    <NextAppHandlerWeb>
      <div style={{ overflow: "hidden" }} data-test="MainView-scenario-simple">
        <MemoryRouter>
          <MainView routes={routes} fixedPositionedPanels={true} />
        </MemoryRouter>
        <p>
          <a onClick={() => setFixed(!fixed)}>Is fixed: {fixed}</a>
        </p>
      </div>
    </NextAppHandlerWeb>
  );
};

// ### Main view

// The main main navigation component. The following sub-sections show the sub-components that are used by
// the MainView.

// ```jsx
// import { MainView } from "./";

// const Router = require("react-router-dom").MemoryRouter;
// const NavLink = require("react-router-dom").NavLink;
// const withRouter = require("react-router-dom").withRouter;

// // TODO required due to scroll syncing
// const { Provider } = require("react-redux");
// const { createStore, combineReducers } = require("redux");
// import { scrollSync } from "../../../../../compiled/src/reducers/scrollSync";
// const store = createStore(combineReducers({ scrollSync }));
// //const { ScrollContext } = require("../../../contexts/ScrollContext");
// import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";

// import {
//   SideBar,
//   SideBarBody,
//   SideBarTitle,
//   SideBarHeader
// } from "../../structure/SideBar";

// import { Page, PageTitle, PageBody, PageHeader } from "../Page";

// import {
//   PageSection,
//   PageSectionHeader,
//   PageSectionTitle,
//   PageSectionBody
// } from "../PageSection";
// import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";

// // Avoid changing on refresh
// const words = {
//   short: faker.lorem.words(5),
//   mid: faker.lorem.words(100),
//   long: faker.lorem.words(300)
// };

// const Foo = () => (
//   <Page>
//     <PageHeader>
//       <PageTitle>{words.short}</PageTitle>
//     </PageHeader>
//     <PageBody>
//       <PageSection>
//         <PageSectionHeader>
//           <PageSectionTitle>In-page navigation links</PageSectionTitle>
//         </PageSectionHeader>
//         <PageSectionBody>
//           <NavLink to="/tour">jump to tour</NavLink>
//         </PageSectionBody>
//       </PageSection>
//       <PageSection>
//         <PageSectionHeader>
//           <PageSectionTitle>Lots of long content</PageSectionTitle>
//         </PageSectionHeader>
//         <PageSectionBody>
//           <p>{words.mid}</p>
//           <p>{words.mid}</p>
//           <p>{words.mid}</p>
//         </PageSectionBody>
//       </PageSection>
//     </PageBody>
//   </Page>
// );

// const FooMenu = () => (
//   <SideBar>
//     <SideBarTitle>Content</SideBarTitle>
//     <SideBarHeader>Content</SideBarHeader>
//     <SideBarBody>
//       <p>{faker.lorem.words(3)}</p>
//       <p>{faker.lorem.words(3)}</p>
//       <p>{faker.lorem.words(3)}</p>
//     </SideBarBody>
//   </SideBar>
// );

// const TourFirst = () => (
//   <Page>
//     <PageHeader>
//       <PageTitle>Welcome</PageTitle>
//     </PageHeader>
//     <PageBody>
//       <PageSection>
//         <PageSectionHeader>
//           <PageSectionTitle>Step 1 of 3</PageSectionTitle>
//         </PageSectionHeader>
//         <PageSectionBody>
//           <p>{words.mid}</p>
//           <p>
//             <NavLink to="/tour/2">Next page</NavLink>
//           </p>
//         </PageSectionBody>
//       </PageSection>
//     </PageBody>
//   </Page>
// );
// const TourSecond = () => (
//   <Page>
//     <PageHeader>
//       <PageTitle>Do something...</PageTitle>
//     </PageHeader>
//     <PageBody>
//       <PageSection>
//         <PageSectionHeader>
//           <PageSectionTitle>Step 2 of 3</PageSectionTitle>
//         </PageSectionHeader>
//         <PageSectionBody>
//           <p>{words.long}</p>
//           <p>
//             <NavLink to="/tour/3">Next page</NavLink>
//           </p>
//         </PageSectionBody>
//       </PageSection>
//     </PageBody>
//   </Page>
// );
// const TourThird = () => (
//   <Page>
//     <PageTitle>Thanks!</PageTitle>
//     <PageBody>
//       <PageSection>
//         <PageSectionHeader>
//           <PageSectionTitle>Step 3 of 3</PageSectionTitle>
//         </PageSectionHeader>
//         <PageSectionBody>
//           <p>{words.short}</p>
//           <p>
//             <NavLink to="/tour/">Start again</NavLink>
//           </p>
//         </PageSectionBody>
//       </PageSection>
//     </PageBody>
//   </Page>
// );

// const ImageComponent = withRouter(({ match }) => {
//   const id = _.get(match, "params.id");
//   return (
//     <div
//       style={{
//         backgroundImage: `url("https://picsum.photos/600/800?image=${id}")`,
//         backgroundSize: "contain",
//         backgroundColor: "#999",
//         backgroundPosition: "50%",
//         backgroundRepeat: "no-repeat",
//         width: "100%",
//         height: "100%",
//         position: "absolute"
//       }}
//     />
//   );
// });

// const ImageComponentSelect = () => (
//   <Page>
//     <PageHeader>
//       <PageTitle>Please select an image from the side menu.</PageTitle>
//     </PageHeader>
//   </Page>
// );

// const ImageMenu = () => (
//   <ul>
//     {_.times(10, i => (
//       <li key={i}>
//         <NavLink to={`/images/${i}`}>Image {i}</NavLink>
//       </li>
//     ))}
//   </ul>
// );

// const FocusImageMenu = () => (
//   <ul>
//     {_.times(10, i => (
//       <li key={i}>
//         <NavLink to={`/focus-images/${i + 10}`}>Image {i + 10}</NavLink>
//       </li>
//     ))}
//   </ul>
// );

// const routes = [
//   {
//     path: "/",
//     redirect: "/home"
//   },
//   {
//     icon: "avatar-genderless",
//     label: "Home",
//     path: "/home",
//     routes: [
//       {
//         path: "/",
//         component: () => (
//           <Page>
//             <PageHeader>
//               <PageTitle>Welcome</PageTitle>
//             </PageHeader>
//             <PageBody>
//               <PageSection>
//                 <PageSectionBody>
//                   <p>
//                     <NavLink to="/">Jump to ROOT</NavLink>
//                   </p>
//                   <p>
//                     <NavLink to="/hidden">Jump to hidden</NavLink>
//                   </p>
//                 </PageSectionBody>
//               </PageSection>
//             </PageBody>
//           </Page>
//         )
//       }
//     ]
//   },
//   {
//     path: "/hidden",
//     hidden: true,
//     component: () => (
//       <div>
//         <p>Hidden route!</p>
//       </div>
//     )
//   },
//   {
//     icon: "avatar-genderless",
//     label: "With long menu",
//     path: "/top-menu",
//     component: Foo,
//     menu: FooMenu
//   },
//   {
//     icon: "certificate",
//     label: "Sub-menu",
//     path: "/sub-menu",
//     routes: [
//       {
//         path: "/",
//         component: () => (
//           <Page>
//             <PageHeader>
//               <PageTitle>Welcome</PageTitle>
//             </PageHeader>
//             <PageBody>
//               <PageSection>
//                 <PageSectionBody>
//                   <NavLink to="/sub-menu/2">Jump to second item</NavLink>
//                 </PageSectionBody>
//               </PageSection>
//             </PageBody>
//           </Page>
//         )
//       },
//       {
//         path: "/2",
//         component: () => (
//           <Page>
//             <PageHeader>
//               <PageTitle>Article</PageTitle>
//             </PageHeader>
//             <PageBody>
//               <PageSection>
//                 <PageSectionBody>{words.short}</PageSectionBody>
//               </PageSection>
//             </PageBody>
//           </Page>
//         ),
//         menu: () => (
//           <SideBar>
//             <SideBarBody />
//           </SideBar>
//         )
//       }
//     ]
//   },
//   {
//     icon: "certificate",
//     label: "Top and sub-menus",
//     path: "/switch-menu",
//     menu: () => (
//       <SideBar>
//         <SideBarHeader>
//           <SideBarTitle>Top menu</SideBarTitle>
//         </SideBarHeader>
//       </SideBar>
//     ),
//     routes: [
//       {
//         path: "/",
//         component: () => (
//           <Page>
//             <PageHeader>
//               <PageTitle>Welcome</PageTitle>
//             </PageHeader>
//             <PageBody>
//               <PageSection>
//                 <PageSectionBody>
//                   <NavLink to="/switch-menu/2">Jump to second item</NavLink>
//                 </PageSectionBody>
//               </PageSection>
//             </PageBody>
//           </Page>
//         )
//       },
//       {
//         path: "/2",
//         component: () => (
//           <Page>
//             <PageHeader>
//               <PageTitle>Sub menu</PageTitle>
//             </PageHeader>
//             <PageBody>
//               <PageSection>
//                 <PageSectionBody>{words.short}</PageSectionBody>
//               </PageSection>
//             </PageBody>
//           </Page>
//         ),
//         menu: () => (
//           <SideBar>
//             <SideBarHeader>
//               <SideBarTitle>Sub menu</SideBarTitle>
//             </SideBarHeader>
//           </SideBar>
//         )
//       }
//     ]
//   },
//   {
//     icon: "certificate",
//     label: "A tour",
//     path: "/tour",
//     routes: [
//       {
//         path: "/",
//         component: TourFirst
//       },
//       {
//         path: "/2",
//         component: TourSecond,
//         focus: true
//       },
//       {
//         path: "/3",
//         component: TourThird
//       }
//     ]
//   },
//   {
//     icon: "edit",
//     label: "Images",
//     path: "/images",
//     menu: ImageMenu,
//     routes: [
//       {
//         path: "/",
//         component: ImageComponentSelect
//       },
//       {
//         path: "/:id",
//         component: ImageComponent
//       }
//     ]
//   },
//   {
//     icon: "edit",
//     label: "Images with focus",
//     path: "/focus-images",
//     menu: FocusImageMenu,
//     routes: [
//       {
//         path: "/",
//         component: ImageComponentSelect
//       },
//       {
//         path: "/:id",
//         component: ImageComponent,
//         focus: true
//       }
//     ]
//   }
// ];
// const initialState = { scroll: {} };
// const provider = {
//   setScroll: (path, offsetPercent, offsetPixels) => {
//   },
//   scrollOffsets: state.scroll
// };

// import { MainViewDecoration } from "../MainViewDecoration";
// const mySupplement = () => (
//   <MainViewDecoration title="Hello world!" description={faker.lorem.words(5)} />
// );

// <MockSpgApiClient>
//   <Provider store={store}>
//     <Router>
//       <div>
//         <div style={{ overflow: "hidden" }}>
//           <MainView routes={routes} supplement={mySupplement} />
//         </div>
//         <div>
//           <a onClick={() => setState({ scroll: { "/top-menu": 0.5 } })}>
//             Scroll top menu
//           </a>
//         </div>
//       </div>
//     </Router>
//   </Provider>
// </MockSpgApiClient>;
// ```

// ### Scrolling using redux

// ```jsx harmony
// import { MainView } from "./";

// const { Provider, connect } = require("react-redux");
// const { createStore, combineReducers } = require("redux");
// const { withRouter, MemoryRouter } = require("react-router-dom");

// import { scrollSync } from "../../../../reducers/scrollSync";
// const store = createStore(combineReducers({ scrollSync }));

// import { ImgBlock } from "../../atoms/ImgBlock/index";
// import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";

// const initialState = {
//   content2: _.times(10, () => <p>{faker.lorem.words(100)}</p>),
//   content1: _.times(20, () => (
//     <div style={{ marginBottom: "20px", height: "150px" }}>
//       <ImgBlock src={`http://localhost:${6060}/example-image/img1`} />
//     </div>
//   ))
// };

// const mapStateToProps = state => ({ scrollSync: state.scrollSync });

// const StateDump = connect(mapStateToProps)(({ scrollSync }) => (
//   <div>
//     <pre>{JSON.stringify(scrollSync, false, 2)}</pre>
//   </div>
// ));

// const triggerScroll = (path, amount) =>
//   store.dispatch({ type: "SET_SCROLL", path: path, percent: amount });

// const routes = [
//   {
//     icon: "avatar-genderless",
//     label: "Root",
//     path: "/root1",
//     component: () => <div>{state.content1}</div>
//   },
//   {
//     icon: "avatar-genderless",
//     label: "Foo",
//     path: "/foo1",
//     component: () => <div>{state.content2}</div>
//   }
// ];

// <MockSpgApiClient>
//   <Provider store={store}>
//     <MemoryRouter initialEntries={["/foo1"]}>
//         <div>
//           <div style={{ overflow: "hidden" }}>
//             <MainView routes={routes} />
//           </div>
//           <StateDump />
//           <div>
//             <a onClick={() => triggerScroll("/root1_1", 0)}>Scroll root top</a>
//             {" | "}
//             <a onClick={() => triggerScroll("/root1_1", 0.5)}>
//               Scroll root mid
//             </a>
//           </div>
//           <div>
//             <a onClick={() => triggerScroll("/foo1_1", 0)}>Scroll foo top</a>
//             {" | "}
//             <a onClick={() => triggerScroll("/foo1_1", 0.5)}>Scroll foo mid</a>
//           </div>
//         </div>
//     </MemoryRouter>
//   </Provider>
// </MockSpgApiClient>;
// ```

// ### Mobile navigation

// ```jsx harmony
// import { MobileNav } from "./components/MobileNav";
// const initialState = { isOpen: false };

// <MobileNav
//   isOpen={state.isOpen}
//   onToggleOpen={() => setState({ isOpen: !state.isOpen })}
// />;
// ```

// ### Side nav

// ```jsx
// const MemoryRouter = require("react-router-dom").MemoryRouter;

// import { SideNav } from "./components/SideNav";
// import { SideBar, SideBarBody } from "../../structure/SideBar";

// const FooMenu = () => (
//   <SideBar>
//     <SideBarBody />
//   </SideBar>
// );

// // A very long menu to demonstrate the scrolling

// const BarMenu = () => (
//   <SideBar>
//     <SideBarBody />
//   </SideBar>
// );

// const items = [
//   {
//     icon: "location",
//     label: "Foo",
//     path: "/foo",
//     menu: FooMenu
//   },
//   {
//     icon: "edit",
//     label: "Bar",
//     path: "/bar",
//     menu: BarMenu
//   },
//   {
//     icon: "close",
//     label: "Fox",
//     path: "/fox"
//   }
// ];

// const sizes = ["", "-sm"];
// const initialState = {
//   sizeOverride: 0,
//   isHidden: true,
//   isOpenOverride: undefined,
//   isDisabled: false
// };

// import { MainViewDecoration } from "../MainViewDecoration";
// const mySupplement = () => (
//   <MainViewDecoration title="Hello world!" description={faker.lorem.words(5)} />
// );

// <div>
//   <div style={{ position: "relative", height: "10**0vh", overflow: "hidden" }}>
//     <MemoryRouter>
//       <SideNav
//         items={items}
//         isOpenOverride={state.isOpenOverride}
//         isHidden={state.isHidden}
//         isDisabled={state.isDisabled}
//         sizeOverride={sizes[state.sizeOverride]}
//         supplement={mySupplement}
//       />
//     </MemoryRouter>
//   </div>
//   ,<p>
//     <a onClick={() => setState({ isDisabled: !state.isDisabled })}>
//       Toggle disabled
//     </a>
//     {" | "}
//     <a onClick={() => setState({ isOpenOverride: !state.isOpenOverride })}>
//       Toggle open
//     </a>
//     {" | "}
//     <a onClick={() => setState({ isOpenOverride: undefined })}>
//       Auto open (based on menu)
//     </a>
//     {" | "}
//     <a
//       onClick={() =>
//         setState({ sizeOverride: (state.sizeOverride + 1) % sizes.length })
//       }
//     >
//       Toggle sizeOverride
//     </a>
//   </p>
// </div>;
// ```

// ### Focus view

// ```jsx
// const { Button } = require("../../atoms/Button");
// const { FocusView } = require("./components/FocusView");

// const initialState = { isFocused: true };

// <div>
//   <div style={{ height: "100vh" }}>
//     <FocusView
//       isFocused={state.isFocused}
//       onCancelClick={() => setState({ isFocused: false })}
//     >
//       <header>
//         <h1>{faker.lorem.words(3)}</h1>
//       </header>
//       <p>{faker.lorem.words(100)}</p>
//       <p>{faker.lorem.words(100)}</p>
//       <p>{faker.lorem.words(100)}</p>
//       <p>{faker.lorem.words(100)}</p>
//       <p>
//         <Button>Next</Button>
//       </p>
//     </FocusView>
//   </div>
//   ,<p>
//     <a onClick={() => setState({ isFocused: !state.isFocused })}>
//       Toggle focus
//     </a>
//   </p>
// </div>;
// ```

// ### Toggle views

// A generic way to toggle between routes.

// ```jsx
// const Router = require("react-router-dom").MemoryRouter;
// const NavLink = require("react-router-dom").NavLink;

// // TODO required due to scroll syncing
// const { Provider } = require("react-redux");
// const { createStore, combineReducers } = require("redux");

// import { scrollSync } from "../../../../../compiled/src/reducers/scrollSync";
// const store = createStore(combineReducers({ scrollSync }));

// import { MainViewToggleViews } from "./components/MainViewToggleViews";

// const routes = [
//   {
//     path: "/",
//     component: () => (
//       <div>
//         Root view. Jump to <NavLink to="/foo">foo</NavLink>
//       </div>
//     )
//   },
//   {
//     path: "/foo",
//     component: () => (
//       <div>
//         Foo view. Jump to <NavLink to="/bar">next</NavLink> or{" "}
//         <NavLink to="/">root</NavLink>
//       </div>
//     )
//   },
//   {
//     path: "/bar",
//     component: () => (
//       <div>
//         Foo view. Jump to <NavLink to="/foo">prev</NavLink> or{" "}
//         <NavLink to="/">root</NavLink>
//       </div>
//     )
//   }
// ];

// <Provider store={store}>
//   <Router>
//     <MainViewToggleViews routes={routes} />
//   </Router>
// </Provider>;
// ```

// ### Tabbed and linear views

// Switch between views like they are:

// - in a tab arrangement
// - in a linear order

// ```jsx
// const Router = require("react-router-dom").MemoryRouter;
// const NavLink = require("react-router-dom").NavLink;

// // TODO required due to scroll syncing
// const { Provider } = require("react-redux");
// const { createStore, combineReducers } = require("redux");
// import { scrollSync } from "../../../../../compiled/src/reducers/scrollSync";
// const store = createStore(combineReducers({ scrollSync }));

// import { TabbedViews } from "./components/TabbedViews";
// import { LinearViews } from "./components/LinearViews";
// import { SidePanelViews } from "./components/SidePanelViews";

// const routes = [
//   {
//     path: "/",
//     component: () => (
//       <div style={{ backgroundColor: "pink", height: "100vh" }}>
//         Root view. Jump to <NavLink to="/foo">foo</NavLink>
//       </div>
//     )
//   },
//   {
//     path: "/foo",
//     component: () => (
//       <div style={{ backgroundColor: "yellow", height: "100vh" }}>
//         Foo view. Jump to <NavLink to="/bar">next</NavLink> or{" "}
//         <NavLink to="/">root</NavLink>
//       </div>
//     )
//   },
//   {
//     path: "/bar",
//     component: () => (
//       <div style={{ backgroundColor: "orange", height: "100vh" }}>
//         Foo view. Jump to <NavLink to="/foo">prev</NavLink> or{" "}
//         <NavLink to="/">root</NavLink>
//       </div>
//     )
//   }
// ];

// <Provider store={store}>
//   <div>
//     <Router>
//       <LinearViews routes={routes} routingLevel={1} />
//     </Router>
//     <Router>
//       <TabbedViews routes={routes} routingLevel={1} />
//     </Router>
//     <Router>
//       <div style={{ position: "relative", height: "100vh" }}>
//         <SidePanelViews routes={routes} routingLevel={1} />
//       </div>
//     </Router>
//   </div>
// </Provider>;
// ```

// ### Mixed example

// Tabbing and linear mixed together.

// ```jsx
// const Router = require("react-router-dom").MemoryRouter;
// const NavLink = require("react-router-dom").NavLink;

// // TODO required due to scroll syncing
// const { Provider } = require("react-redux");
// const { createStore, combineReducers } = require("redux");
// import { scrollSync } from "../../../../../compiled/src/reducers/scrollSync";
// const store = createStore(combineReducers({ scrollSync }));

// const TabbedViews = require("./components/TabbedViews").default;
// const LinearViews = require("./components/LinearViews").default;

// const subRoutes = [
//   {
//     path: "/foo/first",
//     component: () => (
//       <div style={{ backgroundColor: "yellow", height: "100vh" }}>
//         Foo view. Jump to <NavLink to="/foo/second">next</NavLink> or{" "}
//         <NavLink to="/">root</NavLink>
//       </div>
//     )
//   },
//   {
//     path: "/foo/second",
//     component: () => (
//       <div style={{ backgroundColor: "orange", height: "100vh" }}>
//         Foo view. Jump to <NavLink to="/foo/first">prev</NavLink> or{" "}
//         <NavLink to="/">root</NavLink>
//       </div>
//     )
//   }
// ];

// const routes = [
//   {
//     path: "/",
//     component: () => (
//       <div style={{ backgroundColor: "pink", height: "100vh" }}>
//         Root view. Jump to <NavLink to="/foo/first">foo</NavLink>
//       </div>
//     )
//   },
//   {
//     path: "/foo",
//     component: () => <LinearViews routes={subRoutes} routingLevel={2} />
//   }
// ];

// <Provider store={store}>
//   <Router>
//     <TabbedViews routes={routes} routingLevel={1} />
//   </Router>
// </Provider>;
// ```

// ### No side panel close

// Need to implement your own

// ```jsx harmony
// // const { createStore } = require("redux");
// import { MemoryRouter as Router, NavLink } from "react-router-dom";
// const { Provider } = require("react-redux");
// const store = createStore(() => ({}));

// // import { MainView } from "./";
// import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";

// const routes = [
//   {
//     path: "/",
//     redirect: "/panel"
//   },
//   {
//     icon: "edit",
//     label: "Side panel",
//     path: "/panel",
//     routes: [
//       {
//         path: "/",
//         redirect: "/panel/listing"
//       },
//       {
//         path: "/listing",
//         component: () => (
//           <div>
//             <h2>Show a panel</h2>
//             <p>
//               <NavLink to="/panel/listing/foo">Show more details &gt;</NavLink>
//             </p>
//             <p>{faker.lorem.words(300)}</p>
//             <p>{faker.lorem.words(300)}</p>
//             <p>{faker.lorem.words(300)}</p>
//             <p>{faker.lorem.words(300)}</p>
//             <p>{faker.lorem.words(300)}</p>
//           </div>
//         ),
//         routes: [
//           {
//             path: "/:id",
//             component: () => (
//               <div style={{ padding: "20px" }}>
//                 <h1>Details</h1>
//                 <p>{faker.lorem.words(300)}</p>
//                 <p>
//                   <NavLink to="/panel/listing">Close</NavLink>
//                 </p>
//               </div>
//             )
//           }
//         ]
//       }
//     ]
//   }
// ];

// <MockSpgApiClient>
//   <Provider store={store}>
//     <Router>
//       <div
//         style={{ overflow: "hidden" }}
//         data-test="MainView-scenario-noSidePanelClose"
//       >
//         <MainView
//           routes={routes}
//           fixedPositionedPanels={true}
//           hasSidePanelClose={false}
//         />
//       </div>
//     </Router>
//   </Provider>
// </MockSpgApiClient>;
// ```
