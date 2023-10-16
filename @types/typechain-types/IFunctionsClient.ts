/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface IFunctionsClientInterface extends utils.Interface {
  contractName: "IFunctionsClient";
  functions: {
    "handleOracleFulfillment(bytes32,bytes,bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "handleOracleFulfillment",
    values: [BytesLike, BytesLike, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "handleOracleFulfillment",
    data: BytesLike
  ): Result;

  events: {};
}

export interface IFunctionsClient extends BaseContract {
  contractName: "IFunctionsClient";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IFunctionsClientInterface;

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
    handleOracleFulfillment(
      requestId: BytesLike,
      response: BytesLike,
      err: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  handleOracleFulfillment(
    requestId: BytesLike,
    response: BytesLike,
    err: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    handleOracleFulfillment(
      requestId: BytesLike,
      response: BytesLike,
      err: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    handleOracleFulfillment(
      requestId: BytesLike,
      response: BytesLike,
      err: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    handleOracleFulfillment(
      requestId: BytesLike,
      response: BytesLike,
      err: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
