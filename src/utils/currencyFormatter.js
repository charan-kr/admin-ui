export function currencyFormatter(price, decimalPlace = 2) {
  const formatter = new Intl.NumberFormat("en-Us", {
    style: "currency",
    currency: price.currencyUnit || "INR",
    minimumFractionDigits: decimalPlace,
  });
  return formatter.format(price.currencyAmount);
}
