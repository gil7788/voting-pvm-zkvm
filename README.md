# Zero Knowledge Voting on Polkadot Virtual Machine!

This repository demostrates a ZK voting machine on chain, as well showcases additional technical improvments that were required in order to facilitate ZK voting on Passet Hub.

## Introduced changes:

1. Created a .gitignore file that helps manage files VCS
2. Relax linter config for development
3. Tooling: Deploy ZK EVM Risc0 Groth16 smart contract verifier for easier general purpose ZK on chian integration 

## Deploy Verifier Smart Contract
This section provide a step by step instructions of the networks that are compatible with Groth16Verifier.

### Deploy Verifier Smart Contract Locally
Spin up a local node by running:

```bash
npx hardhat node
```

Compile and build Smart Contract using following command:

```bash
pnpm contracts:build
```

Make sure to set the local RPC URL and a local user.
Deploy locally using following command:

```bash
pnpm contracts:deploy
```

### Deploy Verifier Smart Contract to Passet Hub
Make sure to set the Passet Hub RPC URL and a test net user.

Compile and build Smart Contract using following command:

```bash
pnpm contracts:build
```

Deploy to Passet Hub using following command:

```bash
pnpm contracts:deploy
```

Smart contracts might be limited with size to get contract size run following commands:

```bash
cd verifier-contract/contracts
npx hardhat size-contracts
```

## Deployed Contracts
```bash
npx hardhat size-contracts
```
Generating typings for: 30 artifacts in dir: typechain-types for target: ethers-v6
Successfully generated 74 typings!
Compiled 22 Solidity files successfully.


```bash
 ·---------------------------------|--------------------------------|--------------------------------·
 |  Solc version: 0.8.20           ·  Optimizer enabled: true       ·  Runs: 200                     │
 ··································|································|·································
 |  Contract Name                  ·  Deployed size (KiB) (change)  ·  Initcode size (KiB) (change)  │
 ··································|································|·································
 |  OutputLib                      ·                      0.084 ()  ·                      0.138 ()  │
 ··································|································|·································
 |  SystemStateLib                 ·                      0.084 ()  ·                      0.138 ()  │
 ··································|································|·································
 |  ReceiptClaimLib                ·                      0.084 ()  ·                      0.138 ()  │
 ··································|································|·································
 |  StructHash                     ·                      0.084 ()  ·                      0.138 ()  │
 ··································|································|·································
 |  RiscZeroSetVerifierLib         ·                      0.084 ()  ·                      0.138 ()  │
 ··································|································|·································
 |  Steel                          ·                      0.084 ()  ·                      0.138 ()  │
 ··································|································|·································
 |  Beacon                         ·                      0.084 ()  ·                      0.138 ()  │
 ··································|································|·································
 |  Encoding                       ·                      0.084 ()  ·                      0.138 ()  │
 ··································|································|·································
 |  Hashes                         ·                      0.084 ()  ·                      0.138 ()  │
 ··································|································|·································
 |  SafeCast                       ·                      0.084 ()  ·                      0.138 ()  │
 ··································|································|·································
 |  MerkleProof                    ·                      0.084 ()  ·                      0.138 ()  │
 ··································|································|·································
 |  ControlID                      ·                      0.209 ()  ·                      0.265 ()  │
 ··································|································|·································
 |  Strings2                       ·                      1.056 ()  ·                      1.112 ()  │
 ··································|································|·································
 |  RiscZeroVerifierEmergencyStop  ·                      1.690 ()  ·                      2.031 ()  │
 ··································|································|·································
 |  Groth16Verifier                ·                      1.705 ()  ·                      1.736 ()  │
 ··································|································|·································
 |  RiscZeroMockVerifier           ·                      2.098 ()  ·                      2.254 ()  │
 ··································|································|·································
 |  RiscZeroVerifierRouter         ·                      2.301 ()  ·                      2.575 ()  │
 ··································|································|·································
 |  RiscZeroSetVerifier            ·                      3.982 ()  ·                      5.132 ()  │
 ··································|································|·································
 |  RiscZeroGroth16Verifier        ·                      4.764 ()  ·                      9.430 ()  │
 ·---------------------------------|--------------------------------|--------------------------------·
```

## Refernces
 * [Boilerplate Polkadot Repository](https://www.npmjs.com/package/create-polkadot-dapp?activeTab=readme).
 * Verification Smart Contract was refactored using HardHat based on [this](https://github.com/risc0/risc0-ethereum) Foundry repository.
 * Project Idea and Prover implementation inspired and based on [this](https://github.com/risc0/risc0/tree/release-2.0/examples/voting-machine) repository.
 * Beloved [docs](https://dev.risczero.com/api)


### Boilerplate Polkadot Repository
This template sets up a combination of Solidity smart contracts and a React front-end app that interacts with these
smart contracts.  
This template includes

* [ethers](https://docs.ethers.org/v6/) for smart contract interaction
* [Tailwind CSS](https://tailwindcss.com) + [Tailwind UI](https://tailwindui.com/).
* [Vite](https://vite.dev/) for dev tooling.
