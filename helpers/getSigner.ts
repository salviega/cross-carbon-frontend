import { ethers } from "ethers";

export const getSigner = async (): Promise<ethers.providers.JsonRpcSigner> => {
  const ethereum = (window as any).ethereum;
  const web3Provider: ethers.providers.Web3Provider =
    new ethers.providers.Web3Provider(ethereum);
  await web3Provider.send("eth_requestAccounts", []);
  const web3Signer: ethers.providers.JsonRpcSigner = web3Provider.getSigner();

  return web3Signer;
};