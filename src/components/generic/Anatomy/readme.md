### Basic usage

```jsx harmony
initialState = {
  placeholder: true,
  interactive: false
};

// pretend to load
setTimeout(() => {
  setState({ placeholder: false });
}, 3000);

// anatomy scene - HACK: will break if the key expires
const url =
  "https://human.biodigital.com/widget/?be=2ixD&ui-fullscreen=false&ui-zoom=true&ui-share=false&ui-info=true&dk=e2300c218b9fb224951d19caab6219dc63c4ff2f";

<div style={{ position: "relative", height: "400px" }}>
  <Anatomy
    id={1}
    title={"My scene"}
    anatomyUrl={url}
    fullScreen={true}
    description={"This is an anatomy scene"}
    placeholderUrl={"https://fillmurray.com/640/300"}
    showPlaceholder={state.placeholder}
    isInteractive={state.interactive}
    setInteractive={() => setState({ interactive: !state.interactive })}
  />
</div>;
```

### Body systems

```jsx harmony
initialState = {
  bodySystems: ["Head", "Body"],
  activeBodySystems: []
};

// anatomy scene - HACK: will break if the key expires
const url =
  "https://human.biodigital.com/widget/?be=2ixD&ui-fullscreen=false&ui-zoom=true&ui-share=false&ui-info=true&dk=e2300c218b9fb224951d19caab6219dc63c4ff2f";

<Anatomy
  id={1}
  title={"My scene"}
  anatomyUrl={url}
  description={"This is an anatomy scene"}
  showPlaceholder={false}
  isInteractive={true}
  bodySystemNames={state.bodySystems}
  activeBodySystems={state.activeBodySystems}
  onToggleSystems={n => setState({ activeBodySystems: n })}
/>;
```

### Chapters

```jsx harmony
initialState = {
  chapter: 0
};

// anatomy scene - HACK: will break if the key expires
const url =
  "https://human.biodigital.com/widget/?be=2ixD&ui-fullscreen=false&ui-zoom=true&ui-share=false&ui-info=true&dk=e2300c218b9fb224951d19caab6219dc63c4ff2f";

<Anatomy
  id={1}
  title={"My scene"}
  anatomyUrl={url}
  description={"This is an anatomy scene"}
  showPlaceholder={false}
  isInteractive={true}
  chapterCount={5}
  activeTourChapter={state.chapter}
  onToggleChapter={chapter => setState({ chapter })}
/>;
```
