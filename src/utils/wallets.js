export const walletNames = (type) => {
  const walletNames = {
    btcWallet: "Bitcoin",
    ethWallet: "Ethereum",
    solanaWallet: "Solana",
    tronWallet: "Tron",
    xrpWallet: "Ripple",
    ethUSDTWallet: "USDT (Ethereum)",
    solanaUSDTWallet: "USDT (Solana)",
    tronUSDTWallet: "USDT (Tron)",
  };

  return walletNames[type];
};

export const shortenAddress = (address) => {
  if (!address) return "";
  const prefix = address.slice(0, 10);
  const suffix = address.slice(-10);
  return `${prefix}...${suffix}`;
};

export const walletSymbols = (type) => {
  const walletNames = {
    btcWallet: "BTC",
    ethWallet: "ETH",
    solanaWallet: "SOL",
    tronWallet: "TRX",
    xrpWallet: "Ripple",
    ethUSDTWallet: "USDT (Ethereum)",
    solanaUSDTWallet: "USDT (Tron)",
    tronUSDTWallet: "USDT (Solana)",
  };

  return walletNames[type];
};
