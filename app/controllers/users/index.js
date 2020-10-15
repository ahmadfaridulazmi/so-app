const userService = require('../../services/users'),
    userSchema = require('../../schema/users'),
    { DEFAULT_ITEMS_PER_PAGE } = require('../../../config'),
    { validator } = require('../../schema/base');

exports.create = async(req, res) => {
  await validator(userSchema.create, req.body);
  const user = await userService.create(req.body);
  res.status(201);
  return user;
}

exports.findById = async (req, res) => {
  await validator(userSchema.findById, { ...req.params });
  const { id } = req.params;
  let user = await userService.findById(id);
  res.status(200);
  return user;
}

exports.all = async (req, res) => {
  await validator(userSchema.all, req.query);
  const { page = {}, filter = {} } = req.query;
  const { email } = filter
  const { number = 1, size = DEFAULT_ITEMS_PER_PAGE } = page;
  let users = await userService.all({
    number, size, email
  });
  res.status(200);
  return users.results;
}
