export const formatNumbers = (number) => {
  return new Intl.NumberFormat('de-DE').format(number);
};
