/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IFunctionsRouter,
  IFunctionsRouterInterface,
} from "../IFunctionsRouter";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "response",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "err",
        type: "bytes",
      },
      {
        internalType: "uint96",
        name: "juelsPerGas",
        type: "uint96",
      },
      {
        internalType: "uint96",
        name: "costWithoutFulfillment",
        type: "uint96",
      },
      {
        internalType: "address",
        name: "transmitter",
        type: "address",
      },
      {
        components: [
          {
            internalType: "bytes32",
            name: "requestId",
            type: "bytes32",
          },
          {
            internalType: "address",
            name: "coordinator",
            type: "address",
          },
          {
            internalType: "uint96",
            name: "estimatedTotalCostJuels",
            type: "uint96",
          },
          {
            internalType: "address",
            name: "client",
            type: "address",
          },
          {
            internalType: "uint64",
            name: "subscriptionId",
            type: "uint64",
          },
          {
            internalType: "uint32",
            name: "callbackGasLimit",
            type: "uint32",
          },
          {
            internalType: "uint72",
            name: "adminFee",
            type: "uint72",
          },
          {
            internalType: "uint72",
            name: "donFee",
            type: "uint72",
          },
          {
            internalType: "uint40",
            name: "gasOverheadBeforeCallback",
            type: "uint40",
          },
          {
            internalType: "uint40",
            name: "gasOverheadAfterCallback",
            type: "uint40",
          },
          {
            internalType: "uint32",
            name: "timeoutTimestamp",
            type: "uint32",
          },
        ],
        internalType: "struct FunctionsResponse.Commitment",
        name: "commitment",
        type: "tuple",
      },
    ],
    name: "fulfill",
    outputs: [
      {
        internalType: "enum FunctionsResponse.FulfillResult",
        name: "",
        type: "uint8",
      },
      {
        internalType: "uint96",
        name: "",
        type: "uint96",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAdminFee",
    outputs: [
      {
        internalType: "uint72",
        name: "adminFee",
        type: "uint72",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllowListId",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "getContractById",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "id",
        type: "bytes32",
      },
    ],
    name: "getProposedContractById",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProposedContractSet",
    outputs: [
      {
        internalType: "bytes32[]",
        name: "",
        type: "bytes32[]",
      },
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
      {
        internalType: "uint32",
        name: "callbackGasLimit",
        type: "uint32",
      },
    ],
    name: "isValidCallbackGasLimit",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32[]",
        name: "proposalSetIds",
        type: "bytes32[]",
      },
      {
        internalType: "address[]",
        name: "proposalSetAddresses",
        type: "address[]",
      },
    ],
    name: "proposeContractsUpdate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint16",
        name: "dataVersion",
        type: "uint16",
      },
      {
        internalType: "uint32",
        name: "callbackGasLimit",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "donId",
        type: "bytes32",
      },
    ],
    name: "sendRequest",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint64",
        name: "subscriptionId",
        type: "uint64",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint16",
        name: "dataVersion",
        type: "uint16",
      },
      {
        internalType: "uint32",
        name: "callbackGasLimit",
        type: "uint32",
      },
      {
        internalType: "bytes32",
        name: "donId",
        type: "bytes32",
      },
    ],
    name: "sendRequestToProposed",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "allowListId",
        type: "bytes32",
      },
    ],
    name: "setAllowListId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "updateContracts",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IFunctionsRouter__factory {
  static readonly abi = _abi;
  static createInterface(): IFunctionsRouterInterface {
    return new utils.Interface(_abi) as IFunctionsRouterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IFunctionsRouter {
    return new Contract(address, _abi, signerOrProvider) as IFunctionsRouter;
  }
}
