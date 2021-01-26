const knownContracts = require('./known-contracts');
const { POOL_START_DATE } = require('./pools');

// const JAM = artifacts.require('JAM');
// const Share = artifacts.require('Share');
const Oracle = artifacts.require('Oracle');
const IERC20 = artifacts.require('IERC20');

const USDCACLPToken_ACPool = artifacts.require('USDCACLPTokenACPool');

const UniswapV2Factory = artifacts.require('UniswapV2Factory');

module.exports = async (deployer, network, accounts) => {
  const uniswapFactory = ['dev'].includes(network)
    ? await UniswapV2Factory.deployed()
    : await UniswapV2Factory.at(knownContracts.UniswapV2Factory[network]);
  const usdc = await IERC20.at(knownContracts.USDC[network])
  const ac = await IERC20.at(knownContracts.AC[network]);

  const oracle = await Oracle.deployed();

  const usdc_ac_lpt = await oracle.pairFor(
    uniswapFactory.address,
    ac.address,
    usdc.address
  );

  await deployer.deploy(
    USDCACLPToken_ACPool,
    ac.address,
    usdc_ac_lpt,
    POOL_START_DATE
  );
};
