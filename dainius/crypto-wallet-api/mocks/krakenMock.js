const generate = () => ({
  error: [],
  result: {
    BTC: Math.random() * 10,
    LTC: Math.random() * 10,
    XXRP: Math.random() * 10,
    ETH: Math.random() * 10,
  },
});

module.exports = {
  generate,
};
