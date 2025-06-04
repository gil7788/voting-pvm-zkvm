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
      // 0x832993eCa3D8445b08EE8B9da8ad259CB1804BfF
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
        url: "https://ethereum-holesky-rpc.publicnode.com",
        accounts: [privateKey],
    }
  },
};
