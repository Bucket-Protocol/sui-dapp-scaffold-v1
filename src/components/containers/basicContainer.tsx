import BasicDataField from "../fields/basicDataField";
import BasicInputField from "../fields/basicInputField";
import ActionButton from "../buttons/actionButton";
import { useState } from "react";

const BasicContainer = () => {
  const [selectedToken, setSelectedToken] = useState<string>("SUI");
  return (
    <div className="w-[80%] flex flex-col items-center justify-center gap-4">
      <BasicDataField label="Your Wallet Balance" value="0.0000" unit="SUI" />
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
