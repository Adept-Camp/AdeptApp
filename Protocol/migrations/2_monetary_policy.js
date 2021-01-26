
const knownContracts = require('./known-contracts');
const IERC20 = artifacts.require('IERC20');
const Oracle = artifacts.require('Oracle');

const UniswapV2Factory = artifacts.require('UniswapV2Factory');
const UniswapV2Router02 = artifacts.require('UniswapV2Router02');

const HOUR = 60 * 60;
// const DAY = 86400;
const ORACLE_START_DATE = Date.parse('2021-01-27T00:00:00Z') / 1000;

async function migration(deployer, network, accounts) {
  let uniswap, uniswapRouter;
  if (['dev'].includes(network)) {
    console.log('Deploying uniswap on dev network.');
    await deployer.deploy(UniswapV2Factory, accounts[0]);
    uniswap = await UniswapV2Factory.deployed();

    await deployer.deploy(UniswapV2Router02, uniswap.address, accounts[0]);
    uniswapRouter = await UniswapV2Router02.deployed();
  } else {
    uniswap = await UniswapV2Factory.at(
      knownContracts.UniswapV2Factory[network]
    );
    uniswapRouter = await UniswapV2Router02.at(
      knownContracts.UniswapV2Router02[network]
    );
  }

  const usdc = await IERC20.at(knownContracts.USDC[network]);
  const ac = await IERC20.at(knownContracts.AC[network]);

  // // 2. provide liquidity to JAM-USDC
  // // if you don't provide liquidity to JAM-USDC pair after step 1 and before step 3,
  // //  creating Oracle will fail with NO_RESERVES error.
  const unit = web3.utils.toBN(10 ** 18).toString();
  const usdcUnit = web3.utils.toBN(10 ** 6).toString();
  const usdcMax = web3.utils
    .toBN(10 ** 6)
    .muln(5)
    .toString();
  const max = web3.utils
    .toBN(10 ** 18)
    .muln(5)
    .toString();

  // const jam = await JAM.deployed();
  // const share = await Share.deployed();

  console.log('Approving Uniswap on tokens for liquidity', ac.address);
  await Promise.all([
    approveIfNot(ac, accounts[0], uniswapRouter.address, max),
    approveIfNot(usdc, accounts[0], uniswapRouter.address, usdcMax),
  ]);

  // // WARNING: msg.sender must hold enough USDC to add liquidity to JAM-USDC
  // // otherwise transaction will revert
  // console.log('Adding liquidity to pools', jam.address, usdc.address);
  await uniswapRouter.addLiquidity(
    ac.address,
    usdc.address,
    unit,
    usdcUnit,
    unit,
    usdcUnit,
    accounts[0],
    deadline()
  );

  // // 2. Deploy oracle for the pair between bac and usdc
  await deployer.deploy(
    Oracle,
    uniswap.address,
    ac.address,
    usdc.address,
    HOUR,
    ORACLE_START_DATE
  );
}

async function approveIfNot(token, owner, spender, amount) {
  const allowance = await token.allowance(owner, spender);
  if (web3.utils.toBN(allowance).gte(web3.utils.toBN(amount))) {
    return;
  }
  await token.approve(spender, amount);
  console.log(
    ` - Approved ${token.symbol ? await token.symbol() : token.address}`
  );
}

function deadline() {
  // 30 minutes
  return Math.floor(new Date().getTime() / 1000) + 1800;
}

module.exports = migration;
