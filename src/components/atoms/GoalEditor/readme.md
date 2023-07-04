```jsx harmony
import { GoalEditor } from ".";
const { weight, weightGoal } = require("../../../helpers/data");
const setNewValue = (newGoals) => setState({ goal: newGoals });
initialState = { goal: weightGoal };

<div>
  <GoalEditor obs={weight} goal={state.goal} onChange={setNewValue} />
  <p>Goal: {JSON.stringify(state.goal, undefined, 2)}</p>
</div>;
```

```jsx harmony
import { GoalEditor } from ".";
const setNewValue = (newGoals) => setState({ goal: newGoals });
const { bp, bpGoal } = require("../../../helpers/data");
initialState = { goal: bpGoal };

<div>
  <GoalEditor obs={bp} goal={state.goal} onChange={setNewValue} />
  <p>Goal: {JSON.stringify(state.goal, undefined, 2)}</p>
</div>;
```
