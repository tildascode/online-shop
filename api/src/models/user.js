const mongoose = require("mongoose");
var bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    products: {
        type: [Number],
    },
    wishlist: {
        type: [{type: Number, unique: true}],
        default: []
    }
});

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    })
});

UserSchema.statics.authenticate = function (email, password, next) {
    const user = this;
    user.findOne({email: email})
      .exec(function (err, user) {
          if (err) {
              return next(err)
          } else if (!user) {
              const err = new Error('User not found.');
              err.status = 401;
              return next(err);
          }
          bcrypt.compare(password, user.password, function (err, result) {
              if (result) {
                  return next(null, user);
              } else {
                  return next();
              }
          })
      });
}
module.exports = mongoose.model('User', UserSchema);
