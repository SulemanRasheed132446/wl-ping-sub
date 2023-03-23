import { ethers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Fortmatic from "fortmatic";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { NETWORK } from "../../../config";
import { NotificationEnum } from "../Notifications";

export type Wallet = {
  provider: Web3Provider;
  signer: JsonRpcSigner;
  address: string;
};

export const initWallet = async (
  handleNotification: Function,
  setWallet: Function
) => {
  let wallet: Wallet | undefined;

  const web3Modal = new Web3Modal({
    cacheProvider: false,
    disableInjectedProvider: false,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: { infuraId: "eed536650d92417f8dde4371c4d7ab0d" },
      },
      fortmatic: {
        package: Fortmatic,
        options: {
          key: "pk_test_7521D06E9CCF41EE",
        },
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK, // Required
        options: {
          appName: "ArtyPass", // Required
          infuraId: "eed536650d92417f8dde4371c4d7ab0d", // Required
          rpc: "", // Optional if `infuraId` is provided; otherwise it's required
          chainId: 1, // Optional. It defaults to 1 if not provided
          darkMode: false, // Optional. Use dark theme, defaults to false
        },
      },
    },
    theme: {
      background: "rgba(255,255,255, 0.8)",
      main: "#2a2525",
      secondary: "#000000",
      hover: "rgba(0,0,0,.25)",
      border: "rgba(0,0,0,0)",
    },
  });
  try {
    web3Modal.clearCachedProvider();
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();

    wallet = {
      provider: provider,
      signer: signer,
      address: signerAddress,
    };
  } catch (err) {
    console.error(err);
    if (err === "Modal closed by user") {
      handleNotification({
        type: NotificationEnum.Error,
        title: "User closed modal...",
        content: "Please try connecting wallet again",
      });
    }
  }

  return wallet;
};
export default initWallet;
