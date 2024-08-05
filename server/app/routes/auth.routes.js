const { authJwt } = require('../middleware');

const controller = require('../controllers/auth.controller');


module.exports = function(app) {

  app.post('/api/auth/login', controller.signin);


  app.get('/api/auth/logout', controller.signout);


  app.get('/api/auth/roles', [authJwt.verifyToken, authJwt.isPrivileged], controller.roles);

};
