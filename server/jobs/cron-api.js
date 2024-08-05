require('dotenv').config();

const https = require('https');


const user_data = JSON.stringify({ username: 'admin', password: 'admin#108' });

const login_options = {
  hostname: process.env.APP_URL,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(user_data)
  }
}

const reset_vehicles = {
  hostname: process.env.APP_URL,
  path: '/api/reset/vehicles',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


const getUserDetails = () => {
  console.log('getToken API Called =======>', new Date().toLocaleString());

  const request = https.request(login_options, (response) => {
    let data = [];

    // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
    response.setEncoding('utf8');

    // A chunk of data has been received.
    response.on('data', (chunk) => { data.push(chunk); });

    // The whole response has been received. Print out the result.
    response.on('end', () => {
      const resp = JSON.parse(data);
      // console.log('getToken response ===>', resp);

      resetVehicles(resp.accessToken);
    });
  });

  request.write(user_data);

  // Log errors if any occur
  request.on('error', (error) => { console.log('getToken API Error ===> ', error); });

  // End the request
  request.end();
};

const resetVehicles = (accessToken) => {
  console.log('resetVehicles API Called =======>');

  const request = https.request({ ...reset_vehicles, headers: { ...reset_vehicles.headers, Authorization: 'Bearer ' + accessToken } }, (response) => {
    let data = [];

    // Set the encoding, so we don't get log to the console a bunch of gibberish binary data
    response.setEncoding('utf8');

    // A chunk of data has been received.
    response.on('data', (chunk) => { data.push(chunk); });

    // The whole response has been received. Print out the result.
    response.on('end', () => { console.log('resetVehicles API Response ===> ', JSON.parse(data)); });
  });

  // Log errors if any occur
  request.on('error', (error) => { console.log('resetQuizzes API Error ===> ', error); });

  // End the request
  request.end();
};


getUserDetails();
