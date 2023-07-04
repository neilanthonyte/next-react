import * as React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useState, useCallback, useEffect, useRef, useMemo } from "react";

import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";

import { ICssTransition } from "../../../helpers/cssTransitions";
import { FoyerModesContext } from "../FoyerModesContext";
import { ScrollingContent } from "../../generic/ScrollingContent";
import { ArticleComponent } from "../../articles/Article";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import {
  useBlogArticle,
  useBlogArticles,
} from "../../../hooks/content/useBlogArticles";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
const css = cssComposer(styles, "FoyerAutoplayContentView");

const INTERACTION_TIMEOUT = 4000;

export const foyerContentTransition: ICssTransition = {
  appear: styles.foyerContentEnter,
  appearActive: styles.foyerContentEnterActive,
  enter: styles.foyerContentEnter,
  enterActive: styles.foyerContentEnterActive,
  exit: styles.foyerContentExit,
  exitActive: styles.foyerContentExitActive,
};

export interface IFoyerAutoplayContentViewProps {
  /** Landscape mode - tailored design for landscape screens */
  landscape?: boolean;
  /** Font-size multiplier */
  fontSize?: number;
}

export const FoyerAutoplayContentView: React.FC<
  IFoyerAutoplayContentViewProps
> = ({ landscape = false, fontSize }) => {
  const params = useMemo(urlParamsToObject, []);

  const { blogArticles } = useBlogArticles({
    locationSlug: params.locationSlug ? params.locationSlug.toString() : null,
    target: "foyer",
  });

  const { activeMode, modeDuration } = useRequiredContext(FoyerModesContext);

  const [articleCount, setArticleCount] = useState<number>(-1);
  const [activeArticleSlug, setActiveArticleSlug] = useState<string>();

  const { blogArticle } = useBlogArticle(activeArticleSlug);

  const cancelTime = useRef<number>(0);

  useEffect(() => {
    // mute articles if we're playing with the touch
    if (
      !activeMode.showArticle ||
      currentUnixTimestamp() < cancelTime.current
    ) {
      setActiveArticleSlug(null);
      return;
    }
    setArticleCount(articleCount + 1);
  }, [activeMode]);

  useEffect(() => {
    if (articleCount === -1 || !blogArticles || !activeMode.showArticle) {
      return;
    }
    setActiveArticleSlug(blogArticles[articleCount % blogArticles.length].slug);
  }, [articleCount, blogArticles]);

  const onInteraction = useCallback(() => {
    cancelTime.current = currentUnixTimestamp() + INTERACTION_TIMEOUT;
  }, []);

  useEffect(() => {
    document.body.addEventListener("mousedown", onInteraction);
    document.body.addEventListener("touchstart", onInteraction);
    document.body.addEventListener("touchmove", onInteraction);
    return () => {
      document.body.removeEventListener("mousedown", onInteraction);
      document.body.removeEventListener("touchstart", onInteraction);
      document.body.removeEventListener("touchmove", onInteraction);
    };
  }, [onInteraction]);

  const delay = Math.min(modeDuration * 0.2, 4000);
  const duration = modeDuration - delay * 1.5;

  const contentStyle = useMemo(() => {
    let font: number;

    if (typeof fontSize === "undefined") {
      font = landscape ? 1.8 : 1.4;
    } else {
      font = fontSize;
    }

    return {
      fontSize: `${Math.round(font * 100)}%`,
    };
  }, [fontSize]);

  return (
    <>
      <div className={css("")}>
        <TransitionGroup>
          {blogArticle && (
            <CSSTransition
              classNames={foyerContentTransition}
              timeout={2000}
              key={blogArticle.slug}
            >
              <ScrollingContent delay={delay} duration={duration}>
                <div className={css("content")}>
                  <div className={css("inner")} style={contentStyle}>
                    <ArticleComponent
                      article={blogArticle}
                      landscape={landscape}
                    />
                  </div>
                  <div className={css("disableTouch")}></div>
                </div>
              </ScrollingContent>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    </>
  );
};
