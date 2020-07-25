const mongoose = require("mongoose");
const Counter = require('./dbcounter');

const CategorySchema = new mongoose.Schema({
    code: {
        type: Number,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    parentCategoryCode: {
        type: mongoose.Schema.Types.Number,
        ref: 'CategorySchema'
    },
    subcategoryCodes: [{
        type: mongoose.Schema.Types.Number,
        ref: 'CategorySchema'
    }]
});

CategorySchema.pre('save', function (next) {
    var category = this;
    Counter.increment('category', function (err, result) {
        if (err) {
            return;
        }
        category.code = result.next;
        next();
    });
});

module.exports = mongoose.model('Category', CategorySchema);;