import { BitcoinIconss, USDTIcon } from "../components/Icons/Icons";

const walletIcons = {
  btcWallet: <BitcoinIconss />,
  tronUSDTWallet: <USDTIcon />,
};

const getWalletIcon = (walletType) => {
  return walletIcons[walletType] || null;
};

const walletIconss = {
  btcWallet: <BitcoinIconss />,
  ethUSDTWallet: <USDTIcon />,
};

export const getWalletIcons = (walletType) => {
  return walletIconss[walletType] || null;
};

export default getWalletIcon;
