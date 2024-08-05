const { authJwt, verifyUser } = require('../middleware');

const controller = require('../controllers/user.controller');


module.exports = function(app) {

  app.post('/api/users/create', [authJwt.verifyToken, authJwt.isAdmin, verifyUser.checkDuplicateUser, verifyUser.checkRolesExisted], controller.create);


  app.get('/api/users/list', [authJwt.verifyToken, authJwt.isAdmin], controller.findAll);


  app.get('/api/users/:id(\\d+)', [authJwt.verifyToken, authJwt.isPrivileged], controller.findOne);


  app.put('/api/users/:id(\\d+)', [authJwt.verifyToken, authJwt.isAdmin], controller.update);


  app.delete('/api/users/:id(\\d+)', [authJwt.verifyToken, authJwt.isAdmin], controller.delete);


  app.put('/api/users/:id/update/password', [authJwt.verifyToken, authJwt.isAdmin], controller.updatePwd);


  app.get('/api/users/roles', [authJwt.verifyToken, authJwt.isAdmin], controller.userRoles);

};
