const Model = require('./base');
const User = require('./user');

class Order extends Model {
  static tableName = 'orders';

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
          user: {
              relation: Model.BelongsToOneRelation,
              modelClass: User,
              join: {
                  from: 'orders.user_id',
                  to: 'users.id'
              }
          },
      };
  }

}

module.exports = Order;
