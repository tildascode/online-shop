const Cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, './onlne-shop-250de2367b32.json')

const { Storage } = Cloud
const storage = new Storage({
    keyFilename: serviceKey,
    projectId: 'online-shop',
})

module.exports = storage