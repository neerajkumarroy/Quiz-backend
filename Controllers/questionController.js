// backend/controllers/questionController.js
const Question = require('../Models/questionModel.js');

const addQuestion = async (req, res) => {
    try {
        const { category, question, options, correctOption, explanation } = req.body;
        const newQuestion = new Question({
            category,
            question,
            options,
            correctOption,
            explanation
        });
        await newQuestion.save();
        res.status(201).json({ message: 'Question added successfully', question: newQuestion });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get questions by category
const getQuestionsByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const questions = await Question.find({ category });
        if (questions.length === 0) {
            return res.status(404).json({ message: 'No questions found for this category' });
        }
        res.status(200).json(questions);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


module.exports = { addQuestion, getQuestionsByCategory };
