const express = require('express');
const cors = require('cors');
const math = require('mathjs');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Calculator API is running' });
});

// Calculation endpoint
app.post('/api/calculate', (req, res) => {
  try {
    const { expression } = req.body;
    
    if (!expression || typeof expression !== 'string') {
      return res.status(400).json({ error: 'Invalid expression provided' });
    }

    const result = math.evaluate(expression);
    res.json({ result });
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(400).json({ error: 'Error calculating expression. Please check your input.' });
  }
});

// Error handling for unmatched routes
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});