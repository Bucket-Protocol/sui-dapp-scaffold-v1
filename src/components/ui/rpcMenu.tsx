import {
  DropdownMenuSubTriggerLeft,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuItem,
} from "./dropdown-menu";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { NetworkIcon, Hexagon } from "lucide-react";
import { getRpcNodes } from "@/constants/rpcNodeList";
import { Link } from "lucide-react";

const network = "mainnet";

const RpcMenu = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [rpcNodes, setRpcNodes] = useState<RpcNode[]>(getRpcNodes(network));
  const { rpcUrl, setRpcUrl } = useUserStore();

  useEffect(() => {
    loadLatencies();
  }, []);

  const onOpenChange = (isOpen: boolean) => {
    if (isOpen) {
      const interval = setInterval(() => {
        loadLatencies();
      }, 3000);

      setTimer(interval);
      return () => clearInterval(interval);
    } else {
      if (timer) {
        clearInterval(timer);
      }
    }
  };

  const loadLatency = async (rpcNode: RpcNode) => {
    try {
      const startTs = new Date().getTime();
      const ret = await fetch(`${rpcNode.url}`, {
        method: "POST",
        body: `{"jsonrpc":"2.0","id":1,"method":"rpc.discover","params":[]}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // await ret.json();
      const endTs = new Date().getTime();

      const latency = endTs - startTs;
      setRpcNodes((t) =>
        t.map((t) => {
          if (t.name == rpcNode.name) {
            t.latency = latency;
          }

          return t;
        }),
      );
    } catch (ex) {
      console.log("ex", ex);
      return undefined;
    }
  };

  const loadLatencies = async () => {
    await Promise.all(getRpcNodes(network).map((t) => loadLatency(t)));
  };

  return (
    <DropdownMenuSub onOpenChange={onOpenChange}>
      <DropdownMenuSubTriggerLeft className="w-full h-12 flex items-center justify-between rounded-lg pl-3.5 pr-2 py-2 text-black hover:bg-main-700 hover:text-white">
        <Hexagon strokeWidth={2} className="h-4 w-4 text-white mr-2" />
        <span className="text-sm text-white">RPC Setting</span>
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
        {rpcNodes.map((rpcNode, idx) => (
          <DropdownMenuItem
            className="w-full"
            key={`rpc-node-${rpcNode.name}-${idx}`}
          >
            <button
              className={`w-full flex items-center justify-between rounded-lg px-1 py-1 text-black hover:bg-main-700 hover:text-white ${
                rpcNode.url == rpcUrl ? "" : "opacity-50"
              }`}
              onClick={() => {
                setRpcUrl(rpcNode.url);
              }}
            >
              <span className="sm:text-sm text-white">{rpcNode.name}</span>
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-blue-300" />
                <span className="text-xs text-white">{rpcNode.latency}ms</span>
              </div>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default RpcMenu;
