const util = require('util')
const gc = require(__dirname + '/../../config/')
const bucket = gc.bucket('onlne-shop.appspot.com')
const DEFAULT_IMAGE = util.format(`https://storage.googleapis.com/${bucket.name}/no-image.jpg`);

/**
 *
 * @param { File } object file object that will be uploaded
 * @description - This function does the following
 * - It uploads a file to the image bucket on Google Cloud
 * - It accepts an object as an argument with the
 *   "originalname" and "buffer" as keys
 */

function uploadImage(file, next) {
    if (!file) {
        next(DEFAULT_IMAGE);
        return;
    }
    console.log(file);
    const {originalname, buffer} = file;
    console.log(originalname);
    console.log(buffer);
    const blob = bucket.file(originalname.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
        resumable: false
    });
    blobStream.on('finish', () => {
          const publicUrl = util.format(
            `https://storage.googleapis.com/${bucket.name}/${blob.name}`
          )
          next(publicUrl);
      })
      .on('error', (err) => {
          console.log(err);
          next(null);
      })
      .end(buffer)
}

module.exports = {
    uploadImage
}