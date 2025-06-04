// import { ethers } from "hardhat";

// async function main() {
//   const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
//   const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//   const verifier = await ethers.getContractAt("RiscZeroGroth16Verifier", contractAddress, provider);
//   const version = await verifier.VERSION();

//   console.log("✅ Connected to verifier, version:", version);
// }

// main().catch((err) => {
//   console.error(err);
//   process.exit(1);
// });