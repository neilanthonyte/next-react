import { useCallback, useEffect, useRef } from "react";
import * as React from "react";
import { useSyncedScopeValue } from "../../../hooks/useSyncedScopeValue";
import { useSyncedSessionData } from "../../../../src/hooks/core/useSyncedSessionData";

enum MODE {
  Write = 1,
  Idle = 0,
  Read = -1,
}

export interface ISyncedScrollProps {
  className?: string;
  id: string;
}

const Inner: React.FC<ISyncedScrollProps> = ({ children, className, id }) => {
  const { value, setValue } = useSyncedScopeValue("scroll");

  const el = useRef<HTMLDivElement>();
  const timeout = useRef<NodeJS.Timeout>();
  const idleTimeout = useRef<NodeJS.Timeout>();
  const mode = useRef<number>(MODE.Idle);

  const onScroll = useCallback(() => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    if (mode.current === MODE.Read) {
      return;
    }
    mode.current === MODE.Write;

    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
      idleTimeout.current = null;
    }
    idleTimeout.current = setTimeout(() => {
      mode.current = MODE.Idle;
    }, 1000);

    timeout.current = setTimeout(() => {
      const scrollOffset = el.current.scrollTop;
      const height = el.current.offsetHeight;
      const fullHeight = el.current.scrollHeight;

      const percent =
        fullHeight === height ? 0 : scrollOffset / (fullHeight - height);
      setValue({ id, percent });
    }, 200);
  }, []);

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
      // clear value on exit
      setValue(null);
    };
  }, []);

  useEffect(() => {
    // value is set, we haven't written it and its for our instance
    if (!value || mode.current === MODE.Write || value.id !== id) {
      return;
    }
    mode.current === MODE.Read;

    if (idleTimeout.current) {
      clearTimeout(idleTimeout.current);
      idleTimeout.current = null;
    }
    idleTimeout.current = setTimeout(() => {
      mode.current = MODE.Idle;
    }, 1000);

    // compute pixel offset, as this may differ to source
    const height = el.current.offsetHeight;
    const fullHeight = el.current.scrollHeight;
    const offset = (fullHeight - height) * value.percent;

    el.current.scroll({
      top: offset,
      behavior: "smooth",
    });
  }, [value]);

  return (
    <div ref={el} onScroll={onScroll} className={className}>
      {children}
    </div>
  );
};

/**
 * Syncs the scroll position via the scopes.
 */
export const SyncedScroll: React.FC<ISyncedScrollProps> = ({
  children,
  className,
  id,
}) => {
  const { scope } = useSyncedSessionData();

  // HACK excludes the companion from synced scrolling
  return scope?.type === "companion" ? (
    <div className={className}>{children}</div>
  ) : (
    <Inner id={id} className={className}>
      {children}
    </Inner>
  );
};
