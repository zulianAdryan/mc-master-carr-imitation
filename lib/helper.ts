export const formatterCurrency = (value: number): string => {
  if (typeof window === "undefined") return value.toString();

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(value);
};

export const formatterDate = (date: string) => {
  if (typeof window === "undefined") return date;

  const _date = new Date(date);
  return _date.toLocaleString();
};
