import { Heading } from "../components/Heading";
import { Text } from "../components/Text";
import { CaptionedImage } from "../components/CaptionedImage";
import { Video } from "../components/Video";
import { Resource } from "../components/Resource";
import { Gallery } from "../components/Gallery";
import { BioDigital } from "../../../atoms/BioDigital";

export interface IArticleFieldLookup {
  [key: string]: any;
}

export const fieldTypeToComponent: IArticleFieldLookup = {
  heading: Heading,
  text: Text,
  image: CaptionedImage,
  video: Video,
  resource: Resource,
  gallery: Gallery,
  anatomy: BioDigital,
};
