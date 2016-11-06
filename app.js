require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const logger = require('morgan')
const request = require('request')
const twilio = require('twilio')

const getPhotoUrl = require('./lib/photo-url')
const getGeoData = require('./lib/geo')
const weather = require('./lib/weather')
const twilioRes = require('./lib/twilio-response')

const app = express()
app.use(express.static('public'))

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/sms', (req, res) => {
  const data = {}
  data.userTel = req.body.From
  data.userQuery = req.body.Body

  console.log(data.userTel)

  getGeoData(data.userQuery)
    .then(geo => {
      data.geo = geo[0]
      return weather.getData(data.geo.latitude, data.geo.longitude)
    })
    .then(res => {
      data.weather = res
      data.message = weather.getMessage(data)

      return getPhotoUrl(data.geo.latitude, data.geo.longitude)
    })
    .then(url => {
      data.photoUrl = url

      return twilioRes(data.message, data.photoUrl)
    })
    .then(twiml => {
      res.writeHead(200, {'Content-Type': 'text/xml'});
      res.end(twiml.toString())
    })
    .catch(err => {
      console.error('ERROR', err)
      res.send(err)
    })
})

const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
})
