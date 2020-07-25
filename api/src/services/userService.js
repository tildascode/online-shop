const User = require('../models/user')

function addProductToWishList(code, userId, next) {
    User.findOneAndUpdate({email: userId}, {$push: {wishlist: code}}, {new: true}, (err, user) => {
        if (err) {
            console.log(err);
            next(err);
        }
        next(null);
    })

}

module.exports = {
    addProductToWishList,
}