import { CryptoHookFactory } from "@_types/hook";
import useSWR from "swr";

// deps -> contract, provider, ethereum (Web3State)
export const hookFactory: CryptoHookFactory<string, string> =
  (deps) => (params) => {
    const swrRes = useSWR("web3/useAccount", () => {
      console.log("Dependencies: ", deps);
      console.log("Parameters: ", params);
      return "Test User";
    });

    return swrRes;
  };

export const useAccount = hookFactory({
  ethereum: undefined,
  provider: undefined,
});
