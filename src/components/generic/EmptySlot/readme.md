```
<div style={{ width: "150px", height: "150px"}}>
<EmptySlot />
</div>
```

### With add callback action

```
initialState = {action: ''};
<div style={{ width: "150px", height: "150px"}}>
  <EmptySlot addCallBack={() => setState({action: "Add"})} />
  <h4 style={{marginTop: '32px'}}>Selected action: {state.action}</h4>
</div>
```

### Disabled

```
initialState = {action: ''};
<div style={{ width: "150px", height: "150px"}}>
  <EmptySlot disabled={true} addCallBack={() => setState({action: "Add"})} />
  <h4 style={{marginTop: '32px'}}>Selected action: {state.action}</h4>
</div>
```
