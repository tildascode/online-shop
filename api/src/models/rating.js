const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
    productCode: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },

    stars: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Rating', RatingSchema);
