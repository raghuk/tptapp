const db = require('../models');

const Users = db.users;
const USER_ROLES = ['admin', 'manager'];


checkDuplicateUser = async (req, res, next) => {
  try {
    let user = await Users.findOne({ where: { username: req.body.username } });

    if (user) {
      return res.status(400).send({ message: 'Failed! Username is already in use!' });
    }

    next();
  } catch (error) {
    return res.status(500).send({ message: 'Unable to validate Username!' });
  }
};


checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!USER_ROLES.includes(req.body.roles[i])) {
        res.status(400).send({ message: 'Failed! Role does not exist = ' + req.body.roles[i] });
        return;
      }
    }
  }

  next();
};


const verifyUser = {
  checkDuplicateUser,
  checkRolesExisted
};

module.exports = verifyUser;
