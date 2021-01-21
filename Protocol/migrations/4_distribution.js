// const knownContracts = require('./known-contracts');
// const { jamPools, POOL_START_DATE } = require('./pools');

// Tokens
// deployed first
// const JAM = artifacts.require('JAM');
// const JAZZ = artifacts.require('Share');
// const JAZZJAMPool = artifacts.require('JAZZJAMPool');

// ============ Main Migration ============
module.exports = async (deployer, network, accounts) => {
  // for await (const { contractName, token } of jamPools) {
  //   const tokenAddress = knownContracts[token][network];
  //   if (!tokenAddress) {
  //     // network is mainnet, so MockDai is not available
  //     throw new Error(
  //       `Address of ${token} is not registered on migrations/known-contracts.js!`
  //     );
  //   }

  //   const contract = artifacts.require(contractName);
  //   await deployer.deploy(contract, JAM.address, tokenAddress, POOL_START_DATE);
  // }
  // await deployer.deploy(JAZZJAMPool, JAZZ.address, JAM.address, POOL_START_DATE);
};
