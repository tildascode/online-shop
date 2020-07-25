const Product = require('../models/product');
const storageService = require('./storageService');
const productMapper = require('../mappers/productMapper');

function create(data, next) {
    let product = new Product();
    let {medias, ...productCopy} = data;
    Object.assign(product, productCopy);
    storageService.uploadImage(medias, function (mediaUrl) {
        if (mediaUrl) {
            product.medias = [mediaUrl];
            save(product, next);
        } else {
            next({success: false});
        }
    });
}

function findByCode(code, next) {
    Product.findOne({'code': code}, (err, product) => {
        if (err) {
            console.log(err);
            return next('Some err');
        }
        return next(null, productMapper.toData(product))
    });
}

function findByQuery(query, page, next) {
    let productsCount = 10;
    let skippedElementsCount = page ?
        productsCount * page : 0;

    Product.searchPartial(query)
        .skip(skippedElementsCount)
        .limit(productsCount)
        .exec( function(err, products) {
            if(err) {
                return next(err);
            }

            return next(null, productMapper.toDataAll(products));
        });
}

function findAll(next) {
    Product.find({}, (err, products) => {
        if (err) {
            console.log(err);
            return next('Some err');
        }
        return next(null, products);
    });
}

function findAllForCurrentUser(userId, next) {
    Product.find({'userId': userId}, (err, products) => {
        if (err) {
            console.log(err);
            return next('Some err');
        }
        return next(null, products);
    });
}

function findProductsForCategory(categoryCode, next) {
    Product.find({'category': categoryCode }, (err, products) => {
        if (err) {
            //TODO handle error
            console.log(err);
            return next(err);
        }

        const data = products.map(product => productMapper.toData(product));
        return next(null, data);
    })
}

function findProductsForCodes(codes, next) {
    if (!codes) {
        next(null);
    }
    Product.find({code: {$in: codes}}, (err, products) => {
        if (err) {
            console.log(err);
            return next(null);
        }
        return next(products);
    });
}

function save(product, next) {
    product.save((err) => {
          if (err) {
              console.log(err);
              return next(err);
          }
          return next(null, product);
      }
    );
}

module.exports = {
    create,
    findByCode,
    findAll,
    findAllForCurrentUser,
    findProductsForCategory,
    findByQuery,
    findProductsForCodes
}