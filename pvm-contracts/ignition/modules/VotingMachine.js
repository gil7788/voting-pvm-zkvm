const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const VERIFIER_ADDRESS = "0x0000000000000000000000000000000000000001"; // replace with actual verifier address
const IMAGE_ID = "0x0000000000000000000000000000000000000000000000000000000000000000"; // replace with actual imageId

const VotingMachineModule = buildModule("VotingMachineModule", (m) => {
  const votingMachine = m.contract("VotingMachine", []);

  m.call(votingMachine, "setVerifierOnce", [VERIFIER_ADDRESS, IMAGE_ID]);

  return { votingMachine };
});

module.exports = VotingMachineModule;
