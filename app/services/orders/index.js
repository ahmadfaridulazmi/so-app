const Order = require('../../models/order')
const { DEFAULT_ITEMS_PER_PAGE } = require('../../../config')

exports.create = (attr = {}) => {
  return Order.query().insert(attr);
}

exports.findById = id => {
  Order.query().whereNull('deleted_at').findById(id);
}

exports.all = ({ page } = {}) => {
  const results = Order.query().whereNull('deleted_at')
  results.orderBy('id', 'desc');
  results.page(Number(page?.number || 1) - 1, page?.size || DEFAULT_ITEMS_PER_PAGE);
  return results;
}

exports.update = ({id, attr}) => {
  Order.query().whereNull('deleted_at').patchAndFetchById(id, attr)
}

exports.delete = id => {
  Order.query().whereNull('deleted_at').patchAndFetchById(id, { deleted_at: new Date() })
}
