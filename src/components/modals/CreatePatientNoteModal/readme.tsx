import * as React from "react";
import { CreatePatientNoteModal } from ".";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { useState } from "react";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const Inner = ({ close }: { close: () => void }) => {
  return (
    <CreatePatientNoteModal
      close={() => close()}
      patientName={mockPatients[0].getDisplayName()}
    />
  );
};

export const Demo = () => {
  const [open, setOpen] = useState(false);
  return (
    <NextAppHandlerWeb>
      <div className="debug">
        <button onClick={() => setOpen(true)}> Show New Note Popup </button>
        {open ? <Inner close={() => setOpen(false)} /> : null}
      </div>
    </NextAppHandlerWeb>
  );
};
