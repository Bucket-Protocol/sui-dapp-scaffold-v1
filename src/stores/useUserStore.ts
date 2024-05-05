import { create } from "zustand";

interface UserState {
  rpcUrl: string;
  setRpcUrl: (newUrl: string) => void;
}

const useCoreUserStore = create<UserState>()((set) => ({
  rpcUrl: "https://fullnode.mainnet.sui.io/",
  setRpcUrl: (newUrl) => set({ rpcUrl: newUrl }),
}));

export const useUserStore = () => {
  const store = useCoreUserStore();
  return { ...store };
};
