const createUser = `INSERT INTO users(firstName, lastName, email, password, address)
VALUES($1,$2,$3,$4,$5) RETURNING firstName, lastName, email, address, status, isAdmin`;

const userDetails = 'SELECT * FROM users WHERE email = $1';

const verifyUser = "UPDATE users SET status='verified' WHERE email=$1";

const getUserEmail = 'SELECT * FROM users WHERE email=$1';

// const userId = 'SELECT * FROM users WHERE id = $1';

// const fullName = 'SELECT firstname ||\' \'|| lastname as name FROM users WHERE email=$1';

// const updateUsers = ('UPDATE users SET password = $1 WHERE id = $2');




export {
  createUser,
  userDetails,
  verifyUser,
  getUserEmail,
};
