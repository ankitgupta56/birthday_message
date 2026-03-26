const express = require('express');
const router = express.Router();
const QuizResponse = require('../models/QuizResponse');

// POST: Save quiz response
router.post('/quiz-response', async (req, res) => {
    try {
        const { question, selectedAnswer } = req.body;

        // Validate input
        if (!question || !selectedAnswer) {
            return res.status(400).json({
                success: false,
                message: 'Question and selected answer are required'
            });
        }

        // Create new quiz response
        const quizResponse = new QuizResponse({
            question,
            selectedAnswer
        });

        // Save to database
        await quizResponse.save();

        // Return success response
        res.status(201).json({
            success: true,
            message: 'Your answer has been saved ❤️',
            data: quizResponse
        });

    } catch (error) {
        console.error('Error saving quiz response:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving your answer',
            error: error.message
        });
    }
});

// GET: Retrieve all quiz responses (optional - for viewing/analytics)
router.get('/quiz-responses', async (req, res) => {
    try {
        const responses = await QuizResponse.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            total: responses.length,
            data: responses
        });
    } catch (error) {
        console.error('Error retrieving quiz responses:', error);
        res.status(500).json({
            success: false,
            message: 'Error retrieving quiz responses',
            error: error.message
        });
    }
});

module.exports = router;
