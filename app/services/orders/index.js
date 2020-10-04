const Order = require('../../models/order')

exports.create = (attr = {}) => {
  return Order.query().insert(attr);
}

exports.findById = id => {
  return Order.query().whereNull('deleted_at').findById(id);
}

exports.all = ({ number, size } = {}) => {
  const results = Order.query().whereNull('deleted_at')
  results.orderBy('id', 'desc');
  results.page(Number(number) - 1, size);
  return results;
}

exports.update = (id, attr = {}) => {
  return Order.query().whereNull('deleted_at').patchAndFetchById(id, attr)
}

exports.delete = id => {
  return Order.query().whereNull('deleted_at').patchAndFetchById(id, { deleted_at: new Date() })
}
