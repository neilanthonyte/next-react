import * as React from "react";
import { OneTimePaymentModal } from ".";
import { mockPatients } from "next-shared/src/mockData/mockPatients";
import { useState } from "react";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";

export const Inner = ({ close }: { close: () => void }) => {
  return <OneTimePaymentModal close={close} patient={mockPatients[0]} />;
};

export const Demo = () => {
  const [open, setOpen] = useState(false);
  return (
    <NextAppHandlerWeb>
      <div className="debug">
        <button onClick={() => setOpen(true)}>
          Show one time payment modal
        </button>
        {open ? <Inner close={() => setOpen(false)} /> : null}
      </div>
    </NextAppHandlerWeb>
  );
};
