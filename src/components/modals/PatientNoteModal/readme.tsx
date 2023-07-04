import * as React from "react";
import { PatientNoteModal } from ".";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { useState } from "react";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { mockNotes } from "next-shared/src/mockData/mockFhirPatientResources";

export const Inner = ({ close }: { close: () => void }) => {
  return (
    <PatientNoteModal
      close={() => close()}
      patientName={mockPatients[0].getDisplayName()}
      note={mockNotes[0]}
    />
  );
};

export const Demo = () => {
  const [open, setOpen] = useState(false);
  return (
    <NextAppHandlerWeb>
      <div className="debug">
        <button onClick={() => setOpen(true)}> Show View Note Popup </button>
        {open ? <Inner close={() => setOpen(false)} /> : null}
      </div>
    </NextAppHandlerWeb>
  );
};
