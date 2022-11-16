import { MetaMaskInpageProvider } from "@metamask/providers";
import { Contract, providers } from "ethers";
import { SWRResponse } from "swr";

export type Web3Dependencies = {
  provider: providers.Web3Provider;
  contract: Contract;
  ethereum: MetaMaskInpageProvider;
};

export type CryptoSWRResponse<SWRResponseData = any> =
  SWRResponse<SWRResponseData>;

export type CryptoHandlerHook<SWRResponseData = any, HookParameter = any> = {
  (params: HookParameter): CryptoSWRResponse<SWRResponseData>;
};

export type CryptoHookFactory<SWRResponseData = any, HookParameter = any> = {
  (deps: Partial<Web3Dependencies>): CryptoHandlerHook<
    SWRResponseData,
    HookParameter
  >;
};
