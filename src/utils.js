/**
 * Helper methods
 */
export const formatCurrency = (num) => {
  const rgx = /(\d+)(\d{3})/;
  let formatedNum = num.toString();
  while (rgx.test(formatedNum)) {
    formatedNum = formatedNum.replace(rgx, '$1.$2');
  }
  return `${formatedNum},00`;
};

export const isEmail = value => (
  value && value.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
);

export const isString = value => (
  value && value.length > 0 && /^[a-z\s]+$/i.test(value)
);

export const isNumber = value => (
  value && value.length > 0 && /^\d+$/.test(value)
);
