// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title IAutoYieldToken
 * @notice Interface for LayerZero OFT-based AutoYield Token
 * @dev Extended OFT with yield-aware cross-chain transfers
 */
interface IAutoYieldToken is IERC20 {
    // Events
    event CrossChainSent(
        address indexed from,
        uint16 indexed dstChainId,
        uint256 amount,
        uint256 apr
    );
    event CrossChainReceived(
        address indexed to,
        uint16 indexed srcChainId,
        uint256 amount
    );
    event APRThresholdUpdated(uint256 oldThreshold, uint256 newThreshold);
    event CircuitBreakerActivated(uint16 indexed chainId, string reason);

    // Structs
    struct CrossChainConfig {
        uint16 chainId;
        uint256 minAPRDelta;
        uint256 maxGasLimit;
        bool enabled;
    }

    // Extended OFT Functions
    function sendWithAPRCheck(
        uint16 _dstChainId,
        bytes memory _toAddress,
        uint256 _amount,
        address payable _refundAddress,
        address _zroPaymentAddress,
        bytes memory _adapterParams
    ) external payable;

    function batchSend(
        uint16[] calldata _dstChainIds,
        uint256[] calldata _amounts,
        address payable _refundAddress
    ) external payable;

    // Configuration
    function setAPRThreshold(uint256 threshold) external;
    function setChainConfig(uint16 chainId, CrossChainConfig calldata config) external;
    function toggleCircuitBreaker(uint16 chainId, bool enabled) external;

    // View Functions
    function estimateSendFee(
        uint16 _dstChainId,
        bytes memory _toAddress,
        uint256 _amount,
        bool _useZro,
        bytes memory _adapterParams
    ) external view returns (uint256 nativeFee, uint256 zroFee);
}

