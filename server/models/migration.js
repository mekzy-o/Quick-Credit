import bcryptjs from 'bcryptjs';
import db from './db';

const queryTable = async () => {
  try {
    const dropUserTable = await db.query('DROP TABLE IF EXISTS users CASCADE;');


    const userTable = await db.query(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL UNIQUE PRIMARY KEY,
            firstName VARCHAR(50) NOT NULL,
            lastNAme VARCHAR(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            address VARCHAR(200) NOT NULL,
            status VARCHAR(20) DEFAULT 'unverified',
            isAdmin BOOLEAN DEFAULT FALSE);`);

    const values = ['admin', 'admin', 'admin@quick-credit.com', bcryptjs.hashSync('admin', 10), '75 Bode-Thomas, Surulere, Lagos', 'verified', 'true'];
    const admin = await db.query('INSERT into users(firstName, lastName, email, password, address, status, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7)', values);

    console.log(dropUserTable, userTable, admin);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.stack);
    return err.stack;
  }
};

queryTable();


