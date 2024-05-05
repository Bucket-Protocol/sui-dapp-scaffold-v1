import React, { useEffect } from "react";
import { getFullnodeUrl } from "@mysten/sui.js/client";
import {
  SuiClientProvider,
  WalletProvider,
  lightTheme,
} from "@mysten/dapp-kit";
import { type StateStorage } from "zustand/middleware";
import { useUserStore } from "@/stores/useUserStore";

type Props = {
  children: React.ReactNode;
};

const SuiWalletProvider = ({ children }: Props) => {
  const { rpcUrl } = useUserStore();

  const networks = {
    custom: { url: rpcUrl },
  };

  if (typeof window === "undefined") return <></>;
  return (
    <>
      <SuiClientProvider networks={networks} defaultNetwork="custom">
        <WalletProvider
          theme={lightTheme}
          autoConnect={true}
          storage={localStorage as StateStorage}
          storageKey="sui-wallet"
          preferredWallets={["Sui Wallet"]}
        >
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </>
  );
};

export default SuiWalletProvider;
