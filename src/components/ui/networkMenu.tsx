import {
  DropdownMenuSubTriggerLeft,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import { useUserStore } from "@/stores/useUserStore";
import { NetworkIcon } from "lucide-react";
import { getRpcNodes } from "@/constants/rpcNodeList";
import { NETWROK_LIST } from "@/constants/networkList";

const NetworkMenu = () => {
  const { network, setNetwork, setRpcUrl } = useUserStore();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTriggerLeft className="w-full h-12 flex items-center justify-between rounded-lg pl-3.5 pr-2 py-2 text-black hover:bg-main-700 hover:text-white">
        <NetworkIcon strokeWidth={2} className="h-4 w-4 text-white mr-2" />
        <span className="text-sm text-white">Network</span>
      </DropdownMenuSubTriggerLeft>
      <DropdownMenuSubContent
        sideOffset={8}
        alignOffset={8}
        className="relative w-44 bg-white/20 border-none"
      >
        <div
          className="absolute top-0 left-0 w-full h-full -z-[1] backdrop-blur-md"
          style={{
            WebkitBackdropFilter: "blur(12px)",
          }}
        />
        {NETWROK_LIST.map((_network, idx) => (
          <DropdownMenuItem
            className="w-full"
            key={`network-${_network}-${idx}`}
          >
            <button
              className={`w-full flex items-center justify-between rounded-lg px-1 py-1 text-black hover:bg-main-700 hover:text-white ${
                network == _network ? "" : "opacity-50"
              }`}
              onClick={() => {
                setNetwork(_network);
                setRpcUrl(getRpcNodes(_network as Network)[0].url);
              }}
            >
              <span className="sm:text-sm text-white">{_network}</span>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default NetworkMenu;
