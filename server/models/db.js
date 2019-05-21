import { Pool, types } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;
if (process.env.NODE_ENV === 'test') {
  pool = new Pool({ connectionString: process.env.TESTDB_URL });
} else {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
}

// Converting numeric string to numbers
types.setTypeParser(1700, val => parseFloat(val));

/* Query method for parameterized queries - Retrieved from nodejs-postgresql documention(https://node-postgres.com) */
const db = {
  query: (text, params) => pool.query(text, params),
};

export default db;
