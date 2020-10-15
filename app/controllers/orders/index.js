const orderService = require('../../services/orders'),
  userService = require('../../services/users'),
  orderSchema = require('../../schema/orders'),
  { DEFAULT_ITEMS_PER_PAGE } = require('../../../config'),
  { PAYMENT_STATUS, ORDER_STATUS } = require('../constant'),
  { validator } = require('../../schema/base'),
  { fetch }= require('../../utils/fetch')

exports.create = async(req, res) => {
  await validator(orderSchema.create, req.body);
  let body = req.body
  let { user_email } = req.body;
  if (user_email) {
    const user = await userService.findByEmail(user_email)
    body['user_id'] = user.id
    delete body.user_email
  }
  const order = await orderService.create(body);
  const isPaid = await fetch('/api/payments', { method: 'post' })
  const status = (isPaid.result === PAYMENT_STATUS.confirmed) ? ORDER_STATUS.delivered : ORDER_STATUS.cancelled
  await orderService.update(order.id, { status: status, payment_at: new Date().toISOString() })
  res.status(201);
  return order;
}

exports.findById = async (req, res) => {
  const { id } = req.params;
  await validator(orderSchema.findById, { id });
  let order = await orderService.findById(id);
  res.status(200);
  return order;
}

exports.all = async (req, res) => {
  await validator(orderSchema.all, req.query);
  const { page = {}, filter = {} } = req.query;
  const { number = 1, size = DEFAULT_ITEMS_PER_PAGE } = page;
  let orders = await orderService.all({
    number, size
  });
  res.status(200);
  return orders.results;
}

exports.update = async (req, res) => {
  const { id } = req.params;
  await validator(orderSchema.update, { ...req.body, id });
  const order = await orderService.update(id, req.body);
  res.status(200);
  return order;
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await validator(orderSchema.delete,{ id });
  await orderService.delete(id);
  res.status(204);
  return {};
};

exports.retry_payment = async (req, res) => {
  const { id } = req.params;
  await validator(orderSchema.findById,{ id });
  const isPaid = await fetch('/api/payments', { method: 'post' })
  const status = (isPaid.result === PAYMENT_STATUS.confirmed) ? ORDER_STATUS.delivered : ORDER_STATUS.cancelled
  const order = await orderService.update(id, { status: status, payment_at: new Date().toISOString() })
  res.status(200);
  return order;
};
