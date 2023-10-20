/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace Client {
  export type EVMTokenAmountStruct = { token: string; amount: BigNumberish };

  export type EVMTokenAmountStructOutput = [string, BigNumber] & {
    token: string;
    amount: BigNumber;
  };

  export type EVM2AnyMessageStruct = {
    receiver: BytesLike;
    data: BytesLike;
    tokenAmounts: Client.EVMTokenAmountStruct[];
    feeToken: string;
    extraArgs: BytesLike;
  };

  export type EVM2AnyMessageStructOutput = [
    string,
    string,
    Client.EVMTokenAmountStructOutput[],
    string,
    string
  ] & {
    receiver: string;
    data: string;
    tokenAmounts: Client.EVMTokenAmountStructOutput[];
    feeToken: string;
    extraArgs: string;
  };
}

export interface IRouterClientInterface extends utils.Interface {
  contractName: "IRouterClient";
  functions: {
    "ccipSend(uint64,(bytes,bytes,(address,uint256)[],address,bytes))": FunctionFragment;
    "getFee(uint64,(bytes,bytes,(address,uint256)[],address,bytes))": FunctionFragment;
    "getSupportedTokens(uint64)": FunctionFragment;
    "isChainSupported(uint64)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "ccipSend",
    values: [BigNumberish, Client.EVM2AnyMessageStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getFee",
    values: [BigNumberish, Client.EVM2AnyMessageStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "getSupportedTokens",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isChainSupported",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "ccipSend", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getSupportedTokens",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isChainSupported",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IRouterClient extends BaseContract {
  contractName: "IRouterClient";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IRouterClientInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    ccipSend(
      destinationChainSelector: BigNumberish,
      message: Client.EVM2AnyMessageStruct,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getFee(
      destinationChainSelector: BigNumberish,
      message: Client.EVM2AnyMessageStruct,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { fee: BigNumber }>;

    getSupportedTokens(
      chainSelector: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string[]] & { tokens: string[] }>;

    isChainSupported(
      chainSelector: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean] & { supported: boolean }>;
  };

  ccipSend(
    destinationChainSelector: BigNumberish,
    message: Client.EVM2AnyMessageStruct,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getFee(
    destinationChainSelector: BigNumberish,
    message: Client.EVM2AnyMessageStruct,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getSupportedTokens(
    chainSelector: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string[]>;

  isChainSupported(
    chainSelector: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    ccipSend(
      destinationChainSelector: BigNumberish,
      message: Client.EVM2AnyMessageStruct,
      overrides?: CallOverrides
    ): Promise<string>;

    getFee(
      destinationChainSelector: BigNumberish,
      message: Client.EVM2AnyMessageStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSupportedTokens(
      chainSelector: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string[]>;

    isChainSupported(
      chainSelector: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    ccipSend(
      destinationChainSelector: BigNumberish,
      message: Client.EVM2AnyMessageStruct,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getFee(
      destinationChainSelector: BigNumberish,
      message: Client.EVM2AnyMessageStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getSupportedTokens(
      chainSelector: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isChainSupported(
      chainSelector: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ccipSend(
      destinationChainSelector: BigNumberish,
      message: Client.EVM2AnyMessageStruct,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getFee(
      destinationChainSelector: BigNumberish,
      message: Client.EVM2AnyMessageStruct,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getSupportedTokens(
      chainSelector: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isChainSupported(
      chainSelector: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}