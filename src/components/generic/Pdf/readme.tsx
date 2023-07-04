import * as React from "react";

import { Pdf, TPdfNavigation, usePdf } from ".";
import { TypedObservable } from "../../../helpers/observer";

export const DemoSimple: React.FC = () => {
  const src =
    "https://one-disease-storytelling-tool.s3.amazonaws.com/StorytellingToolGuide/Final_-Facilitator-Guide-for-Storytelling-App-1.pdf";
  const navigate = new TypedObservable<TPdfNavigation>();
  const goForward = () => navigate.notify("forward");
  const goBack = () => navigate.notify("back");
  return (
    <div>
      <Pdf src={src} navigate={navigate} />
      <div>
        <button onClick={goBack}>Back</button>
        <button onClick={goForward}>Forward</button>
      </div>
    </div>
  );
};

export const DemoHook: React.FC = () => {
  const [PDFComponent, forward, back] = usePdf(
    "https://one-disease-storytelling-tool.s3.amazonaws.com/StorytellingToolGuide/Final_-Facilitator-Guide-for-Storytelling-App-1.pdf",
  );
  return (
    <>
      <PDFComponent />
      <div>
        <button onClick={back}>Back</button>
        <button onClick={forward}>Forward</button>
      </div>
    </>
  );
};
