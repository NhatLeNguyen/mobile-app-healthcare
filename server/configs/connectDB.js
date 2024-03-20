// get the client
import mysql from "mysql2/promise";
// create the connection to database
console.log("Creating connection pool...")

const pool = mysql.createPool({
  host: '192.168.101.5',
  user: 'khang',
  database: 'health_care',
});

export default pool;