const ratingMapper = require('../mappers/ratingMapper');
const Rating = require('../models/rating');


function findProductRatings(productCode, next) {
    Rating.find({'productCode': productCode}, (err, ratings) => {
        if (err) {
            console.log(err);
            return next('Some err');
        }
        return next(null, ratingMapper.toDataAll(ratings));
    });
}

function rateProduct(data, next) {
    Rating.findOneAndUpdate(
      {userId: data.userId, productCode: data.productCode},
      {comment: data.comment, stars: data.stars},
      {new: true, upsert: true},
      (err, rating) => {
          if (err) {
              console.log(err);
              return next(err);
          }
          return next(null, rating);
      }
    );
}

function hasProductRating(productCode, userId, next) {
    return Rating.findOne({'productCode': productCode, 'userId': userId}, (err, rating) => {
        if (err || !rating) {
            return next(false);
        }
        return next(true);
    });
}

module.exports = {
    findProductRatings,
    rateProduct,
    hasProductRating
}