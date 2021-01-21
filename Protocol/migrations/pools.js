const INITIAL_JAM_FOR_POOLS = 50000;
const INITIAL_JAZZ_FOR_USDC_JAM = 750000;
const INITIAL_JAZZ_FOR_JAZZ_JAM = 250000;
const INITIAL_AC_FOR_USDC_AC = 1000;

const POOL_START_DATE = Date.parse('2021-01-19T00:00:00Z') / 1000;

const jamPools = [
  { contractName: 'JAMFRAXPool', token: 'FRAX' },
  // { contractName: 'JAMESDPool', token: 'ESD' },
  // { contractName: 'JAMDSDPool', token: 'DSD' },
  { contractName: 'JAMUSDCPool', token: 'USDC' },
  { contractName: 'JAMDAIPool', token: 'DAI' },
  { contractName: 'JAMACPool', token: 'AC' },
];

const jazzPools = {
  USDCAC: { contractName: 'USDCACLPTokenACPool', token: 'USDC_AC-LPv2' },
  // JAZZJAM: { contractName: 'JAZZJAMPool', token: 'Share' }
};

module.exports = {
  POOL_START_DATE,
  INITIAL_JAM_FOR_POOLS,
  INITIAL_JAZZ_FOR_USDC_JAM,
  INITIAL_JAZZ_FOR_JAZZ_JAM,
  INITIAL_AC_FOR_USDC_AC,
  jamPools,
  jazzPools,
};
