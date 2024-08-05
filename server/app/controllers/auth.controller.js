const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const config = require('../config/auth.config');


const sequelize = db.sequelize;
const Users = db.users;


exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username, active: true } });

    if (!user) {
      return res.status(404).send({ accessToken: null, message: 'User not found. Please verify the user details.' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: 'Invalid Password!' });
    }

    const token = jwt.sign({ id: user.id }, config.secret, { algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: config.jwtExpiration });

    const roles = await user.getRoles();
    const authorities = setRoles(roles);

    return res.status(200).send({
      user: { id: user.id, username: user.username, firstname: user.firstname, lastname: user.lastname, accessToken: token },
      roles: authorities
    });

  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.roles = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.userId } });

    const roles = await user.getRoles();
    const authorities = setRoles(roles);

    return res.status(200).send({ roles: authorities });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ accessToken: null, message: 'You have been signed out!' });
  } catch (error) {
    this.next(error);
  }
};


// Helper Functions
setRoles = (roles) => {
  let authorities = [];

  for (let i = 0; i < roles.length; i++) {
    authorities.push('ROLE_' + roles[i].name.toUpperCase());
  }

  return authorities;
};
