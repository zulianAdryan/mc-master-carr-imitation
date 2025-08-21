export const formatterCurrency = (value: number): string => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(value);
};

export const formatterDate = (date: string) => {
  const _date = new Date(date);
  return _date.toLocaleString();
};
