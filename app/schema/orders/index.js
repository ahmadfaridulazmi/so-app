const joi = require('joi'),
    Order = require('../../models/order'),
    User = require('../../models/user'),
    { MAX_ITEMS_PER_PAGE } = require('../../../config'),
    { exists } = require('../../schema/base');

exports.create = {
    schema: () => {
        return joi.object().keys({
            user_id: joi.number().external(exists(User, 'user_id', 'id')),
            title: joi.string().required(),
            descriptions: joi.string().optional(),
        });
    }
};

exports.findById = {
    schema: () => {
        return joi.object().keys({
            id: joi.number().required().external(exists(Order, 'order_id', 'id')),
        });
    }
};

exports.all = {
    schema: () => {
        return joi.object().keys({
            page: joi.object().keys({
                number: joi.number().positive().optional(),
                size: joi.number().positive().max(MAX_ITEMS_PER_PAGE).optional()
            })
        });
    }
};

exports.update = {
    schema: () => {
        return joi.object().keys({
            id: joi.number().required().external(exists(Order, 'order_id', 'id')),
            title: joi.string().optional(),
            descriptions: joi.string().optional(),
            status: joi.string().optional(),
        });
    }
};

exports.delete = {
    schema: () => {
        return joi.object().keys({
            id: joi.number().required().external(exists(Order, 'order_id', 'id')),
        });
    }
};
