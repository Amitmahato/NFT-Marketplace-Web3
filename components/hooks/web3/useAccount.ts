import useSWR from "swr";

// deps -> contract, provider, ethereum (Web3State)
export const hookFactory = (deps: any) => (params: any) => {
  const swrRes = useSWR("web3/useAccount", () => {
    console.log("Dependencies: ", deps);
    console.log("Parameters: ", params);
    return "Test User";
  });

  return swrRes;
};

export const useAccount = hookFactory({ ethereum: null, provider: null });
