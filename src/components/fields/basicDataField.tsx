import { cn } from "@/lib/utils";
import Image from "next/image";
import FormatNumber, { FormatNumberProps } from "../formats/formatNumber";
import { useState } from "react";
import useMeidaSize from "@/hooks/useMediaSize";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IBasicDataFieldProps extends FormatNumberProps {
  label: string;
  labelClass?: string;
  fieldClass?: string;
  tooltip?: {
    label: string;
    content: string;
  };
}

const BasicDataField = ({
  label,
  labelClass,
  tooltip = undefined,
  value,
  valueClass = "text-2xl font-medium !leading-[110%] -tracking-[0.72px] text-white",
  fieldClass = "w-fit",
  ...props
}: IBasicDataFieldProps) => {
  const screenWidth = useMeidaSize();
  const isDesktop = screenWidth >= 1440;
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  return (
    <Tooltip
      delayDuration={300}
      open={isTooltipOpen}
      onOpenChange={setIsTooltipOpen}
    >
      <div className={cn("flex flex-col items-center gap-3", fieldClass)}>
        <div className="flex items-center gap-1">
          <span className={cn("text-sm text-white/50", labelClass)}>
            {label}
          </span>
          {tooltip && tooltip !== null && (
            <TooltipTrigger
              onClick={() => {
                if (isDesktop) return;
                setIsTooltipOpen(!isTooltipOpen);
              }}
            >
              <Image
                className="aspect-square w-4 lg:w-4.5"
                src="/images/question-icon.svg"
                alt="tips"
                width={18}
                height={18}
              />
            </TooltipTrigger>
          )}
        </div>
        {value === "-" ? (
          <span className={valueClass}>{value}</span>
        ) : (
          <FormatNumber valueClass={valueClass} value={value} {...props} />
        )}
      </div>
      {tooltip && tooltip !== null && (
        <TooltipContent
          align="end"
          className="max-w-72 !border-white/20 p-2 bg-tab-button-radial backdrop-blur-md !bg-black/30"
          style={{
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          <span className="text-sm font-medium !leading-[110%] -tracking-[0.14px]">
            {tooltip.label}
          </span>
          <p className="mt-1 text-pretty text-xs text-white">
            {tooltip.content}
          </p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default BasicDataField;
