const { v4: uuidv4 } = require('uuid');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

// Custom format for logging
morgan.token('id', (req) => req.id);
morgan.format('custom', '[:date[iso]] :id :method :url :status :res[content-length] - :response-time ms');

const logsDirectory = path.join(__dirname, '../logs'); // Adjust the path as needed

// Create the logs directory if it doesn't exist
if (!fs.existsSync(logsDirectory)) {
    fs.mkdirSync(logsDirectory);
}

// Create write streams for success and error logs
const successLogStream = fs.createWriteStream(path.join(logsDirectory, 'success.txt'), { flags: 'a' });
const errorLogStream = fs.createWriteStream(path.join(logsDirectory, 'error.txt'), { flags: 'a' });

const generateUniqueId = (req, res, next) => {
    // Generate a unique ID with timestamp and random characters
    req.id = `${Date.now()}-${uuidv4().split('-').pop()}`;
    next();
};

const customLogger = morgan('custom', { stream: successLogStream });

const errorMiddleware = (err, req, res, next) => {
    // Log the error to the error file with method, URL, and status
    const errorMessage = `[${new Date().toISOString()}] [${req.id}] [${req.method}] ${req.url} [${res.statusCode}] ERROR: ${err.message}`;
    console.error(errorMessage);
    errorLogStream.write(errorMessage + '\n');

    // Respond to the client with an error status
    res.status(500).json({ error: 'Internal Server Error' });
};

module.exports = {
    generateUniqueId,
    customLogger,
    errorMiddleware,
};
