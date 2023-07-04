import * as React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Document, Page } from "react-pdf";

import { LoadingOverlay } from "../Loader";
import { PendingContent } from "../../structure/PendingContent";
import { TypedObservable, ITypedObserver } from "../../../helpers/observer";
import { useCachedUrl } from "../../../hooks/useObjectURL";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Pdf");

/**
 * A PDF navigation event. Navigation is either forwards or backwards.
 */
export type TPdfNavigation = "forward" | "back";

/**
 * A hook to simplify usage of the PDF component. Returns an array containing:
 * - PDF: The component to add to your return statement.
 * - forward: Call this function to navigate forward in the PDF.
 * - back: Call this function to navigate back in the PDF.
 */
export const usePdf = (
  /** The URL for the PDF. */
  src: string,
  /** If true, component will watch for 'orientationchange' events, and set
   * the height to the height of the window. */
  watchOrientationChange?: boolean,
  /** Callback called when PDF has loaded. Receives property 'numPages' - the
   * number of pages in the document. */
  onLoadSuccess?: (numPages: number) => void,
  /** Callback called when the current page being viewed is updated. Receives
   * property 'pageNumber' the current (0-indexed) number of the page being
   * viewed. */
  onPageUpdate?: (pageNumber: number) => void,
): [React.FC, () => void, () => void] => {
  const navigate = useMemo(() => new TypedObservable<TPdfNavigation>(), []);

  const _src = useCachedUrl(src);

  const PDFComponent = useCallback(
    () => (
      <PendingContent check={!!_src}>
        <Pdf
          src={_src}
          navigate={navigate}
          watchOrientationChange={watchOrientationChange}
          onLoadSuccess={onLoadSuccess}
          onPageUpdate={onPageUpdate}
        />
      </PendingContent>
    ),
    [_src, navigate, watchOrientationChange, onLoadSuccess, onPageUpdate],
  );

  const goForward = useCallback(() => navigate.notify("forward"), [navigate]);
  const goBack = useCallback(() => navigate.notify("back"), [navigate]);

  return [PDFComponent, goForward, goBack];
};

export interface IPdfProps {
  src: string | File;
  navigate: TypedObservable<TPdfNavigation>;
  watchOrientationChange?: boolean;
  onLoadSuccess?: (numPages: number) => void;
  onPageUpdate?: (pageNumber: number) => void;
}

/**
 * Wrapper component for react-pdf.
 *
 *
 * @param {boolean} [watchOrientationChange=false] - If true, component will
 * watch for 'orientationchange' events, and set the height to the height of
 * the window.
 * @param {Function} [onLoadSuccess] - An optional callback, called when the
 *  internal component has successfully loaded the PDF document.
 */
export const Pdf: React.FC<IPdfProps> = ({
  /** The PDF source to use. Can be either a URL or file object. */
  src,
  /** An Observable that will emit "forward" and "back" events, corresponding
   * to navigating forward and back through the PDF respectively. */
  navigate,
  /** If true, component will watch for 'orientationchange' events, and set the
   * height to the height of the window. */
  watchOrientationChange = false,
  /** An optional callback, called when the internal component has successfully
   * loaded the PDF document. */
  onLoadSuccess,
  /** Optional callback, called whenever the page number changes. */
  onPageUpdate,
}) => {
  // number of pages in PDF.
  const [numPages, setNumPages] = useState(0);

  // current page index.
  const [pageNum, setPageNum] = useState(0);

  // if 'onPageUpdate' prop is given, call that method whenever the current
  // page number changes.
  useEffect(() => {
    if (onPageUpdate) {
      onPageUpdate(pageNum);
    }
  }, [pageNum, onPageUpdate]);

  // height of the document.
  // if watchOrientationChange is falsy, this value is ignored.
  // otherwise, document will expand to the height of the window,
  // and resize when the orientation of the device is changed.
  const [height, setHeight] = useState<number>(
    watchOrientationChange ? window.innerHeight : null,
  );
  useEffect(() => {
    if (watchOrientationChange) {
      const listener = () =>
        // Need to wait a short time before updating
        // to allow the value in window.innerHeight to be correct.
        setTimeout(() => setHeight(window.innerHeight), 100);

      window.addEventListener("orientationchange", listener);
      return () => removeEventListener("orientationchange", listener);
    }
  }, [watchOrientationChange]);

  // watches for navigation events emitted by given 'navigate' observable.
  const observer: ITypedObserver<TPdfNavigation> = useMemo(
    () => ({
      update: (navigate: TPdfNavigation) =>
        setPageNum((p) =>
          navigate === "forward"
            ? Math.min(p + 1, numPages - 1)
            : Math.max(p - 1, 0),
        ),
    }),
    [numPages],
  );

  // register the observer with the given observable 'navigate' object.
  useEffect(() => {
    navigate.register(observer);

    // unregister on cleanup.
    return () => navigate.unregister(observer);
  }, [navigate, observer]);

  // set number of pages, and call given onLoadSuccess callback if given.
  const onSuccess = useCallback(
    ({ numPages }) => {
      onLoadSuccess && onLoadSuccess(numPages);
      setNumPages(numPages);
    },
    [onLoadSuccess],
  );

  return (
    <Document
      className={css("")}
      file={src}
      loading={<LoadingOverlay />}
      onLoadSuccess={onSuccess}
    >
      <Page
        height={height}
        className={css("page")}
        pageIndex={pageNum}
        renderAnnotationLayer={false}
        renderTextLayer={false}
      />
    </Document>
  );
};
