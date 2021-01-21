// const { jamPools, INITIAL_JAM_FOR_POOLS } = require('./pools');

// Pools
// deployed first
// const JAM = artifacts.require('JAM');
// const InitialJAMDistributor = artifacts.require('InitialJAMDistributor');

// ============ Main Migration ============

module.exports = async (deployer, network, accounts) => {
  // const unit = web3.utils.toBN(10 ** 18);
  // const initialJamAmount = unit.muln(INITIAL_JAM_FOR_POOLS).toString();

  // const jam = await JAM.deployed();
  // const pools = jamPools.map(({ contractName }) =>
  //   artifacts.require(contractName)
  // );

  // await deployer.deploy(
  //   InitialJAMDistributor,
  //   jam.address,
  //   pools.map((p) => p.address),
  //   initialJamAmount
  // );
  // const distributor = await InitialJAMDistributor.deployed();

  // console.log(
  //   `Setting distributor to InitialJAMDistributor (${distributor.address})`
  // );
  // for await (const poolInfo of pools) {
  //   const pool = await poolInfo.deployed();
  //   await pool.setRewardDistribution(distributor.address);
  // }

  // await jam.mint(distributor.address, initialJamAmount);
  // console.log(
  //   `Deposited ${INITIAL_JAM_FOR_POOLS} JAM to InitialJAMDistributor.`
  // );

  // await distributor.distribute();
};
