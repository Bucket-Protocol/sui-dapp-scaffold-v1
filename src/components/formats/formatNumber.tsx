import { Skeleton } from "@/components/ui/skeleton";
import { formatNumber, type Notation } from "@/lib/format";

export interface FormatNumberProps {
  value: string | number;
  dollarSign?: string;
  unit?: string | undefined;
  isLoading?: boolean;
  decimal?: number;
  precision?: number;
  asBlockElement?: boolean;
  maxFractionDigits?: number;
  minFractionDigits?: number;
  notation?: Notation;
  spaceWithDollarSign?: boolean;
  spaceWithUnit?: boolean;
  skeletonBg?: string;
  skeletonClass?: string;
  valueClass?: string;
  unitClass?: string;
}

const FormatNumber = ({
  value,
  dollarSign = "",
  unit = "",
  isLoading = false,
  decimal = 0,
  precision = 6,
  asBlockElement = false,
  maxFractionDigits = 2,
  minFractionDigits = 2,
  notation = "compact",
  spaceWithDollarSign = false,
  spaceWithUnit = false,
  skeletonBg = "bg-slate-600",
  skeletonClass = "w-30 h-10",
  valueClass,
  unitClass,
}: FormatNumberProps) => {
  const shortString =
    value !== undefined
      ? (dollarSign !== ""
          ? spaceWithDollarSign
            ? `${dollarSign} `
            : `${dollarSign}`
          : "") +
        formatNumber(
          (isNaN(Number(value)) ? 0 : Number(value)) / 10 ** decimal,
          precision,
          maxFractionDigits,
          minFractionDigits,
          notation
        )
      : "0.00";

  return (
    <>
      {isLoading ? (
        <Skeleton className={`${skeletonBg} ${skeletonClass}`} />
      ) : (
        <span className={`${valueClass}`}>
          {shortString}
          <span className={`${unitClass ?? ""}`}>
            {unit !== "" && unit !== "$"
              ? spaceWithUnit
                ? ` ${unit}`
                : `${unit}`
              : ""}
          </span>
        </span>
      )}
    </>
  );
};

export default FormatNumber;
