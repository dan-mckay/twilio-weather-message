const Flickr = require('flickrapi')

const flickrOptions = {
  api_key: process.env.FLICKR_API_KEY,
  secret: process.env.FLICKR_SECRET,
  user_id: process.env.FLICKR_USER_ID,
  access_token: process.env.FLICKR_ACCESS_TOKEN,
  access_token_secret: process.env.FLICKR_ACCESS_TOKEN_SECRET
}

const TAGS = ['landmark', 'town', 'landscape', 'buildings', 'town centre']

module.exports = (lat, lon) => {
  return new Promise((resolve, reject) => {
    try {
      Flickr.authenticate(flickrOptions, (error, flickr) => {
        if(error) throw new Error(error)

        flickr.photos.search({
          lat: lat,
          lon: lon,
          tags: TAGS
        },(err, result) => {
          if(err) throw new Error(err)

          const ret = result.photos.photo.length === 0 ? undefined : resolveUrl(result.photos.photo)
          resolve(ret)
        })
      })
    } catch(error) {
      reject(error)
    }
  })
}

function resolveUrl(photos) {
  const rand = Math.floor(Math.random() * photos.length)
  const photo = photos[rand]
  return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_n.jpg`
}
