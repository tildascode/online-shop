const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    next: { type: Number, default: 0 }
});

CounterSchema.statics.increment = function (counter, callback) {
    return this.findByIdAndUpdate(counter, { $inc: { next: 1 } }, {new: true, upsert: true, select: {next: 1}}, callback);
};

module.exports = mongoose.model('Counter', CounterSchema);
