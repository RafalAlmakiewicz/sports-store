const formatPrice = (num: number, appendCurrency: boolean = true) => {
  let str = padEndZerosToDecimalPart(num.toString(), 2);
  str = (+str).toFixed(2);
  return appendCurrency ? str + "$" : str;
};

const padEndZerosToDecimalPart = (value: string, max: number) => {
  if (value.split(".").length === 1) value += ".";
  return value.split(".")[0] + "." + value.split(".")[1].padEnd(max, "0");
};

export default formatPrice;
