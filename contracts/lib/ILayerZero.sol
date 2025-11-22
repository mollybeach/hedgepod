// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * @title ILayerZeroEndpoint
 * @notice Stub interface for LayerZero endpoint
 * @dev This is a simplified version for compilation. Use @layerzerolabs/solidity-examples in production
 */
interface ILayerZeroEndpoint {
    function send(
        uint16 _dstChainId,
        bytes calldata _destination,
        bytes calldata _payload,
        address payable _refundAddress,
        address _zroPaymentAddress,
        bytes calldata _adapterParams
    ) external payable;
}

