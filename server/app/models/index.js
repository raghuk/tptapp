const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config.js');


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  operatorsAliases: 0,
  define: {
    underscored: true,
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_unicode_ci'
    }
  },
  pool: {
    max: dbConfig.POOL.max,
    min: dbConfig.POOL.min,
    acquire: dbConfig.POOL.acquire,
    idle: dbConfig.POOL.idle
  }
});


const db = {};
db.sequelize = sequelize;


db.users = require('./user.model.js')(sequelize, DataTypes);
db.roles = require('./role.model.js')(sequelize, DataTypes);
db.vehicles = require('./vehicle.model.js')(sequelize, DataTypes);
db.owners = require('./owner.model.js')(sequelize, DataTypes);
db.dealers = require('./dealer.model.js')(sequelize, DataTypes);
db.fitness = require('./fitness.model.js')(sequelize, DataTypes);
db.permits = require('./permit.model.js')(sequelize, DataTypes);


// Associations - One-To-One, One-To-Many and Many-To-Many
db.roles.belongsToMany(db.users, { through: 'user_roles' });
db.users.belongsToMany(db.roles, { through: 'user_roles' });

db.vehicles.belongsToMany(db.owners, { through: 'vehicle_owners' });
db.dealers.belongsToMany(db.vehicles, { through: 'dealer_vehicles' });

db.vehicles.hasMany(db.fitness, { foreignKey: 'vehicle_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
db.vehicles.hasMany(db.permits, { foreignKey: 'vehicle_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


// Hooks are called before and after calls in sequelize are executed


module.exports = db;
