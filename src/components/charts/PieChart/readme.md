```
initialState = {
  data: [
    {
      label: "A",
      size: 12,
      completed: 4
    },{
      label: "B",
      size: 8,
      completed: 1
    },{
      label: "C",
      size: 10,
      completed: 2
    },{
      label: "D",
      size: 9,
      completed: 2
    },{
      label: "E",
      size: 2,
      completed: 2
    }
  ]
};
const updateState = () => {
  const newData = _.clone(state.data);
  const t = newData[Math.floor(_.random(0, state.data.length - 1))];
  t.completed = Math.min(t.completed + 2, t.size);
  return newData;
}
<div>
  <PieChart data={state.data} />
  <button onClick={() => setState({data: updateState()})}>Button </button>
</div>
```
