import moment from 'moment';
import Authenticator from '../auth/authentication';
import db from './db';

const seedTable = async () => {

  try {
    const queryUser = await db.query(`
  INSERT INTO users ("firstname", "lastname", email, password, address, status, "isadmin") 
  VALUES ('Chukwudi', 'Ngwobia', 'ngwobiachukwudi@gmail.com', '${Authenticator.hashPassword('maths102')}', '75 Bode Thomas Surulere', 'verified', false),
         ('Ikechukwu', 'Ngwobia', 'doniyke44@gmail.com', '${Authenticator.hashPassword('maths102')}', '75 Bode Thomas Surulere', 'unverified', false),
         ('Chisom', 'Peperenpe', 'peperenpe@gmail.com', '${Authenticator.hashPassword('maths102')}', '75 Bode Thomas Surulere', 'unverified', false); `);

    const queryLoan = await db.query(`
      INSERT INTO loans ("useremail", createdon, status, repaid, tenor, amount, paymentInstallment, balance, interest)
        VALUES ('doniyke44@gmail.com', '${moment(new Date())}', 'approved', 'false', 12, 200000, 26666.52, 200000, 2500),
               ('peperenpe@gmail.com', '${moment(new Date())}', 'approved', 'true', 12, 200000, 26666.52, 0.00, 2500);`);


    console.log(queryUser, queryLoan);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err.stack);
    return err.stack;
  }
};

seedTable();
