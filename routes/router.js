const express = require('express');
const router = express.Router();
const path = require('path');

const { generateUniqueId, customLogger } = require('../middlewares/middleware');

// Test routes
router.get('/success', (req, res) => {
    res.status(200).json({ message: 'Success!', data: { key: 'value' } });
});

router.all('/error', (req, res, next) => {
    // Simulate an error
    const err = new Error('Simulated Error');
    next(err);
});

router.get('/large-response', (req, res) => {
    // Simulate a large response
    const largeResponse = Array(1000000).fill('xyz').join('');
    res.status(200).send(largeResponse);
});

router.get('/small-response', (req, res) => {
    // Simulate a small response
    res.status(200).json({ message: 'Small Response', data: { key: 'value' } });
});

// Add a new POST route
router.post('/post-route', (req, res) => {
    res.status(201).json({ message: 'Post Route Success', data: { key: 'value' } });
});

// Add a new PUT route
router.put('/put-route', (req, res) => {
    res.status(200).json({ message: 'Put Route Success', data: { key: 'value' } });
});

// Add a new DELETE route
router.delete('/delete-route', (req, res) => {
    res.status(200).json({ message: 'Delete Route Success', data: { key: 'value' } });
});

module.exports = router;
