const myAdmin = {
  email: 'admin@quick-credit.com',
  password: 'admin',
};

const correctUser = {
  email: 'ngwobiachukwudi@gmail.com',
  password: 'maths102',
};

const correctLoan = {
  amount: 200000,
  tenor: 12,
};

const ommittedAmount = {
  firstName: 'Chukwudi',
  lastName: 'Ngwobia',
  email: 'ngwobiachukwudi@gmail.com',
  tenor: 12,
};
const invalidAmount = {
  firstName: 'Emeka',
  lastName: 'Ofe',
  email: 'ngwobiachukwudi@gmail.com',
  amount: 'abc',
  tenor: 12,
};

const insufficientAmount = {
  firstName: 'Emeka',
  lastName: 'Ofe',
  email: 'ngwobiachukwudi@gmail.com',
  amount: 1000,
  tenor: 12,
};

const ommittedTenor = {
  firstName: 'Emeka',
  lastName: 'Ofe',
  email: 'jamesdoe@gmail.com',
  amount: 200000,
};

const invalidTenor = {
  firstName: 'Emeka',
  lastName: 'Ofe',
  email: 'ngwobiachukwudi@gmail.com',
  amount: 200000,
  tenor: 'abc',
};
const insufficientTenor = {
  firstName: 'Emeka',
  lastName: 'Ofe',
  email: 'ngwobiachukwudi@gmail.com',
  amount: 200000,
  tenor: 0,
};

const exceedTenor = {
  firstName: 'Emeka',
  lastName: 'Ofe',
  email: 'ngwobiachukwudi@gmail.com',
  amount: 200000,
  tenor: 0,
};
export {
 ommittedAmount, ommittedTenor, invalidAmount, invalidTenor, myAdmin, correctLoan, correctUser, insufficientAmount, insufficientTenor, exceedTenor,
};
