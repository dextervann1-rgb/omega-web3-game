// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ECDSA} from "openzeppelin-contracts/contracts/utils/cryptography/ECDSA.sol";
import {MessageHashUtils} from "openzeppelin-contracts/contracts/utils/cryptography/MessageHashUtils.sol";

/**
 * @title LockingFacet
 * @dev Implements the Harmoney Key security framework using secondary cryptographic signatures.
 * Optimized for Account Abstraction and deployment on the Base network.
 */
contract LockingFacet {
    using ECDSA for bytes32;
    using MessageHashUtils for bytes32;

    address public owner;
    address public harmoneyKeySigner; // Authorized secondary cryptographic device

    mapping(address => bool) public isLocked;
    mapping(address => uint256) public assetNonces; // Replay attack protection per asset

    event AssetLocked(address indexed asset, bool indexed isLocked);
    event HarmoneyKeyUpdated(address indexed oldKey, address indexed newKey);
    event SecureActionExecuted(address indexed asset, address indexed executor);

    modifier onlyOwner() {
        require(msg.sender == owner, "Harmoney Key Error: Unauthorized Owner");
        _;
    }

    /**
     * @param _harmoneyKeySigner The public address of the secondary device holding the Harmoney Key.
     */
    constructor(address _harmoneyKeySigner) {
        require(_harmoneyKeySigner != address(0), "Invalid Harmoney Key address");
        owner = msg.sender;
        harmoneyKeySigner = _harmoneyKeySigner;
    }

    /**
     * @notice Updates the secondary Harmoney Key signer address.
     * @param _newKey The public address of the new cryptographic device.
     */
    function updateHarmoneyKey(address _newKey) external onlyOwner {
        require(_newKey != address(0), "Invalid key address");
        emit HarmoneyKeyUpdated(harmoneyKeySigner, _newKey);
        harmoneyKeySigner = _newKey;
    }

    /**
     * @notice Registers an RWA, digital land parcel, or NFT registry as "Locked".
     * @param target The asset or contract address to secure.
     * @param status True to enforce master lock protection, false to disable.
     */
    function setAssetLockState(address target, bool status) external onlyOwner {
        isLocked[target] = status;
        emit AssetLocked(target, status);
    }

    /**
     * @notice View function for external dApps or master routers to audit asset accessibility.
     * @param target The asset address being evaluated.
     */
    function checkAccess(address target) external view {
        require(!isLocked[target], "Security Alert: Asset is locked by Harmoney Key");
    }

    /**
     * @notice Unlocks a locked asset configuration or authorizes a critical transfer payload.
     * @param target The locked asset address.
     * @param signature The EIP-191 compliant ECDSA signature generated off-chain by the Harmoney Key device.
     */
    function verifyAndUnlockAsset(address target, bytes memory signature) external onlyOwner {
        require(isLocked[target], "Harmoney Key Error: Target asset is already active");

        // Generate a strict cryptographic digest to bind the signature context
        bytes32 messageHash = keccak256(
            abi.encodePacked(
                target, 
                assetNonces[target], 
                block.chainid, 
                address(this)
            )
        );
        
        // Format the hash to match standard Ethereum signed message parameters (\x19Ethereum Signed Message:\n32)
        bytes32 ethSignedMessageHash = messageHash.toEthSignedMessageHash();

        // Cryptographically recover the signing identity
        address recoveredSigner = ethSignedMessageHash.recover(signature);

        // Enforce the dual-key authorization paradigm
        require(recoveredSigner == harmoneyKeySigner, "Harmoney Key Error: Cryptographic Signature Mismatch");

        // Increment nonce to permanently prevent transaction replay attacks
        assetNonces[target]++;

        // Unlock state mutation
        isLocked[target] = false;
        emit AssetLocked(target, false);
        emit SecureActionExecuted(target, msg.sender);
    }
}
