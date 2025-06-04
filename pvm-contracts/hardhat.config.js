require("@nomicfoundation/hardhat-toolbox");

require("@parity/hardhat-polkadot");

require("dotenv").config();
//   accounts: ["51bb3bf9f58318135dcc3d19c40902c2cf43d7d7d300afca18bbbbcc459873d6"],
const privateKey = process.env.PRIVATE_KEY;
console.log(`privateKey: ${privateKey}`);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  resolc: {
    version: "1.5.2",
    compilerSource: "npm",
  },
  networks: {
    hardhat: {
      polkavm: true,
    },
    localNode: {
      polkavm: true,
      url: `http://127.0.0.1:8545`,
    },
    passetHub: {
      polkavm: true,
      url: 'https://testnet-passet-hub-eth-rpc.polkadot.io',
      accounts: [privateKey],
    },
    sepolia: {
        // Deployed verifier to sepolia:
        // 0xbF8b89C7E818fda93C947e8d15c17BA19535196f 
        url: "https://sepolia.drpc.org",
        accounts: [privateKey],
    },
    polygon: {
        url: "https://rpc-amoy.polygon.technology",
        accounts: [privateKey],
    },
    holesky: {
        url: "https://holesky.gateway.tenderly.co",
        accounts: [privateKey],
    }
  },
};



/*
require("@nomicfoundation/hardhat-toolbox");
require("@parity/hardhat-polkadot");

// Define credentials inline
const SEPOLIA_PRIVATE_KEY = "51bb3bf9f58318135dcc3d19c40902c2cf43d7d7d300afca18bbbbcc459873d6";
const PASSET_HUB_PRIVATE_KEY = "51bb3bf9f58318135dcc3d19c40902c2cf43d7d7d300afca18bbbbcc459873d6";
const LOCAL_PRIVATE_KEY = "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

const SEPOLIA_RPC_URL = "https://1rpc.io/sepolia";
const PASSET_HUB_RPC_URL = "https://testnet-passet-hub-eth-rpc.polkadot.io";
const LOCAL_RPC_URL = "http://127.0.0.1:8545";

 @type import('hardhat/config').HardhatUserConfig 
module.exports = {
  solidity: "0.8.20",
  resolc: {
    version: "1.5.2",
    compilerSource: "npm",
  },
  networks: {
    hardhat: {
      polkavm: true,
      nodeConfig: {
        nodeBinaryPath: 'INSERT_PATH_TO_SUBSTRATE_NODE',
        rpcPort: 8000,
        dev: true,
      },
      adapterConfig: {
        adapterBinaryPath: 'INSERT_PATH_TO_ETH_RPC_ADAPTER',
        dev: true,
      },
    },
    localNode: {
      polkavm: true,
      url: LOCAL_RPC_URL,
      accounts: [LOCAL_PRIVATE_KEY],
    },
    passetHub: {
      polkavm: true,
      url: PASSET_HUB_RPC_URL,
      accounts: [PASSET_HUB_PRIVATE_KEY],
    },
    sepolia: {
      polkavm: false,
      url: SEPOLIA_RPC_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
    }
  },
};
*/


/*
npx hardhat compile
npx hardhat deploy
npx hardhat ignition deploy ./ignition/modules/StorageModule.js --network localNode
npx hardhat ignition deploy ./ignition/modules/StorageModule.js --network passetHub

*/