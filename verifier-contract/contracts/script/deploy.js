"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const hardhat_1 = require("hardhat");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
async function main() {
    const privateKey = process.env.ETH_WALLET_PRIVATE_KEY;
    if (!privateKey) {
        throw new Error("Missing ETH_WALLET_PRIVATE_KEY in environment variables");
    }
    const provider = new hardhat_1.ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const wallet = new hardhat_1.ethers.Wallet(privateKey, provider);
    const CONTROL_ROOT = "0x0000000000000000000000000000000000000000000000000000000000000000";
    const BN254_CONTROL_ID = "0x0000000000000000000000000000000000000000000000000000000000000000";
    const VerifierFactory = await hardhat_1.ethers.getContractFactory("RiscZeroGroth16Verifier", wallet);
    const contract = await VerifierFactory.deploy(CONTROL_ROOT, BN254_CONTROL_ID);
    await contract.waitForDeployment();
    // Cast to any to access `target` safely (or use `.address` with legacy ethers)
    console.log("✅ Deployed at address:", contract.target);
}
main().catch((err) => {
    console.error(err);
    process.exit(1);
});
