const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');

const db = new sqlite3.Database('./db.sqlite', err => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    return;
  }
  console.log('Connected to the database.');
  db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="product"', (err, row) => {
    if (err) {
      console.error('Error checking table existence:', err.message);
    } else if (!row) {
      // Table doesn't exist, execute init.sql statements
      fs.readFile('./init.sql', 'utf8', (err, sqlData) => {
        if (err) {
          console.error('Error reading init.sql:', err.message);
          return;
        }

        sqlData.split(';').forEach(statement => {
          if (statement.trim()) {
            db.run(statement, err => {
              if (err) {
                console.error('Error executing SQL statement:', err.message);
              }
            });
          }
        });
      });
    } else {
      console.log('Table "product" already exists, skipping initialization.');
    }
  });

//   // Execute the SQL file content
//   db.run('source ./init.sql', err => {
//     if (err) {
//       console.error('Error running SQL script:', err.message);
//     } else {
//       console.log('Database initialized successfully.');
//     }
//   });
});

// Close the connection when the script finishes
db.on('close', () => {
  console.log('Database connection closed.');
});
