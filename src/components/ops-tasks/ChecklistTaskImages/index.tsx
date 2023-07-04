import * as React from "react";

import { useMemo } from "react";
import { ChecklistTask } from "next-shared/src/models/ChecklistTask";
import { IImage, ImageGallery } from "../../generic/ImageGallery";
import { PlaceholderView } from "../../views/PlaceholderView";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

export interface IChecklistTaskImagesProps {
  checklistTasks: ChecklistTask[];
}

export const ChecklistTaskImages: React.FC<IChecklistTaskImagesProps> = ({
  checklistTasks,
}) => {
  const taskImages: IImage[] = useMemo(() => {
    if (checklistTasks === null) {
      return null;
    }

    return checklistTasks
      .filter(
        (checklistTask) =>
          checklistTask.type === "image" && !!checklistTask.imageTmpUrl,
      )
      .map((checklistTask) => {
        return {
          url: checklistTask.imageTmpUrl,
          title: checklistTask.cmsTask.title,
        };
      });
  }, [checklistTasks]);

  return (
    <LoadingBlock isLoading={taskImages === null}>
      {taskImages && taskImages.length > 0 ? (
        <ImageGallery images={taskImages} />
      ) : (
        <PlaceholderView
          stdSize={EStandardSizes.Small}
          icon={"image"}
          instruction={"No Images"}
        />
      )}
    </LoadingBlock>
  );
};
