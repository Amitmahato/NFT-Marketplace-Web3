import { setupHooks, Web3Hooks } from "@hooks/web3/setupHooks";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { Web3Dependencies } from "@_types/hook";
import { Contract, ethers, providers } from "ethers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

/**
 * Generic Nullable type:
 *  if the keys of a given interface/type has a specified type use that type or allow it to be null
 */
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type Web3State = {
  isLoading: boolean;
  hooks: Web3Hooks;
} & Nullable<Web3Dependencies>;

export const createDefualtWeb3State = () => {
  return {
    isLoading: true,
    ethereum: null,
    provider: null,
    contract: null,
    hooks: setupHooks({} as any),
  };
};

export const createWeb3State = ({
  isLoading,
  ethereum,
  provider,
  contract,
}: Web3Dependencies & { isLoading: boolean }): Web3State => {
  return {
    isLoading,
    ethereum,
    provider,
    contract,
    hooks: setupHooks({
      ethereum,
      provider,
      contract,
    }),
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
