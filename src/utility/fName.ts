export const fName = (name?: string | null): string => {
  if (!name || typeof name !== "string") return "";

  return name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
