pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

import '../interfaces/IDistributor.sol';
import '../interfaces/IRewardDistributionRecipient.sol';

contract InitialShareDistributor is IDistributor {
    using SafeMath for uint256;

    event Distributed(address pool, uint256 cashAmount);

    bool public once = true;

    IERC20 public share;
    IRewardDistributionRecipient public usdcacLPPool;
    uint256 public usdcacInitialBalance;
    // IRewardDistributionRecipient public daibasLPPool;
    // uint256 public daibasInitialBalance;

    constructor(
        IERC20 _share,
        IRewardDistributionRecipient _usdcacLPPool,
        uint256 _usdcacInitialBalance
        // IRewardDistributionRecipient _daibasLPPool,
        // uint256 _daibasInitialBalance
    ) public {
        share = _share;
        usdcacLPPool = _usdcacLPPool;
        usdcacInitialBalance = _usdcacInitialBalance;
        // daibasLPPool = _daibasLPPool;
        // daibasInitialBalance = _daibasInitialBalance;
    }

    function distribute() public override {
        require(
            once,
            'InitialShareDistributor: you cannot run this function twice'
        );

        share.transfer(address(usdcacLPPool), usdcacInitialBalance);
        usdcacLPPool.notifyRewardAmount(usdcacInitialBalance);
        emit Distributed(address(usdcacLPPool), usdcacInitialBalance);

        // share.transfer(address(daibasLPPool), daibasInitialBalance);
        // daibasLPPool.notifyRewardAmount(daibasInitialBalance);
        // emit Distributed(address(daibasLPPool), daibasInitialBalance);

        once = false;
    }
}
