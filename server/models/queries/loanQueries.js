const createLoan = `INSERT INTO loans(userEmail, createdOn, tenor, amount, paymentInstallment, balance, interest) 
VALUES($1,$2,$3,$4,$5,$6, $7) RETURNING userEmail, createdOn, status, repaid, tenor, amount, paymentInstallment, balance, interest`;

const getUserEmail = 'SELECT * FROM loans WHERE userEmail = $1';

const getAllLoans = 'SELECT * FROM loans';

const getALoan = 'SELECT * FROM loans WHERE id=$1';

const queryAllLoans = 'SELECT * FROM LOANS WHERE status=$1 AND repaid=$2';

const changeLoanStatus = 'UPDATE loans SET status=$1 WHERE id=$2';

const updateBalance = 'UPDATE loans SET balance = $1 WHERE id=$2';

const updateRepaid = 'UPDATE loans SET repaid=true WHERE id=$1';


export {
  getUserEmail,
  createLoan,
  getAllLoans,
  queryAllLoans,
  getALoan,
  changeLoanStatus,
  updateBalance,
  updateRepaid,
};
