import * as _ from "lodash";

/**
 * Basic data set.
 */
export const basicDataSet = [
  {
    label: "Art and Humanities",
    "Not Satisfied": 30,
    "Not Much Satisfied": 40,
    Satisfied: 35,
    "Very Satisfied": 20,
  },
  {
    label: "Sciences",
    "Not Satisfied": 10,
    "Not Much Satisfied": 30,
    Satisfied: 50,
    "Very Satisfied": 15,
  },
  {
    label: "Health Sciences",
    "Not Satisfied": 20,
    "Not Much Satisfied": 30,
    Satisfied: 40,
    "Very Satisfied": 25,
  },
  {
    label: "Social Sciences",
    "Not Satisfied": 10,
    "Not Much Satisfied": 40,
    Satisfied: 65,
    "Very Satisfied": 5,
  },
  {
    label: "Architecture and Engineering",
    "Not Satisfied": 60,
    "Not Much Satisfied": 30,
    Satisfied: 10,
    "Very Satisfied": 5,
  },
  {
    label: "Theology & Religious Studies",
    "Not Satisfied": 40,
    "Not Much Satisfied": 10,
    Satisfied: 5,
    "Very Satisfied": 5,
  },
  {
    label: "Middle Eastern & African Studies",
    "Not Satisfied": 70,
    "Not Much Satisfied": 5,
    Satisfied: 5,
    "Very Satisfied": 10,
  },
  {
    label: "Optometry, Ophthalmology & Orthoptics",
    "Not Satisfied": 40,
    "Not Much Satisfied": 15,
    Satisfied: 20,
    "Very Satisfied": 30,
  },
  {
    label: "Hospitality, Leisure, Recreation & Tourism",
    "Not Satisfied": 20,
    "Not Much Satisfied": 50,
    Satisfied: 40,
    "Very Satisfied": 10,
  },
  {
    label: "General Engineering",
    "Not Satisfied": 80,
    "Not Much Satisfied": 20,
    Satisfied: 10,
    "Very Satisfied": 35,
  },
  {
    label: "Food Science",
    "Not Satisfied": 40,
    "Not Much Satisfied": 30,
    Satisfied: 20,
    "Very Satisfied": 10,
  },
  {
    label: "Electrical & Electronic Engineering",
    "Not Satisfied": 70,
    "Not Much Satisfied": 15,
    Satisfied: 40,
    "Very Satisfied": 60,
  },
  {
    label: "Dentistry",
    "Not Satisfied": 35,
    "Not Much Satisfied": 30,
    Satisfied: 30,
    "Very Satisfied": 30,
  },
  {
    label: "Computer Science",
    "Not Satisfied": 75,
    "Not Much Satisfied": 40,
    Satisfied: 40,
    "Very Satisfied": 10,
  },
  {
    label: "Chemistry",
    "Not Satisfied": 10,
    "Not Much Satisfied": 15,
    Satisfied: 40,
    "Very Satisfied": 5,
  },
  {
    label: "Business & Management Studies",
    "Not Satisfied": 25,
    "Not Much Satisfied": 5,
    Satisfied: 10,
    "Very Satisfied": 20,
  },
  {
    label: "Archaeology",
    "Not Satisfied": 100,
    "Not Much Satisfied": 20,
    Satisfied: 30,
    "Very Satisfied": 15,
  },
  {
    label: "Accounting & Finance",
    "Not Satisfied": 30,
    "Not Much Satisfied": 10,
    Satisfied: 10,
    "Very Satisfied": 10,
  },
  {
    label: "Biological Sciences",
    "Not Satisfied": 85,
    "Not Much Satisfied": 40,
    Satisfied: 40,
    "Very Satisfied": 60,
  },
  {
    label: "Communication & Media Studies",
    "Not Satisfied": 55,
    "Not Much Satisfied": 20,
    Satisfied: 10,
    "Very Satisfied": 5,
  },
  {
    label: "Drama, Dance & Cinematics",
    "Not Satisfied": 75,
    "Not Much Satisfied": 40,
    Satisfied: 40,
    "Very Satisfied": 10,
  },
  {
    label: "Economics",
    "Not Satisfied": 85,
    "Not Much Satisfied": 10,
    Satisfied: 20,
    "Very Satisfied": 10,
  },
  {
    label: "Geology",
    "Not Satisfied": 5,
    "Not Much Satisfied": 10,
    Satisfied: 5,
    "Very Satisfied": 5,
  },
  {
    label: "Iberian Languages/Hispanic Studies",
    "Not Satisfied": 100,
    "Not Much Satisfied": 5,
    Satisfied: 5,
    "Very Satisfied": 20,
  },
  {
    label: "Law",
    "Not Satisfied": 30,
    "Not Much Satisfied": 15,
    Satisfied: 70,
    "Very Satisfied": 20,
  },
  {
    label: "Mathematics",
    "Not Satisfied": 65,
    "Not Much Satisfied": 45,
    Satisfied: 10,
    "Very Satisfied": 5,
  },
  {
    label: "Nursing",
    "Not Satisfied": 80,
    "Not Much Satisfied": 60,
    Satisfied: 40,
    "Very Satisfied": 60,
  },
  {
    label: "Occupational Therapy",
    "Not Satisfied": 25,
    "Not Much Satisfied": 10,
    Satisfied: 30,
    "Very Satisfied": 40,
  },
  {
    label: "Pharmacology & Pharmacy",
    "Not Satisfied": 90,
    "Not Much Satisfied": 15,
    Satisfied: 30,
    "Very Satisfied": 5,
  },
  {
    label: "Robotics",
    "Not Satisfied": 25,
    "Not Much Satisfied": 80,
    Satisfied: 10,
    "Very Satisfied": 5,
  },
  {
    label: "Sports Science",
    "Not Satisfied": 60,
    "Not Much Satisfied": 15,
    Satisfied: 40,
    "Very Satisfied": 15,
  },
  {
    label: "Town & Country Planning and Landscape Design",
    "Not Satisfied": 30,
    "Not Much Satisfied": 30,
    Satisfied: 30,
    "Very Satisfied": 30,
  },
  {
    label: "Veterinary Medicine",
    "Not Satisfied": 45,
    "Not Much Satisfied": 40,
    Satisfied: 20,
    "Very Satisfied": 10,
  },
  {
    label: "Youth Work",
    "Not Satisfied": 100,
    "Not Much Satisfied": 40,
    Satisfied: 50,
    "Very Satisfied": 60,
  },
];

/**
 * Range data set.
 */
const ranges = [
  {
    minRange: 30,
    maxRange: 80,
  },
  {
    minRange: 40,
    maxRange: 100,
  },
  {
    minRange: 60,
    maxRange: 120,
  },
  {
    minRange: 20,
    maxRange: 50,
  },
  {
    minRange: 40,
    maxRange: 60,
  },
  {
    minRange: 20,
    maxRange: 120,
  },
  {
    minRange: 40,
    maxRange: 80,
  },
  {
    minRange: 60,
    maxRange: 140,
  },
  {
    minRange: 30,
    maxRange: 120,
  },
  {
    minRange: 100,
    maxRange: 200,
  },
  {
    minRange: 100,
    maxRange: 200,
  },
  {
    minRange: 70,
    maxRange: 130,
  },
  {
    minRange: 100,
    maxRange: 200,
  },
  {
    minRange: 80,
    maxRange: 150,
  },
  {
    minRange: 20,
    maxRange: 40,
  },
  {
    minRange: 30,
    maxRange: 180,
  },
  {
    minRange: 10,
    maxRange: 80,
  },
  {
    minRange: 100,
    maxRange: 150,
  },
  {
    minRange: 30,
    maxRange: 120,
  },
  {
    minRange: 100,
    maxRange: 180,
  },
  {
    minRange: 50,
    maxRange: 150,
  },
  {
    minRange: 30,
    maxRange: 80,
  },
  {
    minRange: 30,
    maxRange: 80,
  },
  {
    minRange: 40,
    maxRange: 80,
  },
  {
    minRange: 50,
    maxRange: 150,
  },
  {
    minRange: 50,
    maxRange: 150,
  },
  {
    minRange: 50,
    maxRange: 180,
  },
  {
    minRange: 30,
    maxRange: 80,
  },
  {
    minRange: 40,
    maxRange: 90,
  },
  {
    minRange: 30,
    maxRange: 80,
  },
  {
    minRange: 50,
    maxRange: 150,
  },
  {
    minRange: 50,
    maxRange: 150,
  },
  {
    minRange: 20,
    maxRange: 90,
  },
  {
    minRange: 10,
    maxRange: 110,
  },
];
export let rangeDataSet = _.cloneDeep(basicDataSet);
rangeDataSet = rangeDataSet.map((item: any, index: number) => {
  item.minRange = ranges[index].minRange;
  item.maxRange = ranges[index].maxRange;
  return item;
});

/**
 * Marker data set.
 */
const markers = [
  {
    marker: 60,
  },
  {
    marker: 70,
  },
  {
    marker: 80,
  },
  {
    marker: 100,
  },
  {
    marker: 80,
  },
  {
    marker: 50,
  },
  {
    marker: 90,
  },
  {
    marker: 90,
  },
  {
    marker: 100,
  },
  {
    marker: 75,
  },
  {
    marker: 85,
  },
  {
    marker: 180,
  },
  {
    marker: 105,
  },
  {
    marker: 150,
  },
  {
    marker: 65,
  },
  {
    marker: 60,
  },
  {
    marker: 95,
  },
  {
    marker: 55,
  },
  {
    marker: 190,
  },
  {
    marker: 80,
  },
  {
    marker: 140,
  },
  {
    marker: 100,
  },
  {
    marker: 20,
  },
  {
    marker: 90,
  },
  {
    marker: 110,
  },
  {
    marker: 100,
  },
  {
    marker: 120,
  },
  {
    marker: 60,
  },
  {
    marker: 100,
  },
  {
    marker: 90,
  },
  {
    marker: 70,
  },
  {
    marker: 70,
  },
  {
    marker: 80,
  },
  {
    marker: 180,
  },
];
export let markerDataSet = _.cloneDeep(rangeDataSet);
markerDataSet = markerDataSet.map((item: any, index: number) => {
  item.marker = markers[index].marker;
  return item;
});
