const userService = require('../../services/users'),
  userSchema = require('../../schema/users'),
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
