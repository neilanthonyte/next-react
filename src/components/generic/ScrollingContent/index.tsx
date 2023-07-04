import * as React from "react";
import { useRef, useEffect, useCallback } from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "ScrollingContent");

export interface IScrollingContentProps {
  duration: number;
  delay: number;
  children: any;
}

export const ScrollingContent: React.FC<IScrollingContentProps> = ({
  delay = 0,
  duration = 2000,
  children,
}) => {
  const inner = useRef<HTMLDivElement>();
  const scroll = useRef<{ start: number; distance: number }>();

  const scrollContent = useCallback(() => {
    if (!(inner.current && scroll.current)) {
      return;
    }

    const elapsed = new Date().getTime() - scroll.current.start;
    const progress = Math.max(0, Math.min(1, elapsed / duration));
    inner.current.scrollTop = scroll.current.distance * progress;

    if (progress < 1) {
      requestAnimationFrame(scrollContent);
    }
  }, []);

  useEffect(() => {
    if (!inner.current) {
      return;
    }
    inner.current.scrollTop = 0;
    scroll.current = {
      start: new Date().getTime() + delay,
      distance: inner.current.scrollHeight - inner.current.clientHeight,
    };

    if (scroll.current.distance > 0) {
      requestAnimationFrame(scrollContent);
    }
  }, [inner]);

  return (
    <div className={css("")}>
      <div className={css("inner")} ref={inner}>
        {children}
      </div>
    </div>
  );
};
