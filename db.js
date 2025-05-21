// db.js
const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

// Ensure db folder exists
const dbPath = path.join(__dirname, 'db');
if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(dbPath);
}

const dbFile = path.join(dbPath, 'database.sqlite');
const db = new Database(dbFile);

// Create tables if they don't exist
db.prepare(`
    CREATE TABLE IF NOT EXISTS Sessions (
        sessionID TEXT PRIMARY KEY,
        phoneNumber TEXT,
        userInput TEXT
    )
`).run();

db.prepare(`
    CREATE TABLE IF NOT EXISTS Transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sessionID TEXT,
        transactionType TEXT,
        amount REAL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`).run();

console.log('Connected to SQLite database');

module.exports = db;
