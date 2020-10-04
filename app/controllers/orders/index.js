const orderService = require('../../services/orders'),
  orderSchema = require('../../schema/orders'),
  { DEFAULT_ITEMS_PER_PAGE } = require('../../../config'),
  { validator } = require('../../schema/base');

exports.create = async(req, res) => {
  await validator(orderSchema.create, req.body);
  const order = await orderService.create(req.body);
  res.status(201);
  return order;
}

exports.findById = async (req, res) => {
  const { id } = req.params;
  await validator(orderSchema.findById, { id });
  let user = await orderService.findById(id);
  res.status(200);
  return user;
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
  await validator(orderService.delete,{ id });
  await orderService.delete(id);
  res.status(204);
  return {};
};
