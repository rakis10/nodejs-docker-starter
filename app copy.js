const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Import SQLite module

const app = express();

// Create a new SQLite database connection
const db = new sqlite3.Database('db.sqlite');
app.get('/', (req, res) => {
    res.send('Hello, world!');
}); 
// Define an endpoint to fetch data from the database
app.get('/quotes', (req, res) => {
    // Execute a query to retrieve data from the 'quotes' table
    db.all('SELECT * FROM quotes', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows); // Send the data as JSON
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
