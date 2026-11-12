// Single place for number formatting; sub-unit prices need more decimals
export const formatMoney = (value, locale, currency) =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: value < 1 ? 6 : 2
  }).format(value);

export const formatCompactMoney = (value, locale, currency) =>
  new Intl.NumberFormat(locale, { style: "currency", currency, notation: "compact", maximumFractionDigits: 2 }).format(value);

export const formatPercent = (value, locale) =>
  new Intl.NumberFormat(locale, { style: "percent", signDisplay: "exceptZero", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value / 100);
