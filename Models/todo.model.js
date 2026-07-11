const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, "This Title Must At Least 3 Chars"],
        maxLength: [15, "This Title Must At Most 15 Chars"]
    },
    status: {
        type: String,
        enum: ['Todo', 'In-Progress', 'Done'],
        default: "Todo"
    },
})

const todoModel = mongoose.model("Todo" , todoSchema);

module.exports = todoModel;