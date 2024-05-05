import { useCurrentAccount, useSuiClient } from "@mysten/dapp-kit";
import { PropsWithChildren, createContext, useEffect, useMemo } from "react";
import { useResolveSuiNSName } from "@mysten/dapp-kit";

interface IAppContextProps {
  walletAddress: string | undefined;
  suiName: string | null | undefined;
}

export const AppContext = createContext<IAppContextProps>({
  walletAddress: undefined,
  suiName: undefined,
});

export const AppContextProvider = (props: PropsWithChildren) => {
  const client = useSuiClient();
  const account = useCurrentAccount();

  const walletAddress = useMemo(() => {
    return account?.address;
  }, [account]);

  const { data: suiName } = useResolveSuiNSName(walletAddress);

  return (
    <>
      <AppContext.Provider
        value={{
          walletAddress,
          suiName,
        }}
      >
        {props.children}
      </AppContext.Provider>
    </>
  );
};
