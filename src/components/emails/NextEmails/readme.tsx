import * as React from "react";
import { mockHcpsSerialized } from "next-shared/src/mockData/mockHcps";
import { mockNextLocationsSerialized } from "next-shared/src/mockData/mockLocations";

import { EmailRenderer } from "./";

const data = {
  patientName: "Mr Bill Murray",
  practitionerProfileImage: "https://via.placeholder.com/600x600",
  practitionerName: "Dr Steve Jobs",
  time: "12:00pm",
  day: "SAT",
  date: "24",
  month: "April",
  year: "2020",
  multiHcp: [
    {
      practitioners: [
        {
          name: "Bill Bailey",
          start: "10:00am",
          end: "10:15am",
        },
      ],
    },
  ],
  locationImage: "https://via.placeholder.com/600x600",
  locationName: "Mockington",
  locationAddress: {
    streetAddress: "80 Wentworth Avenue",
    suburb: "Surry Hills",
    state: "NSW",
    postcode: "2010",
  },
  locationContactPhone: "(02) 6200 0000",
  locationAppointmentMessage:
    "Aliqua veniam laboris eiusmod non ad aliquip elit velit anim.",
  practitionerAppointmentMessage:
    "Voluptate magna sint ad deserunt culpa consectetur exercitation ea proident cupidatat.",
  manageAppointmentUrl:
    "/manage-appointment?ehrId=asdf-ehrId-1234&ehrAppointmentId=ehrAppointmentId-1234&token=asdfasdfqwer-12341234qwadfs-23rewafdscxz",
  cancelAppointmentUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  formName: "DASS-21",
  formUrl:
    "web-form?form-name=dass-21&key=asdfasdfqwer-12341234qwadfs-23rewafdscxz",
  patientAccessCode: "ABCDEFG",
  telehealthUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  // payments: [
  //   { amount: "$10.50", description: "Deposit" },
  //   { amount: "$10.50", description: "Ham?" }
  // ],
  // paymentsTotal: "$21.00",
  payments: [{ amount: "$40.00", description: "Deposit" }],
  paymentsTotal: "$40.00",
  practitioner: mockHcpsSerialized[0],
  location: mockNextLocationsSerialized[0],
  cmsUrl: "https://website-octo-dev.nextpracticeclinics.com",
};

const names = [
  "patient-booked-appointment",
  "appointment-reminder-5-days",
  "appointment-reminder-1-day",
  "new-subscription",
  "booking-failed",
  "new-appointment-practice",
  "patient-appointment-cancelled",
  "practice-appointment-cancelled",
  "password-reset",
  "web-form",
  "post-consult",
];

export interface IDemoProps {
  name: string;
}

export const Demo: React.FC<IDemoProps> = () => (
  <>
    {names.map((name, index) => (
      <EmailRenderer key={index} templateName={name} data={data} />
    ))}
  </>
);
