// ignition/modules/RiscZeroGroth16Verifier.js

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const CONTROL_ROOT = "0x0000000000000000000000000000000000000000000000000000000000000000";
const BN254_CONTROL_ID = "0x0000000000000000000000000000000000000000000000000000000000000000";

const RiscZeroGroth16VerifierModule = buildModule("RiscZeroGroth16VerifierModule", (m) => {
  const controlRoot = m.getParameter("control_root", CONTROL_ROOT);
  const bn254ControlId = m.getParameter("bn254_control_id", BN254_CONTROL_ID);

  const verifier = m.contract("RiscZeroGroth16Verifier", [controlRoot, bn254ControlId]);

  return { verifier };
});

module.exports = RiscZeroGroth16VerifierModule;
