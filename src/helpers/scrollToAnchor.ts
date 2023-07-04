// listen to route changes and dispatch action for opsArticles saga
let previousLocation: null | string = null;

export const scrollToAnchor = (anchor?: string) => {
  let changeLocation = false;

  // default to the URL hash if no achnor is passed
  if (!anchor) {
    changeLocation = window.location.pathname !== previousLocation;
    previousLocation = window.location.pathname;
    anchor = window.location.hash.replace(/^#/, "");
  }

  if (!anchor) {
    return;
  }
  const behavior = changeLocation ? "instant" : "smooth";

  // ensure component is on screen
  setTimeout(() => {
    const hashedEl = document.getElementById(anchor);
    if (hashedEl) {
      // @ts-ignore
      hashedEl.scrollIntoView({
        behavior: behavior as any,
        block: "start",
      });
    }
  });
};
