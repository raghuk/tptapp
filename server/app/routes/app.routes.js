const path = require('path');
const { authJwt } = require('../middleware');

const controller = require('../controllers/app.controller');

const FILES_DIR = path.join(__dirname, '../', 'files');


module.exports = function(app) {

  app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to TPT INS application.' });
  });


  app.get('/api/files/:file(*)', (req, res, next) => {
    res.download(req.params.file, { root: FILES_DIR }, (err) => {
      if (!err) return; // file sent

      if (err.status !== 404) return next(err); // non-404 error

      // file for download not found
      res.statusCode = 404;
      res.send('Cant find that file, Sorry!');
    });
  });


  app.get('/api/validate/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.isAdmin);


  app.get('/api/validate/manager', [authJwt.verifyToken, authJwt.isManager], controller.isManager);

};
