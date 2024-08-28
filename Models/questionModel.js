// backend/models/questionModel.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    category: { type: String, required: true },
    question: { type: String, required: true },
    options: [String],
    correctOption: { type: String, required: true },
    explanation: { type: String }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
