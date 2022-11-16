import { CryptoHookFactory } from "@_types/hook";
import useSWR from "swr";

type AccountHookFactory = CryptoHookFactory<string, string>;

// The type AccountHookFactory returns
export type UseAccountHook = ReturnType<AccountHookFactory>;

// deps -> contract, provider, ethereum (Web3State)
export const hookFactory: AccountHookFactory = (deps) => (params) => {
  const swrRes = useSWR("web3/useAccount", () => {
    console.log("Dependencies: ", deps);
    console.log("Parameters: ", params);
    return "Test User";
  });

  return swrRes;
};
