/** @format */

const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  value === "null" ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export default isEmpty;

export function firstLetterCaps(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
