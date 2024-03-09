const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose(); // Import SQLite module

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

const db = new sqlite3.Database('db.sqlite');
// Import environment variables
require('dotenv').config();

// Only require and run seed script in development mode
if (process.env.NODE_ENV === 'development') {

  require('./seed');
}


const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/category');
app.use("/products", productRoutes);
app.use("/category", categoryRoutes);
app.get('/', (req, res) => res.render('index.ejs'))
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
