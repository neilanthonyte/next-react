import * as React from "react";
import { CreatePatientSubscriptionModal } from ".";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { useState } from "react";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { mockSubscriptions } from "next-shared/src/mockData/mockSubscriptions";

export const Inner = ({ close }: { close: () => void }) => {
  return (
    <CreatePatientSubscriptionModal
      close={close}
      patient={mockPatients[0]}
      handlePickSubscription={() => {
        alert("Handlind subscription");
        close;
      }}
      availableSubscriptions={mockSubscriptions}
    />
  );
};

export const Demo = () => {
  const [open, setOpen] = useState(false);
  return (
    <NextAppHandlerWeb>
      <div className="debug">
        <button onClick={() => setOpen(true)}>
          {" "}
          Show Select subscription Popup{" "}
        </button>
        {open ? <Inner close={() => setOpen(false)} /> : null}
      </div>
    </NextAppHandlerWeb>
  );
};
