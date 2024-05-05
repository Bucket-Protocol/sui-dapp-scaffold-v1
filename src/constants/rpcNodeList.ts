export function getRpcNodes(network: 'mainnet' | 'testnet' | 'devnet'): RpcNode[] {
  const suiscanRpc = network === 'devnet' ?
    "https://suiscan.xyz/api/sui/devnet/":
    `https://rpc-${network}.suiscan.xyz/`;
  
  return [
    {
      name: "Sui Official",
      url: `https://fullnode.${network}.sui.io/`,
      latency: 0,
    },
    {
      name: "Blockvision",
      url: `https://sui-${network}-endpoint.blockvision.org/`,
      latency: 0,
    },
    {
      name: "Suiscan",
      url: suiscanRpc,
      latency: 0,
    },
  ];
}
