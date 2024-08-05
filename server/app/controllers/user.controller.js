const { Op } = require('sequelize');

const bcrypt = require('bcryptjs');
const db = require('../models');


const sequelize = db.sequelize;
const Users = db.users;
const Roles = db.roles;


// Create and Save a new User
exports.create = async (req, res) => {
  try {
    const newRecord = await sequelize.transaction(async (txn) => {
      const { username, password, firstname, lastname, contact_no, dial_code, active } = req.body;

      // Create User
      const user = await Users.create({
        username: username, password: bcrypt.hashSync(password, 8), firstname: firstname, lastname: lastname,
        contact_no: `${dial_code} ${contact_no}`, active: active
      }, { transaction: txn });

      // Set User Roles
      if (req.body.roles) {
        const roles = await Roles.findAll({ where: { name: { [Op.or]: req.body.roles } }, transaction: txn });
        const result = await user.setRoles(roles, { transaction: txn });

        return { status: 'success', message: "User is registered successfully!" };

      } else {
        // user wiil be assigned 'user' role by default
        const result = await user.setRoles([2], { transaction: txn });

        return { status: 'success', message: "User registered successfully as user!" };
      }
    });

    return (newRecord.status === 'success') ? res.status(200).send(newRecord) : res.status(400).send({ message: newRecord.message });

  } catch (error) {
    res.status(500).send({ message: error.errors });
  }
};

// Retrieve all Users from the database
exports.findAll = async (req, res) => {
  try {
    const list = await Users.findAll({ attributes: { exclude: ['password'] }, include: { all: true, nested: true } });

    return res.status(200).send(list);

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Find a single User with an id
exports.findOne = async (req, res) => {
  try {
    const existRecord = await Users.findOne({
      where: { id: req.params.id }, attributes: { exclude: ['password'] },
      include: { all: true, nested: true }
    });

    return res.status(200).send(existRecord ? existRecord : { message: 'Unable to validate User!' });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Update a User by the id in the request
exports.update = async (req, res) => {
  try {
    const { firstname, lastname, contact_no, dial_code, active } = req.body;

    const updatedRecord = await Users.update({
      firstname: firstname, lastname: lastname, contact_no: `${dial_code} ${contact_no}`, active: active
    }, { where: { id: req.params.id } });

    return res.status(200).send(updatedRecord ? { message: 'User was updated successfully!' } : { message: 'Unable to validate User!' });

  } catch (error) {
    return res.status(500).send({ message: error.errors });
  }
};

// Delete a User with the specified id in the request
exports.delete = async (req, res) => {
  try {
    await Users.destroy({ where: { id: req.params.id } });

    return res.status(200).send({ message: 'User was deleted successfully!' });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Update the User password by the id in the request
exports.updatePwd = async (req, res) => {
  try {
    const updatedRecord = await Users.update({ password: bcrypt.hashSync(req.body.updatedPWD, 8) }, { where: { id: req.params.id } });

    return res.status(200).send(updatedRecord ? { accessToken: null, message: 'User password was updated successfully!' } : { message: 'Not able to update password!' });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

// Retrieve all User roles from the database
exports.userRoles = async (req, res) => {
  try {
    const list = await Roles.findAll();

    return res.status(200).send(list);

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
