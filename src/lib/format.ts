export type Notation = "standard" | "scientific" | "engineering" | "compact";

export function formatNumber(
  number: number,
  precision = 2,
  maxFractionDigits = 2,
  minFractionDigits = 2,
  notation: Notation = "compact"
) {
  const roundedNumber = Number(number).toFixed(precision);
  // TODO: internationalization
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: minFractionDigits,
    maximumFractionDigits: maxFractionDigits,
    notation,
  });
  return formatter.format(parseFloat(roundedNumber));
}
export const formatUnits = (value: bigint, decimals: number) => {
  let display = value.toString();

  const negative = display.startsWith("-");
  if (negative) display = display.slice(1);

  display = display.padStart(decimals, "0");

  const integer = display.slice(0, display.length - decimals);
  let fraction = display.slice(display.length - decimals);

  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${
    fraction ? `.${fraction}` : ""
  }`;
};

export const parseUnits = (value: `${number}`, decimals: number) => {
  let [integer, fraction = "0"] = value.split(".");

  if (integer === undefined) {
    return BigInt(0);
  }
  const negative = integer.startsWith("-");
  if (negative) integer = integer.slice(1);

  // trim leading zeros.
  fraction = fraction.replace(/(0+)$/, "");

  // round off if the fraction is larger than the number of decimals.
  if (decimals === 0) {
    integer = `${Math.round(Number(`${integer}.${fraction}`))}`;
    fraction = "";
  } else if (fraction.length > decimals) {
    const [before, after] = [
      fraction.slice(0, decimals),
      fraction.slice(decimals),
    ];
    fraction = `${
      /^0+$/.test(before) ? before.slice(0, before.length - 1) : ""
    }${Math.round(Number(`${before}.${after}`))}`;
  } else {
    fraction = fraction.padEnd(decimals, "0");
  }

  return BigInt(`${negative ? "-" : ""}${integer}${fraction}`);
};


export const formatBigInt = (mist: bigint, decimal: number): string => {
  return formatUnits(mist, decimal);
};


export const shortenAddress = (address: string) => {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
};
