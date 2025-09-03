// Database connection utility for MySQL
import mysql from 'mysql2/promise';

export async function getDBConnection() {
  return mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'schools_db',
  });
}
