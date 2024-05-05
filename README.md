# Sui dApp Frontend Scaffold

Your super kit to build dApp on Sui

This project provides a frontend scaffold for a decentralized application (dApp) on the Sui blockchain. It uses next.js page router, shadcn/ui for UI library, @mysten/dapp-kit for interacting with Sui contracts, and bucket-protocol-SDK for additional blockchain interactions.

<img width="1512" alt="image" src="https://github.com/Bucket-Protocol/sui-dapp-scaffold-v1/assets/50972884/7ba8fa56-e0e7-4f4f-a8ee-75a97688b18c">

Powered by Bucket Protocol.

## Packages
* [next.js](https://nextjs.org/): Utilized for the foundational framework, supporting SSR and optimized page routing.
* [tailwind](https://tailwindcss.com/): Rapidly build modern websites without ever leaving your HTML.
* [shadcn/ui](https://ui.shadcn.com/): Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
* [@mysten/dapp-kit](https://www.npmjs.com/package/@mysten/dapp-kit): Provides hooks and components for querying data from the Sui blockchain, and connecting to Sui wallets.
* [bucket-protocol-sdk](https://github.com/Bucket-Protocol/bucket-protocol-sdk): Enhances capabilities with Sui blockchain features.

## Features

* Headless, fully customizable UI component
* Save 80% of the initial setting time. You can build your project/product way faster

## Components
* Basic series
  * BasicDataField
    ```Typescript
    import BasicDataField from "@/components/fields/basicDataField";
    
    <BasicDataField
      label="Your Wallet Balance"
      value={userBalance ?? "0.0000"}
      spaceWithUnit
      unit="SUI"
      minFractionDigits={0}
    />
    ```
    <img width="165" alt="image" src="https://github.com/Bucket-Protocol/sui-dapp-scaffold-v1/assets/50972884/8a900e28-7576-43d8-9f57-1655ee96adc3">

  * BasicInputField
    ```Typescript
    import BasicInputField from "@/components/fields/basicInputField";
    
    <BasicInputField
      label="Input"
      inputValue={value}
      setInputValue={setInputValue}
      tokenInfo={["SUI", "BUCK", "USDC", "USDT"]}
      canSelectToken={true}
      selectedToken={selectedToken}
      setSelectedToken={setSelectedToken}
      maxValue={0.0}
    />
    ```
    <img width="1202" alt="image" src="https://github.com/Bucket-Protocol/sui-dapp-scaffold-v1/assets/50972884/b6e23e4b-2369-498e-a409-9e5821ccf8d6">
* ConnectMenu
  ```Typescript
  import ConnectMenu from "@/components/ui/connectMenu";

  <ConnectMenu walletAddress={walletAddress} suiName={suiName} />
  ```
  <img width="315" alt="image" src="https://github.com/Bucket-Protocol/sui-dapp-scaffold-v1/assets/50972884/e05dcae4-c163-4251-b413-e97bc226c9e9">

* MetaTagsContainer
  * Open graph metadata is a key point for a web app. Most common settings are gathered in this component.
