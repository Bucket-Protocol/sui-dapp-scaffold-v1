import { create } from "zustand";

interface UserState {
  rpcUrl: string;
  setRpcUrl: (newUrl: string) => void;

  network: string;
  setNetwork: (newNetwork: string) => void;
}

const useCoreUserStore = create<UserState>()((set) => ({
  rpcUrl: "https://fullnode.testnet.sui.io/",
  setRpcUrl: (newUrl) => set({ rpcUrl: newUrl }),

  network: "testnet",
  setNetwork: (newNetwork) => set({ network: newNetwork }),
}));

export const useUserStore = () => {
  const store = useCoreUserStore();
  return { ...store };
};
