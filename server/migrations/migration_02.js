const bcrypt = require('bcryptjs');
const db = require('../app/models');


const sequelize = db.sequelize;
const Users = db.users;


// Create Admin Account

try {
  sequelize.transaction(async (txn) => {
    const password = 'admin#108';

    const user = await Users.create({
      username: 'admin', password: bcrypt.hashSync(password, 8), firstname: 'BK', lastname: 'Admin', contact_no: '+91 8008906607', active: true
    }, { transaction: txn });

    const roles = await user.setRoles([1], { transaction: txn });

    console.log('Created Admin User.');
  });

} catch (error) {
  console.log('Failed to create admin account: ', error.message);
}
