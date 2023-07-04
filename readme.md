# Usage

## Setup

When running the project for the first time, you'll need to run `yarn build` to get all the appropriate assets and bundled scripts.

Once this is done, you can then run `yarn dev` to spin up styleguidist to view the components.
It's a good idea to NOT spin up all the components, and use `PATTERN` to limit the components that you wish styleguidist to render. See the examples below.

## Examples

```bash
# specific component
PATTERN="src/**/Icon/index.*" yarn dev
# several components
PATTERN="src/components/base/structure/{List,TableOfContents}/index.*" yarn dev
# folder
PATTERN="src/components/base/structure/*/index.*" yarn dev
```

- You can also set `envConfig` if you want a preset config for your browser - best to set using `localStorage.setItem('envConfig', JSON.stringify(config))`

## Testing

Quick guide:

```bash
yarn testcafe PATH/index.ctrl.ts
```

Full details via [Confluence](https://samprincegroup.atlassian.net/wiki/spaces/SPGS/pages/140345379/Integration+testing+using+TestCafe)

## Helpers

- Create base files for a project: `./scripts/generate.sh component 'COMPONENT_FOLDER_PATH'`
- Create base files for a project: `./scripts/generate.sh hook 'HOOK_FOLDER_PATH'`
- To create all missing component files: `for f in $(find ./src/components/*/* -type d -maxdepth 0); do ./scripts/generate.sh component $f; done`

# Codebase guidelines

## Key components

```tsx
const client = useClient();
// fetch scopes
const { scopes, rooms, companions } = useSyncedScopesForLocation(
  client.auth.session?.locationId,
);
// fetch the patient
const { ehrPatient, nextPatient, scope } = useSyncedSessionData();
```

## Component structure

```
Foo
|- _tests
| |- index.intg.js            # integration test
| |- index.ctrl.js            # integration controller
|- helpers                    # helper functions
| |- someFunction.js
| |- _tests
|   |- someFunction.spec.js   # helper function unit test
|- components                 # sub-components - only usable by this component
| |- SubFoo
|   |- index.tsx
|- index.tsx
|- readme.md
```

## Routing - open on route

```tsx
import { useEffect } from "react";
import { Router } from "react-router";
import { Switch, Route } from "react-router-dom";

import { createMemoryHistory } from "history";
const history = createMemoryHistory();
useEffect(() => {
  history.push("/course/slug-1");
}, []);

<Router history={history}>
  <Switch>
    <Route path="/course/:courseSlug" component={CourseView} />
  </Switch>
</Router>;
```

# Tooling

## Fonts

Converted using:

- https://andrewsun.com/tools/woffer-woff-font-converter/
- https://everythingfonts.com/woff-to-woff2

## Icons

The icons are created and managed using [Icomoon](https://icomoon.io/app/#/select/font).

When exporting the font from Icomoon, please do the following:

- Set the prefix to `icon-`.
- Unzip the package and copy the fonts into the `src/assets/font` folder.
- Copy the individual icon classes from the example to `icons.scss` (under the `// REPLACE BELOW` comment).

## HACK

Had to add @types/hoist-non-react-statics to the project as there is an ongoing bug with the @types/react-redux project. See (https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33690) for more information. This was written on the 2019-05-13.

## PARENT PROJECTS DEPLOYMENT

Deploying apps onto Heroku which use spg-common require a config var `YARN_PRODUCTION = false` to avoid spg-commons compiled folder being deleted.
# next-react
