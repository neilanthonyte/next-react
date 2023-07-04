### Simple

```jsx
<div style={{width: '400px'}}>
  <MetricCell value="86.4" unit="kg" />
</div>
```

### With trend

```jsx
<div style={{width: '400px'}}>
  <MetricCell trend="up" value="86.4" unit="kg" />
  <MetricCell trend="down" value="86.4" unit="kg" />
  <MetricCell trend="stable" value="86.4" unit="kg" />
</div>
```

### With goal

```jsx
<div style={{width: '400px'}}>
  <MetricCell value="140/110" goal="110/75" trend="stable"/>
</div>
```

### With fhir goal

```jsx
const fhirGoal = [
  {
    resourceType: "goal",
    id: "222",
    identifier: [
      {
        value: "123"
      }
    ],
    status: "in-progress",
    subject: {
      reference: "Patient/example",
      display: "Peter James Chalmers"
    },
    startDate: "2015-04-05",
    target: {
      measure: {
        coding: [
          {
            system: "http://loinc.org",
            code: "3141-9",
            display: "Weight Measured"
          }
        ]
      },
      detailQuantity: {
        value: 76,
        unit: "kg",
        system: "http://unitsofmeasure.org",
        code: "kg"
      },
      dueDate: "2016-04-05"
    },
    extension: [
      {
        url:
          "http://nextpracticehealth.com/extension/goal/obs-resource-type",
        valueString: "observation:Weight"
      },
      {
        url:
          "http://nextpracticehealth.com/extension/goal/obs-display-name",
        valueString: "Weight"
      },
      {
        url: "http://nextpracticehealth.com/extension/goal/min-value",
        valueInteger: 60
      },
      {
        url: "http://nextpracticehealth.com/extension/goal/max-value",
        valueInteger: 80
      }
    ]
  }
];

<div style={{width: '400px'}}>
  <MetricCell value="140/110" fhirGoals={fhirGoal} trend="stable"/>
</div>
```

### With labels

```jsx
<div style={{width: '400px'}}>
  <MetricCell value="86.4" unit="kg" valueLabel="Last reading" goal="80.0" goalLabel= "Your goal" />
</div>
```
