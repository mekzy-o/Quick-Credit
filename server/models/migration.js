import Authenticator from '../auth/authentication';
import db from './db';

const queryTable = async () => {
  try {

    // Queries to drop Tables
    const dropUserTable = await db.query('DROP TABLE IF EXISTS users CASCADE;');
    const dropLoanTable = await db.query('DROP TABLE IF EXISTS loans CASCADE;');

    // Queries to Create Tables
    const userTable = await db.query(`CREATE TABLE IF NOT EXISTS users(
            id SERIAL UNIQUE PRIMARY KEY,
            firstName VARCHAR(50) NOT NULL,
            lastNAme VARCHAR(50) NOT NULL,
            email VARCHAR(50) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            address VARCHAR(200) NOT NULL,
            status VARCHAR(20) DEFAULT 'unverified',
            isAdmin BOOLEAN DEFAULT FALSE);`);

    const loanTable = await db.query(`CREATE TABLE IF NOT EXISTS loans(
            id SERIAL UNIQUE PRIMARY KEY,
            userEmail VARCHAR(50) NOT NULL REFERENCES users(email) ON DELETE CASCADE,
            createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status VARCHAR(20) DEFAULT 'pending',
            repaid BOOLEAN DEFAULT FALSE,
            tenor INT NOT NULL,
            amount NUMERIC NOT NULL,
            paymentInstallment NUMERIC NOT NULL,
            balance NUMERIC NOT NULL,
            interest NUMERIC NOT NULL);`);


    const values = ['admin', 'admin', 'admin@quick-credit.com', Authenticator.hashPassword('admin'), '75 Bode-Thomas, Surulere, Lagos', 'verified', 'true'];
    const admin = await db.query('INSERT into users(firstName, lastName, email, password, address, status, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7)', values);

    console.log(dropUserTable, dropLoanTable, userTable, loanTable, admin);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.stack);
    return err.stack;
  }
};

queryTable();


