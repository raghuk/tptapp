
const db = require('../models');

const sequelize = db.sequelize;


// Check the User has Admin privileges
exports.isAdmin = (req, res) => {
  res.status(200).send({ message: 'User has admin privileges' });
};

// Check the User has Manager privileges
exports.isManager = (req, res) => {
  res.status(200).send({ message: 'User has manager privileges' });
};
