import * as React from "react";
import moment from "moment";

import { ICardProps, Card, CardBody } from "../../structure/Card";
import { CellType } from "../../structure/Cell";
import { Author } from "../../generic/Author";
import { ArticlePreview } from "next-shared/src/models/Article";
import { VStack } from "../../structure/VStack";
import { truncateText } from "../../../helpers/truncateText";

function stripHtml(html: string) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

export interface IArticleCardProps extends ICardProps {
  article: ArticlePreview;
  disableDescription?: boolean;
  disableUrl?: boolean;
}

export const ArticleCard: React.FC<IArticleCardProps> = ({
  article,
  children,
  disableDescription = false,
  disableUrl = false,
  ...props
}) => {
  const {
    url,
    previewImage,
    posterImage,
    title,
    description,
    authors,
    postDate,
  } = article;

  return (
    <Card url={disableUrl ? null : url} {...props}>
      <CardBody decorationImage={previewImage || posterImage}>
        <VStack size="compact">
          <h3>{title}</h3>
          {!!postDate && (
            <CellType>{`Posted ${moment.unix(postDate).fromNow()}`}</CellType>
          )}
          {!disableDescription && (
            <p>{truncateText(stripHtml(description), 20)}</p>
          )}
          {(authors || []).map((a, i) => (
            <Author key={a.name} author={a} prefix={i === 0 ? "By" : ""} />
          ))}
          {!!children && children}
        </VStack>
      </CardBody>
    </Card>
  );
};
