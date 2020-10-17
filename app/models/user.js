const Model = require('./base');
const Order = require('./order');

class User extends Model {
  static tableName = 'users';

  static getTableName() {
      return this.tableName;
  }

  $beforeInsert() {
      this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
      this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
      return {
          orders: {
              relation: Model.HasManyRelation,
              modelClass: Order,
              join: {
                  from: 'users.id',
                  to: 'orders.user_id'
              }
          }
      };
  }
}

module.exports = User;
