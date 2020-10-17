const orderService = require('../../services/orders'),
    userService = require('../../services/users'),
    orderSchema = require('../../schema/orders'),
    { DEFAULT_ITEMS_PER_PAGE } = require('../../../config'),
    { PAYMENT_STATUS, ORDER_STATUS } = require('../constant'),
    { validator } = require('../../schema/base'),
    { fetch }= require('../../utils/fetch');

exports.create = async(req, res) => {
    await validator(orderSchema.create, req.body);
    let { user_id } = req.body;
    let user = await userService.findById(user_id);
    const order = await orderService.create(req.body);
    const data = {
        order_id: order.id,
        user_id: user.id,
        user_credentials: user.payment_credentials || {}
    };
    const isPaid = await fetch('/api/payments', { method: 'post', data });
    const status = (isPaid.result === PAYMENT_STATUS.confirmed) ? ORDER_STATUS.delivered : ORDER_STATUS.cancelled;
    await orderService.update(order.id, { status: status, payment_at: new Date().toISOString() });
    res.status(201);
    return order;
};

exports.findById = async (req, res) => {
    const { id } = req.params;
    await validator(orderSchema.findById, { id });
    let order = await orderService.findById(id);
    res.status(200);
    return order;
};

exports.all = async (req, res) => {
    await validator(orderSchema.all, req.query);
    const { page = {} } = req.query;
    const { number = 1, size = DEFAULT_ITEMS_PER_PAGE } = page;
    let orders = await orderService.all({
        number, size
    });
    res.status(200);
    return orders.results;
};

exports.update = async (req, res) => {
    const { id } = req.params;
    await validator(orderSchema.update, { ...req.body, id });
    const order = await orderService.update(id, req.body);
    res.status(200);
    return order;
};

exports.delete = async (req, res) => {
    const { id } = req.params;
    await validator(orderSchema.delete, { id });
    await orderService.delete(id);
    res.status(204);
    return {};
};

exports.retry_payment = async (req, res) => {
    const { id } = req.params;
    await validator(orderSchema.findById, { id });
    let order = await orderService.findById(id);
    let user = await userService.findById(order.user_id);
    const data = {
        order_id: order.id,
        user_id: user.id,
        user_credentials: user.payment_credentials || {}
    };
    const isPaid = await fetch('/api/payments', { method: 'post', data });
    const status = (isPaid.result === PAYMENT_STATUS.confirmed) ? ORDER_STATUS.delivered : ORDER_STATUS.cancelled;
    order = await orderService.update(id, { status: status, payment_at: new Date().toISOString() });
    res.status(200);
    return order;
};

exports.payment_logs = async (req, res) => {
    const { id } = req.params;
    const logs = await fetch('/api/payments', { params: { 'filter[order_id]': id } });
    res.status(200);
    return logs;
};
