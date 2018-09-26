const generate = () => ({
  makerCommission: 15,
  takerCommission: 15,
  buyerCommission: 0,
  sellerCommission: 0,
  canTrade: true,
  canWithdraw: true,
  canDeposit: true,
  updateTime: 123456789,
  balances: [
    {
      asset: 'BTC',
      free: Math.random() * 10,
      locked: '0.00000000',
    },
    {
      asset: 'LTC',
      free: Math.random() * 10,
      locked: '0.00000000',
    },
    {
      asset: 'XXRP',
      free: Math.random() * 10,
      locked: '0.00000000',
    },
  ],
});

module.exports = {
  generate,
};
