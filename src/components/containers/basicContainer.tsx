import BasicDataField from "../fields/basicDataField";
import BasicInputField from "../fields/basicInputField";
import ActionButton from "../buttons/actionButton";
import { useContext, useMemo, useState } from "react";
import {
  useAccounts,
  useSignAndExecuteTransaction,
  useSuiClient,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { AppContext } from "@/context/AppContext";

const BasicContainer = () => {
  const { walletAddress, suiName } = useContext(AppContext);
  const { data: suiBalance } = useSuiClientQuery("getBalance", {
    owner: walletAddress ?? "",
  });
  const [selectedToken, setSelectedToken] = useState<string>("SUI");
  const client = useSuiClient();
  const [account] = useAccounts();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) => {
      return await client.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      });
    },
  });

  const userBalance = useMemo(() => {
    if (suiBalance?.totalBalance) {
      return Math.floor(Number(suiBalance?.totalBalance) / 10 ** 9);
    } else {
      return 0;
    }
  }, [suiBalance]);

  return (
    <div className="w-[80%] flex flex-col items-center justify-center gap-4">
      <BasicDataField
        label="Your Wallet Balance"
        value={userBalance ?? "0.0000"}
        spaceWithUnit
        unit="SUI"
        minFractionDigits={0}
      />
      <BasicInputField
        label="Input"
        inputValue="0.0000"
        setInputValue={(value) => console.log(value)}
        tokenInfo={["SUI", "BUCK", "USDC", "USDT"]}
        canSelectToken={true}
        selectedToken={selectedToken}
        setSelectedToken={setSelectedToken}
        maxValue={0.0}
      />
      <ActionButton
        label="Get Buck"
        isConnected={true}
        isLoading={false}
        onClick={() => console.log("Go to Bucket!")}
        buttonClass="w-40"
      />
    </div>
  );
};

export default BasicContainer;
