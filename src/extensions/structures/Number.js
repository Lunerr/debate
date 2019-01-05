const formatter = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});

/* eslint-disable no-extend-native */
Number.prototype.USD = function() {
  return formatter.format(this);
};
Number.prototype.isEven = function() {
  return this % 2 === 0;
};

/* eslint-enable no-extend-native */
