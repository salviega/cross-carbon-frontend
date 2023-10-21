/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Receiver, ReceiverInterface } from "../Receiver";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_router",
        type: "address",
      },
      {
        internalType: "address",
        name: "_link",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "router",
        type: "address",
      },
    ],
    name: "InvalidRouter",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
    ],
    name: "ReceivedMessage",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "messageId",
            type: "bytes32",
          },
          {
            internalType: "uint64",
            name: "sourceChainSelector",
            type: "uint64",
          },
          {
            internalType: "bytes",
            name: "sender",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct Client.EVMTokenAmount[]",
            name: "destTokenAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct Client.Any2EVMMessage",
        name: "message",
        type: "tuple",
      },
    ],
    name: "ccipReceive",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getRouter",
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
    name: "latestMessage",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "latestSender",
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

const _bytecode =
  "0x60a060405234801561001057600080fd5b50604051610a5e380380610a5e83398101604081905261002f91610121565b816001600160a01b03811661005e576040516335fdcccd60e21b81526000600482015260240160405180910390fd5b6001600160a01b03908116608052600180548383166001600160a01b0319918216811790925560008054938616939091168317905560405163095ea7b360e01b8152600481019290925260001960248301529063095ea7b3906044016020604051808303816000875af11580156100d9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906100fd9190610154565b50505061017d565b80516001600160a01b038116811461011c57600080fd5b919050565b6000806040838503121561013457600080fd5b61013d83610105565b915061014b60208401610105565b90509250929050565b60006020828403121561016657600080fd5b8151801515811461017657600080fd5b9392505050565b6080516108c061019e6000396000818160b001526101cb01526108c06000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c806301ffc9a71461005c57806334a077981461008457806385572ffb14610099578063b0f479a1146100ae578063e1214815146100e8575b600080fd5b61006f61006a3660046102c2565b6100fb565b60405190151581526020015b60405180910390f35b61008c610132565b60405161007b9190610317565b6100ac6100a736600461034a565b6101c0565b005b7f00000000000000000000000000000000000000000000000000000000000000005b6040516001600160a01b03909116815260200161007b565b6002546100d0906001600160a01b031681565b60006001600160e01b031982166385572ffb60e01b148061012c57506001600160e01b031982166301ffc9a760e01b145b92915050565b6003805461013f90610385565b80601f016020809104026020016040519081016040528092919081815260200182805461016b90610385565b80156101b85780601f1061018d576101008083540402835291602001916101b8565b820191906000526020600020905b81548152906001019060200180831161019b57829003601f168201915b505050505081565b336001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000161461020f576040516335fdcccd60e21b815233600482015260240160405180910390fd5b61022061021b826105af565b610223565b50565b806040015180602001905181019061023b919061065c565b600260006101000a8154816001600160a01b0302191690836001600160a01b0316021790555080606001518060200190518101906102799190610679565b600390610286908261073f565b507fc96e84c3d3c9d81f3c5ffefc52940ba337cc31f09385e2944799fbb78d536d0960036040516102b791906107ff565b60405180910390a150565b6000602082840312156102d457600080fd5b81356001600160e01b0319811681146102ec57600080fd5b9392505050565b60005b8381101561030e5781810151838201526020016102f6565b50506000910152565b60208152600082518060208401526103368160408501602087016102f3565b601f01601f19169190910160400192915050565b60006020828403121561035c57600080fd5b813567ffffffffffffffff81111561037357600080fd5b820160a081850312156102ec57600080fd5b600181811c9082168061039957607f821691505b6020821081036103b957634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff811182821017156103f8576103f86103bf565b60405290565b60405160a0810167ffffffffffffffff811182821017156103f8576103f86103bf565b604051601f8201601f1916810167ffffffffffffffff8111828210171561044a5761044a6103bf565b604052919050565b803567ffffffffffffffff8116811461046a57600080fd5b919050565b600067ffffffffffffffff821115610489576104896103bf565b50601f01601f191660200190565b600082601f8301126104a857600080fd5b81356104bb6104b68261046f565b610421565b8181528460208386010111156104d057600080fd5b816020850160208301376000918101602001919091529392505050565b6001600160a01b038116811461022057600080fd5b600082601f83011261051357600080fd5b8135602067ffffffffffffffff82111561052f5761052f6103bf565b61053d818360051b01610421565b82815260069290921b8401810191818101908684111561055c57600080fd5b8286015b848110156105a457604081890312156105795760008081fd5b6105816103d5565b813561058c816104ed565b81528185013585820152835291830191604001610560565b509695505050505050565b600060a082360312156105c157600080fd5b6105c96103fe565b823581526105d960208401610452565b6020820152604083013567ffffffffffffffff808211156105f957600080fd5b61060536838701610497565b6040840152606085013591508082111561061e57600080fd5b61062a36838701610497565b6060840152608085013591508082111561064357600080fd5b5061065036828601610502565b60808301525092915050565b60006020828403121561066e57600080fd5b81516102ec816104ed565b60006020828403121561068b57600080fd5b815167ffffffffffffffff8111156106a257600080fd5b8201601f810184136106b357600080fd5b80516106c16104b68261046f565b8181528560208385010111156106d657600080fd5b6106e78260208301602086016102f3565b95945050505050565b601f82111561073a57600081815260208120601f850160051c810160208610156107175750805b601f850160051c820191505b8181101561073657828155600101610723565b5050505b505050565b815167ffffffffffffffff811115610759576107596103bf565b61076d816107678454610385565b846106f0565b602080601f8311600181146107a2576000841561078a5750858301515b600019600386901b1c1916600185901b178555610736565b600085815260208120601f198616915b828110156107d1578886015182559484019460019091019084016107b2565b50858210156107ef5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b600060208083526000845461081381610385565b80848701526040600180841660008114610834576001811461084e5761087c565b60ff1985168984015283151560051b89018301955061087c565b896000528660002060005b858110156108745781548b8201860152908301908801610859565b8a0184019650505b50939897505050505050505056fea2646970667358221220530ae7b9c74cae9c13568db38a88f65b2c6a4f1c6e8cf2654bedbe1567736ea364736f6c63430008140033";

type ReceiverConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ReceiverConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Receiver__factory extends ContractFactory {
  constructor(...args: ReceiverConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "Receiver";
  }

  deploy(
    _router: string,
    _link: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Receiver> {
    return super.deploy(_router, _link, overrides || {}) as Promise<Receiver>;
  }
  getDeployTransaction(
    _router: string,
    _link: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_router, _link, overrides || {});
  }
  attach(address: string): Receiver {
    return super.attach(address) as Receiver;
  }
  connect(signer: Signer): Receiver__factory {
    return super.connect(signer) as Receiver__factory;
  }
  static readonly contractName: "Receiver";
  public readonly contractName: "Receiver";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ReceiverInterface {
    return new utils.Interface(_abi) as ReceiverInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Receiver {
    return new Contract(address, _abi, signerOrProvider) as Receiver;
  }
}