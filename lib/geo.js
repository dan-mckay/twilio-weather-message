const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'google',
  apiKey: process.env.GOOGLE_API_KEY
};

const geocoder = NodeGeocoder(options);

module.exports = address => {
  return new Promise((resolve, reject) => {
    geocoder.geocode(address)
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}
