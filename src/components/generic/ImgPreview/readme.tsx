import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { ImgPreview, ImgPreviewActions, ImgPreviewMainImage } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "ImgPreview",
      scenario: "standard",
    },
  });
  const [actionsClicked, setActionsClicked] = React.useState([]);

  return (
    <div data-test="ImgPreview-scenario-action-click">
      <ImgPreview>
        <ImgPreviewMainImage imageUrl="http://www.fillmurray.com/200/200" />
        <ImgPreviewActions
          actions={[
            {
              icon: "cancel",
              onClick: () => {
                setActionsClicked([...actionsClicked, 0]);
              },
            },
            {
              icon: "cancel",
              onClick: () => {
                setActionsClicked([...actionsClicked, 1]);
              },
            },
          ]}
        />
      </ImgPreview>
      <div>
        Actions Clicked History:
        <div data-test="output">
          {actionsClicked &&
            actionsClicked.map((f, i) => {
              return <p data-test={`output-${f}`}>Action {f} was clicked</p>;
            })}
        </div>
        <br />
        <a onClick={() => setActionsClicked([])}>Clear</a>
      </div>
    </div>
  );
};
