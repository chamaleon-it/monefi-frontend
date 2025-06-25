export const fBoolean = (
  value: boolean,
  trueLabel = "Yes",
  falseLabel = "No",
): string => {
  return value ? trueLabel : falseLabel;
};
