require('dotenv').config();

const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');

const db = require('./app/models');


const app = express();

const corsOptions = { origin: '*', credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE'] };

app.use(fileUpload());
app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// sync database
db.sequelize.sync().then(() => {

  console.log('Synced database.');

}).catch((err) => {
  console.log('Failed to sync db: ' + err.message);
});


// app routes
require('./app/routes/app.routes')(app);
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/profile.routes')(app);


// set port, listen for requests
const PORT = process.env.API_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
