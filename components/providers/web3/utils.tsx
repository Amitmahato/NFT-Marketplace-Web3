import { setupHooks, Web3Hooks } from "@hooks/web3/setupHooks";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, ethers, providers } from "ethers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export type Web3Params = {
  ethereum: MetaMaskInpageProvider | null;
  provider: providers.Web3Provider | null;
  contract: Contract | null;
};

export type Web3State = {
  isLoading: boolean;
  hooks: Web3Hooks;
} & Web3Params;

export const createDefualtWeb3State = (): Web3State => {
  return {
    isLoading: true,
    ethereum: null,
    provider: null,
    contract: null,
    hooks: setupHooks({} as any),
  };
};

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (
  contractName: string,
  provider: providers.Web3Provider
): Promise<Contract> => {
  if (!NETWORK_ID) {
    return Promise.reject("Network Id is not defined");
  }
  const response = await fetch(`/contracts/${contractName}.json`);
  const artifact = (await response.json()) as any;

  const contractAddress = artifact.networks[NETWORK_ID].address;
  if (contractAddress) {
    const contract = new ethers.Contract(
      contractAddress,
      artifact.abi,
      provider
    );

    return contract;
  } else {
    return Promise.reject(`Contract: [${contractName}] cannot be loaded!`);
  }
};
