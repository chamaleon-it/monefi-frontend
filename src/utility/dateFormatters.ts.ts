import { format, formatDistanceToNow } from "date-fns";

export const fDateAndTime = (date: Date | string) => {
  return format(new Date(date), "dd-MMM-yyyy hh:mm a");
};

export const fAgo = (date: Date | number) => {
  return formatDistanceToNow(date, { addSuffix: true });
};

export const fDate = (date: Date | string) => {
  return format(new Date(date), "dd-MMM-yyyy");
};

export const fTime = (date: Date | string) => {
  return format(new Date(date), "hh:mm a");
};
