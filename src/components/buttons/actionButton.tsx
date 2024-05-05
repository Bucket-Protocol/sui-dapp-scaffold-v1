import { cn } from "@/lib/utils";
import Image from "next/image";
import { ConnectModal } from "@mysten/dapp-kit";
import Loader from "../ui/loader";
import { CSSProperties } from "react";
import { Link } from "lucide-react";

interface IActionButtonProps {
  label: string;
  isConnected: boolean;
  isLoading: boolean;
  disabled?: boolean;
  onClick: () => void;
  buttonClass?: string;
  contentClass?: string;
  buttonStyle?: CSSProperties;
}

const ActionButton = ({
  label,
  isConnected,
  isLoading,
  disabled = false,
  onClick,
  buttonClass,
  contentClass,
  buttonStyle,
}: IActionButtonProps) => {
  if (!isConnected) {
    return (
      <ConnectModal
        trigger={
          <button
            className="w-full h-16 px-6 py-5 flex items-center justify-between gap-2 bg-white rounded-xl xl:button-animate-103"
            disabled={disabled}
            style={buttonStyle}
          >
            <span className="text-black lg:text-lg font-medium !leading-[110%] -tracking-[0.16px] lg:-tracking-[0.18px]">
              Connect wallet
            </span>
            <Link size={17} className="text-black" />
          </button>
        }
      />
    );
  }

  return (
    <button
      className={cn(
        "w-full h-16 px-6 py-5 flex items-center justify-center gap-2 bg-white rounded-xl xl:button-animate-105",
        buttonClass
      )}
      disabled={disabled}
      style={buttonStyle}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <span
          className={cn(
            "text-black lg:text-lg font-medium !leading-[110%] -tracking-[0.16px] lg:-tracking-[0.18px]",
            contentClass
          )}
        >
          {label}
        </span>
      )}
    </button>
  );
};

export default ActionButton;
