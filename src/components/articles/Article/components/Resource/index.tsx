import * as React from "react";

import {
  FilesResource,
  IFilesResource,
} from "next-shared/src/models/FilesResource";

import { FileResource } from "../../../../generic/FileResource";

import styles from "./styles.scss";
import { cssComposer } from "../../../../../helpers/cssComposer";
const css = cssComposer(styles, "Resource");

export interface IResourceProps {
  title: string;
  description: string;
  assetUrl: string;
}

export const Resource: React.FC<IResourceProps> = ({
  title,
  description,
  assetUrl,
}) => {
  const resource: IFilesResource = {
    title,
    description,
    assetUrl,
  };

  return <FileResource resource={FilesResource.unserialize(resource)} />;
};
