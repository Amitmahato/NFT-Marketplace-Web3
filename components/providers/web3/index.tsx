import { ethers } from "ethers";
import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  createDefualtWeb3State,
  createWeb3State,
  loadContract,
  Web3State,
} from "./utils";

const Web3Context = createContext<Web3State>(createDefualtWeb3State());

const Web3Provider: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefualtWeb3State());

  useEffect(() => {
    const initWeb3 = async () => {
      const ethereum = window.ethereum;
      const provider = new ethers.providers.Web3Provider(ethereum as any);
      const contract = await loadContract("NftMarket", provider);
      setWeb3Api(
        createWeb3State({
          ethereum,
          provider,
          contract,
          isLoading: false,
        })
      );
    };

    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export function useHooks() {
  const { hooks } = useWeb3();
  return hooks;
}

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
