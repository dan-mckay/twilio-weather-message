const dedent = require('dedent-js')
const request = require('request-promise')

const weatherKey = ''

exports.getData = (lat, lon) => {
  const options = {
    uri: 'http://api.openweathermap.org/data/2.5/weather',
    qs: {
      lat,
      lon,
      units: 'metric',
      APIKEY: process.env.WEATHER_API_KEY
    },
    json: true
  }

  return new Promise((resolve, reject) => {
    request(options)
      .then(data => {
        resolve(data)
      })
      .catch(err => {
        reject(error)
      })
  })
}

exports.getMessage = data => {
  return dedent(`${data.geo.city}, ${data.geo.countryCode}
                Weather: ${data.weather.weather[0].main}
                Description: ${data.weather.weather[0].description}
                Temp: ${data.weather.main.temp} celsius
                Clouds: ${data.weather.clouds.all}%
                Air Pressure: ${data.weather.main.pressure} hPa
                Humidity: ${data.weather.main.humidity}%
                Wind: ${data.weather.wind.speed} metres/sec`)
}
