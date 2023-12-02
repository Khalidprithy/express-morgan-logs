const express = require('express');
const path = require('path');

const { generateUniqueId, customLogger, errorMiddleware } = require('./middlewares/middleware');
const routes = require('./routes/router');

const app = express();
const PORT = 3000;

// Serve static files from the 'logs' directory
app.use('/logs', express.static(path.join(__dirname, './logs')));
// Use the custom logger middleware
app.use(generateUniqueId);
app.use(customLogger);

// Use the routes from router.js
app.use('/', routes);

// Error handling middleware
app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
