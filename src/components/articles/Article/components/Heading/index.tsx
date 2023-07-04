import * as React from "react";
import { BlockTitle } from "../../../../structure/Block";

export interface IHeadingProps {
  content: string;
}

/**
 * Renders a block heading.
 */
export const Heading: React.FC<IHeadingProps> = ({ content }) => (
  <BlockTitle>{content}</BlockTitle>
);

export default Heading; // for legacy imports
