import * as React from "react";

import { FileIcon, defaultStyles } from "react-file-icon";

import { FilesResource } from "next-shared/src/models/FilesResource";

import { ImgBlock } from "../ImgBlock";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "FileResource");

export interface IFileResourceProps {
  resource: FilesResource;
}

/**
 * Component displaying a preview of a template file to be downloaded
 */
export const FileResource: React.FC<IFileResourceProps> = ({ resource }) => {
  const hasDescription = !!resource.description;

  return (
    <div className={css("")}>
      <div className={css("assets")}>
        {resource.assets.map((a) => (
          // eslint-disable-next-line react/jsx-no-target-blank
          <a
            href={a.assetUrl}
            target="_blank"
            key={a.assetUrl}
            className={css("asset")}
          >
            {a.fileType === "jpg" ? (
              <ImgBlock src={a.assetUrl} className={css("image")} />
            ) : (
              <FileIcon extension={a.fileType} {...defaultStyles[a.fileType]} />
            )}
          </a>
        ))}
      </div>
      <div className={css("description")}>
        <h4>{resource.title}</h4>
        {hasDescription && <p>{resource.description}</p>}
        {/* {!!resource.category && (
          <p>
            <Badge size="sm" variant={"secondary"}>
              {resource.category}
            </Badge>
          </p>
        )} */}
      </div>
    </div>
  );
};
