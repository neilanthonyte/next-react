import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

// give some buffer when calculating whether we should automatically scroll on new messages
// or when to hide the new message alert
const BUFFER = 100;
const BUFFER_SMALL_FRAME = 50;
const getBufferFromClinetWidth = (el: HTMLDivElement): number => {
  return el.clientWidth <= 300 ? BUFFER_SMALL_FRAME : BUFFER;
};

/**
 * Utility hook to handle scroll behaviour in message threads.
 * It:
 * - handles automatic scroll to the bottom when a new message is added, if the view is already scrolled to the bottom, with a buffer
 * - handles a state flag indicating there is a new message received when the view is scrolled to the top, with a buffer (viewing old historic messages scenario)
 * - listens to scroll event and hides reset the above state flag if set when scrolling back to the bottom of the view (e.g. the new message is in sight)
 */
export const useMessagingScrollHandler = (numberOfMessages: number) => {
  const [showNewMessageAlert, setShowNewMessageAlert] =
    useState<boolean>(false);

  // refs to calculate scroll position
  const scrollableContainerRef = useRef<HTMLDivElement>();
  const previousScrollOffsetRef = useRef<number>(
    scrollableContainerRef.current?.scrollHeight,
  );

  // when list of messages first render, just scroll straight to bottom without animation
  useEffect(() => {
    scrollToBottom("auto");
  }, []);

  const debouncedOnScroll = useCallback(
    // HACK crazy target type declaration, just set to any
    debounce((target: any) => {
      const { clientHeight, scrollHeight, scrollTop } = target;

      const buffer = getBufferFromClinetWidth(scrollableContainerRef.current);
      if (clientHeight + scrollTop > scrollHeight - buffer) {
        setShowNewMessageAlert(false);
      }
    }, 200),
    [],
  );

  // setup scroll listener to hide show new messages alert if scrolling to the bottom
  useEffect(() => {
    if (!scrollableContainerRef.current || !showNewMessageAlert) return;

    const handleOnScroll = (evt: Event) => {
      // have to pass the target object because there is no guarantee the event will still be available
      debouncedOnScroll(evt.currentTarget);
    };

    scrollableContainerRef.current?.addEventListener("scroll", handleOnScroll);

    return () => {
      scrollableContainerRef.current?.removeEventListener(
        "scroll",
        handleOnScroll,
      );
    };
  }, [showNewMessageAlert]);

  // when new message is received
  useEffect(() => {
    // we only want to autoscroll to bottom if we are already at the bottom of the list
    // e.g. if the user scrolled up to see historic, we don't want to automatically scroll to bottom
    // instead, show a "new messages" clickable link

    if (!scrollableContainerRef.current) return;

    const currentScrollOffset =
      scrollableContainerRef.current?.clientHeight +
      scrollableContainerRef.current?.scrollTop;

    const buffer = getBufferFromClinetWidth(scrollableContainerRef.current);

    const max = previousScrollOffsetRef.current + buffer;
    const min = previousScrollOffsetRef.current - buffer;
    if (currentScrollOffset <= max && currentScrollOffset >= min) {
      scrollToBottom("smooth");
    } else if (!!previousScrollOffsetRef.current) {
      setShowNewMessageAlert(true);
    }

    // update with new container scroll height
    previousScrollOffsetRef.current =
      scrollableContainerRef.current?.scrollHeight;
  }, [numberOfMessages]);

  const scrollToBottom = (scrollBehaviour: ScrollBehavior) => {
    scrollableContainerRef.current?.scrollTo({
      // top: bottomOfListRef.current?.offsetTop,
      top: scrollableContainerRef.current?.scrollHeight,
      behavior: scrollBehaviour,
    });
  };

  const resetNewMessageAlert = () => {
    setShowNewMessageAlert(false);
  };

  return {
    scrollToBottom,
    scrollableContainerRef,
    showNewMessageAlert,
    resetNewMessageAlert,
  };
};
