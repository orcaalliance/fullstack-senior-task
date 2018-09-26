const logger = require('../utils/logger');

module.exports = async (req, res, removeExchange, name) => {
  try {
    await removeExchange(req.body);
    res.status(200).send(`removed ${name} crypto wallet`);
  } catch (err) {
    logger.error(`Request to remove ${name} exchange wallet failed: ${err}`);
    res.status(500);
  }
};
