// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IRiscZeroVerifier} from "./IRiscZeroVerifier.sol";

contract VotingMachine {
    enum Phase {
        Uninitialized,
        Open,
        Frozen
    }

    address public admin;
    Phase public currentPhase;

    mapping(address => bool) public hasVoted;
    uint256 public voteCount;
    bool public pollsOpen;

    bytes32 public currentStateDigest;
    bytes32 public imageId;
    IRiscZeroVerifier public verifier;
    bool public verifierSet;

    event Initialized(bytes32 initialState);
    event BallotSubmitted(address voter, bool voteYes, bool counted, bytes32 newState);
    event Frozen(uint256 finalYesCount, bytes32 finalState);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    modifier onlyOnce() {
        require(!verifierSet, "Verifier already set");
        _;
    }

    constructor() {
        admin = msg.sender;
        currentPhase = Phase.Uninitialized;
    }

    /// @notice One-time verifier & imageId setup, callable only by admin
    function setVerifierOnce(address _verifier, bytes32 _imageId) external onlyAdmin onlyOnce {
        verifier = IRiscZeroVerifier(_verifier);
        imageId = _imageId;
        verifierSet = true;
    }

    /// @notice Initializes voting state with a valid proof
    function initialize(bytes calldata proof, bytes32 journalDigest) external onlyAdmin {
        require(verifierSet, "Verifier not set");
        require(currentPhase == Phase.Uninitialized, "Already initialized");

        verifier.verify(proof, imageId, journalDigest);
        currentStateDigest = journalDigest;

        currentPhase = Phase.Open;
        pollsOpen = true;

        emit Initialized(journalDigest);
    }

    /// @notice Submits a ballot and verifies proof of valid state transition
    function submitBallot(
        bytes calldata proof,
        bytes32 oldStateDigest,
        bytes32 newStateDigest,
        address voter,
        bool voteYes,
        bool voteCounted,
        uint256 updatedVoteCount
    ) external {
        require(currentPhase == Phase.Open, "Voting not open");
        require(verifierSet, "Verifier not set");
        require(oldStateDigest == currentStateDigest, "State mismatch");
        require(!hasVoted[voter], "Already voted");

        verifier.verify(proof, imageId, newStateDigest);

        if (voteCounted) {
            voteCount = updatedVoteCount;
        }

        hasVoted[voter] = true;
        currentStateDigest = newStateDigest;

        emit BallotSubmitted(voter, voteYes, voteCounted, newStateDigest);
    }

    /// @notice Freezes the voting and verifies the final result
    function freeze(
        bytes calldata proof,
        bytes32 finalStateDigest,
        uint256 finalYesCount
    ) external onlyAdmin {
        require(currentPhase == Phase.Open, "Voting already frozen or not open");
        require(verifierSet, "Verifier not set");

        verifier.verify(proof, imageId, finalStateDigest);

        currentPhase = Phase.Frozen;
        pollsOpen = false;
        voteCount = finalYesCount;
        currentStateDigest = finalStateDigest;

        emit Frozen(finalYesCount, finalStateDigest);
    }

    function getPhase() external view returns (string memory) {
        if (currentPhase == Phase.Uninitialized) return "Uninitialized";
        if (currentPhase == Phase.Open) return "Open";
        return "Frozen";
    }
}
