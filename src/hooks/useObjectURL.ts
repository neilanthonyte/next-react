import { useEffect, useState } from "react";

/**
 * Given a URL for a file (e.g. PDF), fetch the file and provide a local
 * url, which is cleaned up automatically.
 */
export const useCachedUrl = (srcURL: string) => {
  const [objectURL, setObjectURL] = useState<string>(null);

  useEffect(() => {
    // define variable here so it can be referenced in cleanup method.
    let url: string = undefined;
    (async () => {
      if (srcURL) {
        const response = await fetch(srcURL);
        const object = await response.blob();
        url = URL.createObjectURL(object);
        setObjectURL(url);
      }
    })();

    // cleanup, revoke object URL when no longer needed.
    return () => {
      if (url) {
        URL.revokeObjectURL(url);
      }
    };
  }, [srcURL]);

  return objectURL;
};
