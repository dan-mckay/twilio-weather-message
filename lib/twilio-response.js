const twilio = require('twilio')

const client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

module.exports = (body, mediaUrl) => {
  return new Promise((resolve, reject) => {
    try {
      const twiml = new twilio.TwimlResponse();
      if(typeof mediaUrl === 'undefined') {
        mediaUrl = 'Sorry, we could not find a photograph of your location'
      }
      twiml.message(mediaUrl)
      twiml.message(body)

      resolve(twiml)
    } catch(error) {
      reject(error)
    }

  })
}
