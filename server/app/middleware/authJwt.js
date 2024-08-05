const jwt = require('jsonwebtoken');

const config = require('../config/auth.config.js');
const db = require('../models');

const Users = db.users;
const { TokenExpiredError } = jwt;


getToken = (headers) => {
  let validToken = null;
  let authHeader = headers['authorization'];

  if (typeof authHeader !== 'undefined' ) {
    const token = authHeader.split(' ');
    validToken = token[1];
  }

  return validToken;
};


verifyToken = (req, res, next) => {
  const token = getToken(req.headers);

  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      if (err instanceof TokenExpiredError) {
        return res.status(401).send({ message: 'Access Token is expired!' });
      }

      return res.status(401).send({ message: 'Unauthorized!' });
    }

    req.userId = decoded.id;

    next();
  });
};


isAdmin = async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'admin') {
        return next();
      }
    }

    return res.status(403).send({ message: 'Require Admin Role!' });
  } catch (error) {
    return res.status(500).send({ message: 'Unable to validate User role!' });
  }
};


isManager = async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === 'manager') {
        return next();
      }
    }

    return res.status(403).send({ message: 'Require Manager Role!' });
  } catch (error) {
    return res.status(500).send({ message: 'Unable to validate Manager role!' });
  }
};


isPrivileged = async (req, res, next) => {
  try {
    const user = await Users.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if ((roles[i].name === 'admin') || (roles[i].name === 'manager')) {
        return next();
      }
    }

    return res.status(403).send({ message: 'Require Admin or Manager Role!' });
  } catch (error) {
    return res.status(500).send({ message: 'Unable to validate User role!' });
  }
};


const authJwt = {
  verifyToken,
  isAdmin,
  isManager,
  isPrivileged,
};

module.exports = authJwt;
