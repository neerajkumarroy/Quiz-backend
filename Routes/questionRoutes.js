// backend/routes/questionRoutes.js
const express = require('express');
const router = express.Router();
const { addQuestion, getQuestionsByCategory } = require('../Controllers/questionController.js');

router.post('/add-question', addQuestion);
router.get('/questions/:category', getQuestionsByCategory);

module.exports = router;
