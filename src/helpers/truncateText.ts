export const truncateText = (text: string, length: number = 20) => {
  const words = text.split(/\s+/g);
  return (
    words.slice(0, length).join(" ") + (words.length > length ? "..." : "")
  );
};

export const truncateTextNote = (text: string, length: number = 15) => {
  const words = text.split(/\s+/g);
  return (
    words.slice(0, length).join(" ") + (words.length > length ? " ...more" : "")
  );
};
