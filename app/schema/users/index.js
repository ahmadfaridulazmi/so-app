const joi = require('joi'),
    User = require('../../models/user'),
    { MAX_ITEMS_PER_PAGE } = require('../../../config'),
    { exists } = require('../../schema/base');

exports.create = {
  schema: () => {
    return joi.object().keys({
      username: joi.string().max(150).required(),
      email: joi.string().email().required(),
      password: joi.string().required(),
      payment_credentials: joi.object().optional(),
    });
  }
};

exports.findById = {
  schema: () => {
    return joi.object().keys({
      id: joi.number().required().external(exists(User, 'user_id', 'id')),
    });
  }
};

exports.all = {
  schema: () => {
    return joi.object().keys({
      page: joi.object().keys({
        number: joi.number().positive().optional(),
        size: joi.number().positive().max(MAX_ITEMS_PER_PAGE).optional()
      }),
      filter: joi.object().keys({
        email: joi.string().email().optional()
      })
    });
  }
}
