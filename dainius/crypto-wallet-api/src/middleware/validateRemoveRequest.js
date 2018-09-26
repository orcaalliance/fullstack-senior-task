const Joi = require('joi');
const logger = require('../utils/logger');

const inputSchema = Joi.object().keys({
  cryptoExchange: Joi.string().valid(['binance', 'kraken']).required(),
}).options({ stripUnknown: true });

module.exports = async (req, res, next) => {
  try {
    const { error } = Joi.validate(req.body, inputSchema);
    if (error) {
      logger.error(`Request to ${req.path} failed: invalid request input: \n`, error.details);
      res.status(202).send('Invalid crypto exchange name');
      return;
    }
    next();
  } catch (err) {
    logger.error(`Request to ${req.path} failed: ${err}`);
    res.status(500);
  }
};
