const {
  pools,
  INITIAL_AC_FOR_USDC_AC,
} = require('./pools');
const IERC20 = artifacts.require('IERC20');
const knownContracts = require('./known-contracts');

// Pools
// deployed first
const InitialShareDistributor = artifacts.require('InitialShareDistributor');

// ============ Main Migration ============

async function migration(deployer, network, accounts) {
  const unit = web3.utils.toBN(10 ** 18);
  const totalBalanceForUSDCAC = unit.muln(INITIAL_AC_FOR_USDC_AC);

  const ac = await IERC20.at(knownContracts.AC[network]);

  const lpPoolUSDCAC = artifacts.require(pools.USDCAC.contractName);

  await deployer.deploy(
    InitialShareDistributor,
    ac.address,
    lpPoolUSDCAC.address,
    totalBalanceForUSDCAC.toString(),
  );
  const distributor = await InitialShareDistributor.deployed();

  console.log(
    `Setting distributor to InitialShareDistributor (${distributor.address})`
  );
  await lpPoolUSDCAC
    .deployed()
    .then((pool) => pool.setRewardDistribution(distributor.address));

  await distributor.distribute();
}

module.exports = migration;
