const db = require('../app/models');


const sequelize = db.sequelize;
const Roles = db.roles;


// Create and Save Roles into database

try {
  sequelize.transaction(async (txn) => {
    await Roles.destroy({ truncate: { cascade: true }, transaction: txn });

    await Roles.create({ id: 1, name: 'admin' }, { transaction: txn });
    await Roles.create({ id: 2, name: 'manager' }, { transaction: txn });

    console.log('Synced roles data.');
  });

} catch (error) {
  console.log('Failed to sync roles data: ', error.message);
}
