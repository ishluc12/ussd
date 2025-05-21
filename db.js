// db.js
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Ensure the "db" folder exists
const dbPath = path.join(__dirname, 'db');
if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath);
}

// Define the database file path
const dbFile = path.join(dbPath, 'database.sqlite');

// Initialize the database connection
const db = new Database(dbFile);

// Create Sessions table
db.prepare(`
    CREATE TABLE IF NOT EXISTS Sessions (
        sessionID TEXT PRIMARY KEY,
        phoneNumber TEXT,
        userInput TEXT
    )
`).run();

// Create Transactions table with optional foreign key
db.prepare(`
    CREATE TABLE IF NOT EXISTS Transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sessionID TEXT,
        transactionType TEXT,
        amount REAL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sessionID) REFERENCES Sessions(sessionID)
    )
`).run();

console.log('Connected to SQLite database');

module.exports = db;
