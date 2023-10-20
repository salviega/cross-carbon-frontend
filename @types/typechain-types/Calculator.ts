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
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface CalculatorInterface extends utils.Interface {
  contractName: "Calculator";
  functions: {
    "acceptOwnership()": FunctionFragment;
    "handleOracleFulfillment(bytes32,bytes,bytes)": FunctionFragment;
    "owner()": FunctionFragment;
    "s_lastArgs(uint256)": FunctionFragment;
    "s_lastBuyer()": FunctionFragment;
    "s_lastError()": FunctionFragment;
    "s_lastFlag()": FunctionFragment;
    "s_lastRequestId()": FunctionFragment;
    "s_lastResponse()": FunctionFragment;
    "s_lastReturns(uint256)": FunctionFragment;
    "sendRequest(address,string,string,bytes,uint8,uint64,string[],bytes[],uint64,uint32,bytes32)": FunctionFragment;
    "sendRequestCBOR(bytes,uint64,uint32,bytes32)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "acceptOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "handleOracleFulfillment",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "s_lastArgs",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "s_lastBuyer",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "s_lastError",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "s_lastFlag",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "s_lastRequestId",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "s_lastResponse",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "s_lastReturns",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "sendRequest",
    values: [
      string,
      string,
      string,
      BytesLike,
      BigNumberish,
      BigNumberish,
      string[],
      BytesLike[],
      BigNumberish,
      BigNumberish,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "sendRequestCBOR",
    values: [BytesLike, BigNumberish, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "acceptOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "handleOracleFulfillment",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "s_lastArgs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "s_lastBuyer",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "s_lastError",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "s_lastFlag", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "s_lastRequestId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "s_lastResponse",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "s_lastReturns",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendRequest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "sendRequestCBOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "CarbonFootprintCalculated(bytes32,string,string[],uint256[],address)": EventFragment;
    "OwnershipTransferRequested(address,address)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
    "RequestFulfilled(bytes32)": EventFragment;
    "RequestSent(bytes32)": EventFragment;
    "Response(bytes32,bytes,bytes)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CarbonFootprintCalculated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferRequested"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestFulfilled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RequestSent"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Response"): EventFragment;
}

export type CarbonFootprintCalculatedEvent = TypedEvent<
  [string, string, string[], BigNumber[], string],
  {
    requestId: string;
    s_lastFlag: string;
    s_lastArgs: string[];
    s_lastReturns: BigNumber[];
    s_lastBuyer: string;
  }
>;

export type CarbonFootprintCalculatedEventFilter =
  TypedEventFilter<CarbonFootprintCalculatedEvent>;

export type OwnershipTransferRequestedEvent = TypedEvent<
  [string, string],
  { from: string; to: string }
>;

export type OwnershipTransferRequestedEventFilter =
  TypedEventFilter<OwnershipTransferRequestedEvent>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string],
  { from: string; to: string }
>;

export type OwnershipTransferredEventFilter =
  TypedEventFilter<OwnershipTransferredEvent>;

export type RequestFulfilledEvent = TypedEvent<[string], { id: string }>;

export type RequestFulfilledEventFilter =
  TypedEventFilter<RequestFulfilledEvent>;

export type RequestSentEvent = TypedEvent<[string], { id: string }>;

export type RequestSentEventFilter = TypedEventFilter<RequestSentEvent>;

export type ResponseEvent = TypedEvent<
  [string, string, string],
  { requestId: string; response: string; err: string }
>;

export type ResponseEventFilter = TypedEventFilter<ResponseEvent>;

export interface Calculator extends BaseContract {
  contractName: "Calculator";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CalculatorInterface;

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
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    handleOracleFulfillment(
      requestId: BytesLike,
      response: BytesLike,
      err: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    s_lastArgs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    s_lastBuyer(overrides?: CallOverrides): Promise<[string]>;

    s_lastError(overrides?: CallOverrides): Promise<[string]>;

    s_lastFlag(overrides?: CallOverrides): Promise<[string]>;

    s_lastRequestId(overrides?: CallOverrides): Promise<[string]>;

    s_lastResponse(overrides?: CallOverrides): Promise<[string]>;

    s_lastReturns(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    sendRequest(
      buyer: string,
      flag: string,
      source: string,
      encryptedSecretsUrls: BytesLike,
      donHostedSecretsSlotID: BigNumberish,
      donHostedSecretsVersion: BigNumberish,
      args: string[],
      bytesArgs: BytesLike[],
      subscriptionId: BigNumberish,
      gasLimit: BigNumberish,
      jobId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    sendRequestCBOR(
      request: BytesLike,
      subscriptionId: BigNumberish,
      gasLimit: BigNumberish,
      jobId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  acceptOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  handleOracleFulfillment(
    requestId: BytesLike,
    response: BytesLike,
    err: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  owner(overrides?: CallOverrides): Promise<string>;

  s_lastArgs(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

  s_lastBuyer(overrides?: CallOverrides): Promise<string>;

  s_lastError(overrides?: CallOverrides): Promise<string>;

  s_lastFlag(overrides?: CallOverrides): Promise<string>;

  s_lastRequestId(overrides?: CallOverrides): Promise<string>;

  s_lastResponse(overrides?: CallOverrides): Promise<string>;

  s_lastReturns(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  sendRequest(
    buyer: string,
    flag: string,
    source: string,
    encryptedSecretsUrls: BytesLike,
    donHostedSecretsSlotID: BigNumberish,
    donHostedSecretsVersion: BigNumberish,
    args: string[],
    bytesArgs: BytesLike[],
    subscriptionId: BigNumberish,
    gasLimit: BigNumberish,
    jobId: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  sendRequestCBOR(
    request: BytesLike,
    subscriptionId: BigNumberish,
    gasLimit: BigNumberish,
    jobId: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    acceptOwnership(overrides?: CallOverrides): Promise<void>;

    handleOracleFulfillment(
      requestId: BytesLike,
      response: BytesLike,
      err: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    owner(overrides?: CallOverrides): Promise<string>;

    s_lastArgs(arg0: BigNumberish, overrides?: CallOverrides): Promise<string>;

    s_lastBuyer(overrides?: CallOverrides): Promise<string>;

    s_lastError(overrides?: CallOverrides): Promise<string>;

    s_lastFlag(overrides?: CallOverrides): Promise<string>;

    s_lastRequestId(overrides?: CallOverrides): Promise<string>;

    s_lastResponse(overrides?: CallOverrides): Promise<string>;

    s_lastReturns(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sendRequest(
      buyer: string,
      flag: string,
      source: string,
      encryptedSecretsUrls: BytesLike,
      donHostedSecretsSlotID: BigNumberish,
      donHostedSecretsVersion: BigNumberish,
      args: string[],
      bytesArgs: BytesLike[],
      subscriptionId: BigNumberish,
      gasLimit: BigNumberish,
      jobId: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    sendRequestCBOR(
      request: BytesLike,
      subscriptionId: BigNumberish,
      gasLimit: BigNumberish,
      jobId: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    transferOwnership(to: string, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "CarbonFootprintCalculated(bytes32,string,string[],uint256[],address)"(
      requestId?: BytesLike | null,
      s_lastFlag?: null,
      s_lastArgs?: null,
      s_lastReturns?: null,
      s_lastBuyer?: null
    ): CarbonFootprintCalculatedEventFilter;
    CarbonFootprintCalculated(
      requestId?: BytesLike | null,
      s_lastFlag?: null,
      s_lastArgs?: null,
      s_lastReturns?: null,
      s_lastBuyer?: null
    ): CarbonFootprintCalculatedEventFilter;

    "OwnershipTransferRequested(address,address)"(
      from?: string | null,
      to?: string | null
    ): OwnershipTransferRequestedEventFilter;
    OwnershipTransferRequested(
      from?: string | null,
      to?: string | null
    ): OwnershipTransferRequestedEventFilter;

    "OwnershipTransferred(address,address)"(
      from?: string | null,
      to?: string | null
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(
      from?: string | null,
      to?: string | null
    ): OwnershipTransferredEventFilter;

    "RequestFulfilled(bytes32)"(
      id?: BytesLike | null
    ): RequestFulfilledEventFilter;
    RequestFulfilled(id?: BytesLike | null): RequestFulfilledEventFilter;

    "RequestSent(bytes32)"(id?: BytesLike | null): RequestSentEventFilter;
    RequestSent(id?: BytesLike | null): RequestSentEventFilter;

    "Response(bytes32,bytes,bytes)"(
      requestId?: BytesLike | null,
      response?: null,
      err?: null
    ): ResponseEventFilter;
    Response(
      requestId?: BytesLike | null,
      response?: null,
      err?: null
    ): ResponseEventFilter;
  };

  estimateGas: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    handleOracleFulfillment(
      requestId: BytesLike,
      response: BytesLike,
      err: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    s_lastArgs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    s_lastBuyer(overrides?: CallOverrides): Promise<BigNumber>;

    s_lastError(overrides?: CallOverrides): Promise<BigNumber>;

    s_lastFlag(overrides?: CallOverrides): Promise<BigNumber>;

    s_lastRequestId(overrides?: CallOverrides): Promise<BigNumber>;

    s_lastResponse(overrides?: CallOverrides): Promise<BigNumber>;

    s_lastReturns(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sendRequest(
      buyer: string,
      flag: string,
      source: string,
      encryptedSecretsUrls: BytesLike,
      donHostedSecretsSlotID: BigNumberish,
      donHostedSecretsVersion: BigNumberish,
      args: string[],
      bytesArgs: BytesLike[],
      subscriptionId: BigNumberish,
      gasLimit: BigNumberish,
      jobId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    sendRequestCBOR(
      request: BytesLike,
      subscriptionId: BigNumberish,
      gasLimit: BigNumberish,
      jobId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    acceptOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    handleOracleFulfillment(
      requestId: BytesLike,
      response: BytesLike,
      err: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s_lastArgs(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    s_lastBuyer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s_lastError(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s_lastFlag(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s_lastRequestId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s_lastResponse(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    s_lastReturns(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sendRequest(
      buyer: string,
      flag: string,
      source: string,
      encryptedSecretsUrls: BytesLike,
      donHostedSecretsSlotID: BigNumberish,
      donHostedSecretsVersion: BigNumberish,
      args: string[],
      bytesArgs: BytesLike[],
      subscriptionId: BigNumberish,
      gasLimit: BigNumberish,
      jobId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    sendRequestCBOR(
      request: BytesLike,
      subscriptionId: BigNumberish,
      gasLimit: BigNumberish,
      jobId: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
