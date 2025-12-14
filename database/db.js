const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'database.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database with setup.sql
function initializeDatabase() {
    const setupPath = path.join(__dirname, 'setup.sql');
    const setupSQL = fs.readFileSync(setupPath, 'utf-8');
    db.exec(setupSQL);
    console.log('Database initialized');
}

initializeDatabase();

module.exports = db;
