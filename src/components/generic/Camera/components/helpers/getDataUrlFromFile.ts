export const getDataUrlFromFile = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const fr = new FileReader();
    fr.addEventListener(
      "load",
      () => {
        resolve(fr.result.toString());
      },
      { once: true },
    );
    fr.readAsDataURL(file);
  });
};
