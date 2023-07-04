export const computeAbsolutePaths = (tabs: any[], path = ""): any =>
  tabs.map((tab) => {
    const absPath = `${path}${tab.path}`;
    return {
      ...tab,
      path: absPath,
      routes: tab.routes ? computeAbsolutePaths(tab.routes, absPath) : null,
    };
  });

export default computeAbsolutePaths;
