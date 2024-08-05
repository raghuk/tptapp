const { authJwt, verifyUser } = require('../middleware');

const controller = require('../controllers/profile.controller');


module.exports = function(app) {

  app.get('/api/profile/details', [authJwt.verifyToken, authJwt.isPrivileged], controller.getDetails);


  app.put('/api/profile/update/details', [authJwt.verifyToken, authJwt.isPrivileged], controller.updateDetails);


  app.put('/api/profile/update/password', [authJwt.verifyToken, authJwt.isPrivileged], controller.updatePwd);

};
