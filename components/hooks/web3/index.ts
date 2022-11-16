import { useHooks } from "@providers/web3";

export const useAccount = () => {
  const { useAccount } = useHooks();
  const swrRes = useAccount("");
  return {
    account: swrRes,
  };
};
