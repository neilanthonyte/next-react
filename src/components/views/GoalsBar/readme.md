### Multiple Goals

```jsx harmony
import { GoalsBar } from "./";
const goalsCollection = [
  {
      resourceType: "goal",
      description: {
        text: "Blood Pressure"
      },
      id: "111",
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
              system: "http://loinc.org/",
              code: "8480-6"
            }
          ]
        },
        detailCodeableConcept: {
          coding: [
            {
              system:
                "http://nextpracticehealth.com/BloodPressure/Systolic",
              code: "112",
              extension: [
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/min-value",
                                      valueInteger: 90
                                    },
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/max-value",
                                      valueInteger: 120
                                    }
                                  ]
            },
            {
              system:
                "http://nextpracticehealth.com/BloodPressure/Diastolic",
              code: "79",
              extension: [
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/min-value",
                                      valueInteger: 90
                                    },
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/max-value",
                                      valueInteger: 120
                                    }
                                  ]
            }
          ],
          text: "112/79"
        },
        dueDate: "2016-04-05"
      },
      extension: [
        {
          url:
            "http://nextpracticehealth.com/extension/goal/obs-resource-type",
          valueString: "observation:BloodPressure"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/goal/obs-display-name",
          valueString: "Blood pressure"
        },
        {
          url: "http://nextpracticehealth.com/extension/goal/min-value",
          valueInteger: 105
        },
        {
          url: "http://nextpracticehealth.com/extension/goal/max-value",
          valueInteger: 120
        }
      ]
    },
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

<GoalsBar goalsCollection={goalsCollection} />;
```

### Add Goal

```jsx harmony
import { GoalsBar } from "./";

const goalsCollection = [
  {
      resourceType: "goal",
      description: {
        text: "Blood Pressure"
      },
      id: "111",
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
              system: "http://loinc.org/",
              code: "8480-6"
            }
          ]
        },
        detailCodeableConcept: {
          coding: [
            {
              system:
                "http://nextpracticehealth.com/BloodPressure/Systolic",
              code: "112",
              extension: [
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/min-value",
                                      valueInteger: 90
                                    },
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/max-value",
                                      valueInteger: 120
                                    }
                                  ]
            },
            {
              system:
                "http://nextpracticehealth.com/BloodPressure/Diastolic",
              code: "79",
              extension: [
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/min-value",
                                      valueInteger: 90
                                    },
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/max-value",
                                      valueInteger: 120
                                    }
                                  ]
            }
          ],
          text: "112/79"
        },
        dueDate: "2016-04-05"
      },
      extension: [
        {
          url:
            "http://nextpracticehealth.com/extension/goal/obs-resource-type",
          valueString: "observation:BloodPressure"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/goal/obs-display-name",
          valueString: "Blood pressure"
        },
        {
          url: "http://nextpracticehealth.com/extension/goal/min-value",
          valueInteger: 105
        },
        {
          url: "http://nextpracticehealth.com/extension/goal/max-value",
          valueInteger: 120
        }
      ]
    },
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

<GoalsBar
  goalsCollection={goalsCollection}
  onAdd={function(e) {
    alert("Add Goal");
  }}
/>;
```

### Review / Reject Goals

```jsx harmony
import { GoalsBar } from "./";

const goalsCollection = [
  {
      resourceType: "goal",
      description: {
        text: "Blood Pressure"
      },
      id: "111",
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
              system: "http://loinc.org/",
              code: "8480-6"
            }
          ]
        },
        detailCodeableConcept: {
          coding: [
            {
              system:
                "http://nextpracticehealth.com/BloodPressure/Systolic",
              code: "112",
              extension: [
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/min-value",
                                      valueInteger: 90
                                    },
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/max-value",
                                      valueInteger: 120
                                    }
                                  ]
            },
            {
              system:
                "http://nextpracticehealth.com/BloodPressure/Diastolic",
              code: "79",
              extension: [
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/min-value",
                                      valueInteger: 90
                                    },
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/max-value",
                                      valueInteger: 120
                                    }
                                  ]
            }
          ],
          text: "112/79"
        },
        dueDate: "2016-04-05"
      },
      extension: [
        {
          url:
            "http://nextpracticehealth.com/extension/goal/obs-resource-type",
          valueString: "observation:BloodPressure"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/goal/obs-display-name",
          valueString: "Blood pressure"
        },
        {
          url: "http://nextpracticehealth.com/extension/goal/min-value",
          valueInteger: 105
        },
        {
          url: "http://nextpracticehealth.com/extension/goal/max-value",
          valueInteger: 120
        }
      ]
    },
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

<GoalsBar
  goalsCollection={goalsCollection}
  needsReview={true}
  onReject={function(e) {
    alert("Rejected");
  }}
  onAdd={function(e) {
    alert("Add Goal");
  }}
/>;
```

### Accept / Reject Goals

```jsx harmony
import { GoalsBar } from "./";

const goalsCollection = [
  {
      resourceType: "goal",
      description: {
        text: "Blood Pressure"
      },
      id: "111",
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
              system: "http://loinc.org/",
              code: "8480-6"
            }
          ]
        },
        detailCodeableConcept: {
          coding: [
            {
              system:
                "http://nextpracticehealth.com/BloodPressure/Systolic",
              code: "112",
              extension: [
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/min-value",
                                      valueInteger: 90
                                    },
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/max-value",
                                      valueInteger: 120
                                    }
                                  ]
            },
            {
              system:
                "http://nextpracticehealth.com/BloodPressure/Diastolic",
              code: "79",
              extension: [
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/min-value",
                                      valueInteger: 90
                                    },
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/max-value",
                                      valueInteger: 120
                                    }
                                  ]
            }
          ],
          text: "112/79"
        },
        dueDate: "2016-04-05"
      },
      extension: [
        {
          url:
            "http://nextpracticehealth.com/extension/goal/obs-resource-type",
          valueString: "observation:BloodPressure"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/goal/obs-display-name",
          valueString: "Blood pressure"
        },
        {
          url: "http://nextpracticehealth.com/extension/goal/min-value",
          valueInteger: 105
        },
        {
          url: "http://nextpracticehealth.com/extension/goal/max-value",
          valueInteger: 120
        }
      ]
    },
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

<GoalsBar
  goalsCollection={goalsCollection}
  needsReview={true}
  onAccept={function(e) {
    alert("Accepted");
  }}
  onReject={function(e) {
    alert("Rejected");
  }}
  onAdd={function(e) {
    alert("Add Goal");
  }}
/>;
```

### Goal Wrap

```jsx harmony
import { GoalsBar } from "./";
const goalsCollection = [
  {
      resourceType: "goal",
      description: {
        text: "Blood Pressure"
      },
      id: "111",
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
              system: "http://loinc.org/",
              code: "8480-6"
            }
          ]
        },
        detailCodeableConcept: {
          coding: [
            {
              system:
                "http://nextpracticehealth.com/BloodPressure/Systolic",
              code: "112",
              extension: [
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/min-value",
                                      valueInteger: 90
                                    },
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/max-value",
                                      valueInteger: 120
                                    }
                                  ]
            },
            {
              system:
                "http://nextpracticehealth.com/BloodPressure/Diastolic",
              code: "79",
              extension: [
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/min-value",
                                      valueInteger: 90
                                    },
                                    {
                                      url:
                                        "http://nextpracticehealth.com/extension/goal/max-value",
                                      valueInteger: 120
                                    }
                                  ]
            }
          ],
          text: "112/79"
        },
        dueDate: "2016-04-05"
      },
      extension: [
        {
          url:
            "http://nextpracticehealth.com/extension/goal/obs-resource-type",
          valueString: "observation:BloodPressure"
        },
        {
          url:
            "http://nextpracticehealth.com/extension/goal/obs-display-name",
          valueString: "Blood pressure"
        },
        {
          url: "http://nextpracticehealth.com/extension/goal/min-value",
          valueInteger: 105
        },
        {
          url: "http://nextpracticehealth.com/extension/goal/max-value",
          valueInteger: 120
        }
      ]
    },
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

<GoalsBar
  goalsCollection={goalsCollection}
  onAdd={function(e) {
    alert("Add Goal");
  }}
/>;
```
