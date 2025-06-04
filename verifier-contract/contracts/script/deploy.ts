import { ethers, Interface, BytesLike, Wallet } from "ethers";
import path from "path";
import { readFileSync, writeFileSync, mkdirSync } from "fs";

// const ENV: string ="local";
// const ENV: string ="testnet";
const ENV: string ="sepolia";
let RPC_URL = "";
let privateKey = "";

if (ENV === "testnet") {
  RPC_URL = "https://testnet-passet-hub-eth-rpc.polkadot.io";
  privateKey = "51bb3bf9f58318135dcc3d19c40902c2cf43d7d7d300afca18bbbbcc459873d6";
}

if (ENV === "sepolia") {
  // Deployed verifier to sepolia:
  // 0xbF8b89C7E818fda93C947e8d15c17BA19535196f 
  RPC_URL = "https://1rpc.io/sepolia";
  privateKey = "51bb3bf9f58318135dcc3d19c40902c2cf43d7d7d300afca18bbbbcc459873d6";
}

if (ENV === "local") {
  RPC_URL = "http://127.0.0.1:8545";
  privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
}

const provider = new ethers.JsonRpcProvider(RPC_URL!);
const wallet = new Wallet(privateKey!, provider);

// Build directories
// const buildDir = ".build";
// const contractsOutDir = path.join(buildDir, "contracts");
// const buildDir = "artifacts";
// const contractsOutDir = path.join(buildDir, "src", "groth16");
const contractsOutDir = path.join("artifacts", "src", "groth16", "RiscZeroGroth16Verifier.sol");
const deploysDir = path.join(".deploys", "deployed-contracts");
mkdirSync(deploysDir, { recursive: true });

// File and name
const file = "RiscZeroGroth16Verifier.json";
const name = "RiscZeroGroth16Verifier";

const CONTROL_ROOT = "0x0000000000000000000000000000000000000000000000000000000000000000";
const BN254_CONTROL_ID = "0x0000000000000000000000000000000000000000000000000000000000000000";
// Constructor args
const args = [CONTROL_ROOT, BN254_CONTROL_ID];

// Contract type
type Contract = {
  abi: Interface;
  bytecode: BytesLike;
};

(async () => {
  const filePath = path.join(contractsOutDir, file);
  const contract = JSON.parse(readFileSync(filePath, "utf8")) as Contract;

  const factory = new ethers.ContractFactory(contract.abi, contract.bytecode, wallet);

  console.log(`🚀 Deploying contract ${name} with args:`, args);

  const deployedContract = await factory.deploy(...args);
  await deployedContract.waitForDeployment();

  const address = await deployedContract.getAddress();
  console.log(`✅ Deployed ${name} at: ${address}`);

  const fileContent = JSON.stringify(
    {
      name,
      address,
      abi: contract.abi,
      deployedAt: Date.now()
    },
    null,
    2
  );

  writeFileSync(path.join(deploysDir, `${address}.json`), fileContent);
})().catch((err) => {
  console.error("❌ Deployment failed:", err);
  process.exit(1);
});




// import { ethers } from "hardhat";
// import * as dotenv from "dotenv";

// dotenv.config();

// async function main() {
//   const privateKey = process.env.ETH_WALLET_PRIVATE_KEY;
//   if (!privateKey) {
//     throw new Error("Missing ETH_WALLET_PRIVATE_KEY in environment variables");
//   }

//   const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
//   const wallet = new ethers.Wallet(privateKey, provider);

//   const CONTROL_ROOT = "0x0000000000000000000000000000000000000000000000000000000000000000";
//   const BN254_CONTROL_ID = "0x0000000000000000000000000000000000000000000000000000000000000000";

//   const VerifierFactory = await ethers.getContractFactory("RiscZeroGroth16Verifier", wallet);
//   const contract = await VerifierFactory.deploy(CONTROL_ROOT, BN254_CONTROL_ID);
//   await contract.waitForDeployment();

//   // Cast to any to access `target` safely (or use `.address` with legacy ethers)
//   console.log("✅ Deployed at address:", (contract as any).target);
// }

// main().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });
