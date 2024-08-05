const bcrypt = require('bcryptjs');

const db = require('../models');


const sequelize = db.sequelize;
const Users = db.users;


// Get Details
exports.getDetails = async (req, res) => {
  try {
    const existRecord = await Users.findOne({
      where: { id: req.userId },
      attributes: ['firstname', 'lastname', 'contact_no']
    });

    return res.status(200).send(existRecord);

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Update Details
exports.updateDetails = async (req, res) => {
  try {
    const { firstname, lastname, contact_no, dial_code } = req.body;

    const updatedRecord = await sequelize.transaction(async (txn) => {
      await Users.update({
        firstname: firstname, lastname: lastname, contact_no: `${dial_code} ${contact_no}`
      }, { where: { id: req.userId }, transaction: txn });

      return await Users.findOne({
        where: { id: req.userId },
        attributes: ['firstname', 'lastname', 'contact_no'],
        transaction: txn
      });
    });

    return res.status(200).send(updatedRecord);

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Update Password
exports.updatePwd = async (req, res) => {
  try {
    const updatedRecord = await Users.update({ password: bcrypt.hashSync(req.body.updatedPWD, 8) }, { where: { id: req.userId } });

    return res.status(200).send(updatedRecord ? { accessToken: null, message: 'User password was updated successfully!' } : { message: 'Unable to update password!' });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
