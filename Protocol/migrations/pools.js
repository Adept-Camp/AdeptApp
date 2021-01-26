const INITIAL_AC_FOR_USDC_AC = 1000;

const POOL_START_DATE = Date.parse('2021-01-19T00:00:00Z') / 1000;

const pools = {
  USDCAC: { contractName: 'USDCACLPTokenACPool', token: 'USDC_AC-LPv2' },
};

module.exports = {
  POOL_START_DATE,
  INITIAL_AC_FOR_USDC_AC,
  pools,
};
