import Image from "next/image";
import FormatNumber from "../formats/formatNumber";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { COIN } from "bucket-protocol-sdk";
import { TOKEN_LIST } from "@/constants/marketList";

interface IBasicInputFieldProps {
  label: string;
  inputValue: string;
  setInputValue: (value: string) => void;
  tokenInfo: BasicCoin[];
  canSelectToken?: boolean;
  selectedToken?: string;
  setSelectedToken?: (value: string) => void;
  maxValue?: number;
  subLabelContent?: React.ReactNode;
  subInfo?: React.ReactNode;
  subFooterControlPanel?: React.ReactNode;
  isReadOnly?: boolean;
  noHeader?: boolean;
  noFooter?: boolean;
}

const delayDuration = 200;

const BasicInputField = ({
  label,
  inputValue,
  setInputValue,
  tokenInfo,
  canSelectToken = false,
  selectedToken,
  setSelectedToken,
  maxValue,
  subLabelContent = <></>,
  subInfo = <div></div>,
  subFooterControlPanel = undefined,
  isReadOnly = false,
  noHeader = false,
  noFooter = false,
}: IBasicInputFieldProps) => {
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");
  const tokenDecimals = 9;

  useEffect(() => {
    setDebouncedInputValue(inputValue);
  }, [inputValue]);

  const handleInputChange = (value: string) => {
    const decimalRegex = new RegExp(`^-?\\d+(\\.\\d{0,${tokenDecimals}})?$`);

    if (decimalRegex.test(value)) {
      setDebouncedInputValue(value);
    } else {
      setDebouncedInputValue("");
    }
  };

  const handleMax = () => {
    setDebouncedInputValue((maxValue ?? 0).toString());
  };

  useEffect(() => {
    if (debouncedInputValue === inputValue) return;

    const handler = setTimeout(() => {
      if (debouncedInputValue === "0") {
        setInputValue("");
      } else {
        setInputValue(debouncedInputValue);
      }
    }, delayDuration);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedInputValue]);

  return (
    <div className="w-full p-4 flex flex-col gap-2 rounded-2xl bg-white/10 bg-token-input-field-radial">
      {/* Label and wallet balance */}
      <div
        className={cn(
          "w-full flex items-center justify-between",
          noHeader && "hidden"
        )}
      >
        {/* Label */}
        <span className="text-sm text-white/50">{label}</span>
        {/* Wallet Balance */}
        {subLabelContent}
      </div>
      {/* Control Panel */}
      <div className="w-full flex flex-col gap-1">
        {/* Input field and token */}
        <div
          className={cn(
            "w-full flex items-center",
            (subInfo || !isReadOnly) && "gap-1"
          )}
        >
          {/* Input field */}
          <input
            type="text"
            inputMode="decimal"
            className="w-full h-9 md:h-12 bg-transparent text-[28px] md:text-[40px] font-medium leading-normal -tracking-[0.28px] md:-tracking-[0.4px] text-white caret-white placeholder:text-white/50 focus:outline-none ring-0"
            placeholder={"0.00"}
            min="0"
            minLength={1}
            maxLength={79}
            spellCheck="false"
            autoComplete="off"
            autoCorrect="off"
            pattern="^[0-9]*[.,]?[0-9]*$"
            onChange={(e) => {
              handleInputChange(e.target.value);
            }}
            value={debouncedInputValue}
            readOnly={isReadOnly}
          />
          {/* Token */}
          {canSelectToken ? (
            selectedToken &&
            selectedToken !== "" &&
            selectedToken !== null &&
            setSelectedToken && (
              <Select
                value={selectedToken}
                onValueChange={(value) => setSelectedToken(value)}
              >
                <SelectTrigger className="w-full h-9 md:h-12 flex items-center gap-1 border-none !outline-none !ring-0 p-0 m-0 bg-transparent justify-end">
                  <Image
                    className="min-w-8 w-8 xl:min-w-10 xl:w-10 aspect-square rounded-[50%]"
                    src={
                      TOKEN_LIST[selectedToken as BasicCoin]?.iconPath ??
                      "/images/coins/USDC.png"
                    }
                    alt={selectedToken ?? "Token"}
                    width={40}
                    height={40}
                  />
                  <span className="px-1 text-[28px] md:text-[40px] font-medium leading-normal -tracking-[0.28px] md:-tracking-[1.2px] text-white">
                    {TOKEN_LIST[selectedToken as BasicCoin]?.symbol ?? "USDC"}
                  </span>
                </SelectTrigger>
                <SelectContent
                  align="end"
                  sideOffset={4}
                  className="w-20 backdrop-blur-md border-white/10 bg-tab-button-radial !bg-black/30"
                  style={{
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  {tokenInfo.map((token) => (
                    <SelectItem key={token} value={token}>
                      {TOKEN_LIST[token].symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )
          ) : (
            <div className="h-9 flex items-center gap-2 border-none !outline-none !ring-0 p-0 m-0 bg-transparent justify-end">
              <Image
                className="min-w-8 xl:min-w-10 aspect-square rounded-[50%]"
                src={
                  TOKEN_LIST[tokenInfo[0]]?.iconPath ??
                  "/images/tokens/USDC.png"
                }
                alt={TOKEN_LIST[tokenInfo[0]]?.symbol ?? ""}
                width={40}
                height={40}
              />
              <span className="w-full text-[28px] md:text-[40px] font-medium leading-normal -tracking-[0.28px] md:-tracking-[1.2px] text-white">
                {TOKEN_LIST[tokenInfo[0]]?.symbol}
              </span>
            </div>
          )}
        </div>
        {/* SubInfo and buttons */}
        <div
          className={cn(
            "w-full flex items-center",
            subInfo ? "justify-between" : "justify-end",
            subInfo || !isReadOnly ? "h-fit" : "h-4.5",
            noFooter && "hidden"
          )}
        >
          {subInfo}
          {/* Buttons */}
          {!isReadOnly &&
            (subFooterControlPanel ? (
              <>{subFooterControlPanel}</>
            ) : (
              <button className="h-fit self-end" onClick={handleMax}>
                <span className="text-xs font-medium !leading-[100%] text-white/50 xl:hover:text-white xl:duration-300 xl:ease-in-out">
                  Max
                </span>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BasicInputField;
