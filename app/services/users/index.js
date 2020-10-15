const User = require('../../models/user')

exports.create = (attr = {}) => {
  return User.query().insert(attr);
}

exports.findById = id => {
  return User.query().findById(id);
}

exports.all = ({ number, size, email } = {}) => {
  const results = User.query().whereNull('deleted_at')
  email && results.where('email', email)
  results.orderBy('id', 'desc');
  results.page(Number(number) - 1, size);
  return results;
}
