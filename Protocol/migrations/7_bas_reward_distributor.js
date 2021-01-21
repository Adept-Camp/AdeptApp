const {
  jazzPools,
  INITIAL_JAZZ_FOR_USDC_JAM,
  INITIAL_AC_FOR_USDC_AC,
  // INITIAL_JAZZ_FOR_JAZZ_JAM
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
  // const totalBalanceForJAZZJAM = unit.muln(INITIAL_JAZZ_FOR_JAZZ_JAM);
  // const totalBalance = totalBalanceForUSDCAC; //.add(totalBalanceForJAZZJAM);

  const ac = await IERC20.at(knownContracts.AC[network]);

  const lpPoolUSDCAC = artifacts.require(jazzPools.USDCAC.contractName);
  // const jazzJAM = artifacts.require(jazzPools.JAZZJAM.contractName);

  await deployer.deploy(
    InitialShareDistributor,
    ac.address,
    lpPoolUSDCAC.address,
    totalBalanceForUSDCAC.toString(),
    // jazzJAM.address,
    // totalBalanceForJAZZJAM.toString()
  );
  const distributor = await InitialShareDistributor.deployed();

  // await share.mint(distributor.address, totalBalance.toString());
  console.log(
    `Deposited ${INITIAL_JAZZ_FOR_USDC_JAM} JAM to InitialShareDistributor.`
  );

  console.log(
    `Setting distributor to InitialShareDistributor (${distributor.address})`
  );
  await lpPoolUSDCAC
    .deployed()
    .then((pool) => pool.setRewardDistribution(distributor.address));

  await distributor.distribute();
}

module.exports = migration;
