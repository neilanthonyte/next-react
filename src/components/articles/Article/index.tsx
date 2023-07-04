import * as React from "react";
import { useEffect } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";

import {
  Article as ArticleModel,
  ArticlePreview,
} from "next-shared/src/models/Article";

import {
  SlimSection,
  SlimSectionBody,
  SlimSectionHeader,
  SlimSectionTitle,
} from "../../structure/SlimSection";
import { Author } from "../../generic/Author";
import { scrollToAnchor } from "../../../helpers/scrollToAnchor";
import { Button } from "../../generic/Button";
import { ImgBlock } from "../../generic/ImgBlock";
import { VStack } from "../../structure/VStack";
import { HStack } from "../../structure/HStack";
import { contentToSections } from "./helpers/contentToSections";
import {
  IArticleFieldLookup,
  fieldTypeToComponent,
} from "./helpers/fieldTypeToComponent";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { kebabCase } from "lodash";
const css = cssComposer(styles, "Article");

const style: React.CSSProperties = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  minHeight: "400px",
  border: "none",
};

interface IArticleProps {
  article: ArticleModel;
  customFieldLookup?: IArticleFieldLookup;
  /** Landscape layout */
  landscape?: boolean;
  /** Anchor to scroll to */
  anchor?: string;
  nextArticle?: ArticlePreview;
  articleParent?: { title: string; to: string };
}

export const ArticleComponent: React.FC<IArticleProps> = ({
  article,
  customFieldLookup = {},
  landscape = false,
  anchor,
  nextArticle,
  articleParent,
}) => {
  const { posterImage, title, description, content, authors, postDate } =
    article;
  const fieldLookup = { ...customFieldLookup, ...fieldTypeToComponent };
  const sections = content ? contentToSections(content) : [];

  if (article.type === "externalResource") {
    return <iframe style={style} src={article?.resourceUrl} />;
  }

  // scroll into view if needed
  useEffect(() => {
    if (article && anchor) {
      scrollToAnchor(anchor);
    }
  }, [article, anchor]);

  return (
    <article
      className={css("", { "-landscape": landscape })}
      key={article.slug}
      data-test="article"
    >
      {!!posterImage && (
        <div className={css("posterImg")}>
          <ImgBlock src={posterImage} />
        </div>
      )}
      <SlimSection>
        <SlimSectionBody>
          <HStack>
            <VStack>
              {!!articleParent && (
                <div>
                  <NavLink to={articleParent.to}>{articleParent.title}</NavLink>{" "}
                  &gt; {article.title}
                </div>
              )}
              <SlimSectionTitle>{title}</SlimSectionTitle>
              {authors && (
                <div className={css("authors")}>
                  {authors.map((a, i) => (
                    <Author
                      key={a.name}
                      author={a}
                      prefix={i === 0 ? "By" : ""}
                      postfix={
                        i === authors.length - 1
                          ? `, posted ${moment
                              .unix(postDate)
                              .fromNow()
                              .toLowerCase()}`
                          : ""
                      }
                    />
                  ))}
                </div>
              )}
              {description && (
                <div
                  style={{ fontSize: "120%" }}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              )}
            </VStack>
            {/* HACK unclear layout with new design - better to remove for now */}
            {/* {nextArticle && (
              <VStack>
                <div>
                  <label>Next article</label>
                </div>
                <ArticleCard
                  article={nextArticle}
                  variant="wide"
                  disableDescription
                />
              </VStack>
            )} */}
          </HStack>
        </SlimSectionBody>
      </SlimSection>
      {sections.map((section, i) => {
        const sectionId =
          section.anchorId || section.title ? kebabCase(section.title) : false;
        return (
          <SlimSection key={i}>
            {!!sectionId && <div id={sectionId} />}
            {section.title && (
              <SlimSectionHeader>
                <SlimSectionTitle>{section.title}</SlimSectionTitle>
              </SlimSectionHeader>
            )}
            <SlimSectionBody>
              <div className={css("section")}>
                {section.fields.map((field: any, j: number) => {
                  const FieldComponent = fieldLookup[field.type];
                  const id = field.anchorId ? field.anchorId : null;

                  return (
                    <div
                      key={j}
                      className={css("field", `-${field.type}`)}
                      id={id}
                    >
                      {FieldComponent ? (
                        <FieldComponent {...field} />
                      ) : (
                        <div>
                          <code>CONTENT MISSING</code>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </SlimSectionBody>
          </SlimSection>
        );
      })}
      {nextArticle && (
        <ImgBlock
          src={nextArticle.posterImage}
          className={css("posterImg", "lighten")}
        >
          <VStack>
            <label>Next article</label>
            <h2 className={css("next")}>{nextArticle.title}</h2>
            <Button to={nextArticle.url}>Open &gt;</Button>
          </VStack>
        </ImgBlock>
      )}
    </article>
  );
};
