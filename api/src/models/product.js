const mongoose = require("mongoose");
const Counter = require('./dbcounter');
const Rating = require('./rating');

const ProductSchema = new mongoose.Schema({
    code: {
        type: Number,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    medias: {
        type: [String]
    },
    userId: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        required: true
    },
});

ProductSchema.index({name: 'text', description: 'text'}, { weights: { title: 5, body: 3, } });

ProductSchema.statics = {
    searchPartial: function(q) {
        return this.find({
            $or: [
                { "name": new RegExp(q, "gi") },
                { "description": new RegExp(q, "gi") },
            ]
        });
    },

    searchFull: function (q) {
        return this.find({
            $text: { $search: q, $caseSensitive: false }
        })
    }
}

ProductSchema.pre('save', function (next) {
    var product = this;
    Counter.increment('product', function (err, result) {
        if (err) {
            return;
        }
        product.code = result.next;
        next();
    });
});

module.exports = mongoose.model('Product', ProductSchema);
