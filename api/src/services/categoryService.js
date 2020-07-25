const Category = require('../models/category')

function create(categoryData, next) {
    let category = new Category();
    Object.assign(category, categoryData);

    category.save((err) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            return next(null, category);
        }
    );
}

function findTopLevelCategories(next) {
    Category.find({'parentCode': undefined }, (err, categories) => {
        if (err) {
            //TODO handle error
            console.log(err);
            return next(err);
        }
        return next(null, categories);
    })
}

module.exports = {
    create,
    findTopLevelCategories
};