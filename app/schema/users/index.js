const joi = require('joi'),
  User = require('../../models/user'),
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
