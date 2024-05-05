//Type
type RpcNode = {
  name: string;
  url: string;
  latency: number;
};

type TokenInfo = {
  token: COIN;
  symbol: string;
  iconPath: string;
  isLST?: boolean;
};

type BasicCoin = "SUI" | "USDC" | "USDT" | "BUCK";
