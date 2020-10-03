const User = require('../../models/user')

exports.create = (attr = {}) => {
  return User.query().insert(attr);
}

exports.findById = id => {
  return User.query().findById(id);
}
