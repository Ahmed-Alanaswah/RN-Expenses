export function getDateFormatted(date) {
  return date?.toISOString().slice(0, 10);
}

export function getDateMinusDAys(date, days) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
