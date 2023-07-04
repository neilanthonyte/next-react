import * as React from "react";
import { NavLink } from "react-router-dom";

import { ImgBlock } from "../ImgBlock";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { IAuthor } from "next-shared/src/models/Article";
const css = cssComposer(styles, "author");

export interface IAuthorProps {
  author: IAuthor;
  prefix?: string;
  postfix?: string;
}

export const Author: React.FC<IAuthorProps> = ({
  author,
  prefix = "",
  postfix = "",
}) => {
  const { name, profileImage, profileUrl } = author;

  const getName = () => {
    if (!profileUrl) return name;
    if (env.webLinks) {
      return <a href={profileUrl}>{name}</a>;
    }
    return <NavLink to={profileUrl}>{name}</NavLink>;
  };
  return (
    <span className={css("")}>
      {profileImage && (
        <ImgBlock src={profileImage} className={css("avatar")} />
      )}
      <span className={css("name")} data-test="author-name">
        {prefix} {getName()}
        {postfix}
      </span>
    </span>
  );
};
