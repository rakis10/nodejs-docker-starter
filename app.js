const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose(); // Import SQLite module

const db = new sqlite3.Database('db.sqlite');
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS quotes (
            id INTEGER PRIMARY KEY,
            quote TEXT
        )
    `);
});

// const sampleQuotes = [
//     { quote: "Life is what happens when you're busy making other plans." },
//     { quote: "The only limit to our realization of tomorrow will be our doubts of today." },
//     { quote: "In three words I can sum up everything I've learned about life: it goes on." }
// ];

// Insert each quote into the table
// sampleQuotes.forEach((quoteObj) => {
//     db.run('INSERT INTO quotes (quote) VALUES (?)', [quoteObj.quote], (err) => {
//         if (err) {
//             console.error('Error inserting quote:', err.message);
//         } else {
//             console.log('Quote inserted successfully:', quoteObj.quote);
//         }
//     });
// });

app.get('/', (req, res) => res.send('Hopala idemo!'))
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
module.exports = app;
