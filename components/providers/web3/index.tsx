import React, {
  createContext,
  FunctionComponent,
  useContext,
  useState,
} from "react";
import { createDefualtWeb3State, Web3State } from "./utils";

const Web3Context = createContext<Web3State>(createDefualtWeb3State());

const Web3Provider: FunctionComponent<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [web3Api, setWeb3Api] = useState<Web3State>(createDefualtWeb3State());
  return (
    <Web3Context.Provider value={web3Api}>{children}</Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}

export default Web3Provider;
