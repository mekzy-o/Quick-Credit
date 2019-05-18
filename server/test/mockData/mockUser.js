const correctUser = {
  firstName: 'James',
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const myAdmin = {
  email: 'admin@quick-credit.com',
  password: 'admin',
};

const undefinedFirstName = {
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const emptyFirstName = {
  firstName: '',
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const invalidFirstNameLength = {
  firstName: 'J',
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const invalidFirstNameCharacter = {
  firstName: 'Joh$n',
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const undefinedLastName = {
  firstName: 'James',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
};

const emptyLastName = {
  firstName: 'James',
  lastName: '',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const invalidLastNameLength = {
  firstName: 'James',
  lastName: 'D',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const invalidLastNameCharacter = {
  firstName: 'James',
  lastName: 'Do$e',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const undefinedEmail = {
  firstName: 'James',
  lastName: 'Done',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const emptyEmail = {
  firstName: 'James',
  lastName: 'Done',
  email: '',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const undefinedAddress = {
  email: 'jamesdon@gmail.com',
  firstName: 'James',
  lastName: 'Done',
  password: 'jamesdoe',
};

const emptyAddress = {
  firstName: 'James',
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
  address: '',
};

const InvalidAddressCharacter = {
  email: 'emekaofe7@gmail.com',
  firstName: 'Emeka',
  lastName: 'Ofe',
  password: 'maths102',
  address: '75 Bode Thomas, Surulere*&',
};

const invalidEmailLength = {
  firstName: 'James',
  lastName: 'Done',
  email: 'd@g.com',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const invalidAddressLength = {
  email: 'emekaofe7@gmail.com',
  firstName: 'Emeka',
  lastName: 'Ofe',
  password: 'maths102',
  address: 'Andela',
};
const invalidEmailCharacter = {
  firstName: 'James',
  lastName: 'Done',
  email: 'j%%##@gmail.#om',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const existingEmail = {
  firstName: 'James',
  lastName: 'Done',
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
  address: '75 Bode-Thomas, Surulere',
};

const undefinedPassword = {
  firstName: 'James',
  lastName: 'Done',
  email: 'jonahjang@gmail.com',
  address: '75 Bode-Thomas, Surulere',
};


const invalidPasswordLength = {
  firstName: 'James',
  lastName: 'Done',
  email: 'jonahjoe@gmail.com',
  password: 'j',
};

const whitespacePassword = {
  firstName: 'James',
  lastName: 'Done',
  email: 'hallyjoe@gmail.com',
  password: ' ',
};

const correctLogin = {
  email: 'jamesdoe@gmail.com',
  password: 'jamesdoe',
};

const undefinedEmailLogin = {
  password: 'johndoe',
};


const nonExistingEmail = {
  email: 'Jamesdoe@gmial.com',
  password: 'jamesdoe',
};

const undefinedPasswordLogin = {
  email: 'johndoe@gmail.com',
};

const emptyPasswordField = {
  email: 'jamesdoe@gmail.com',
  password: '',
};

const emptyEmailField = {
  email: '',
  password: 'jamesdoe',
};

const correctEmailIncorrectPassword = {
  email: 'jamesdoe@gmail.com',
  password: 'Jamesdroeh',
};

export {
  correctUser, myAdmin, undefinedFirstName, undefinedAddress, InvalidAddressCharacter,
  invalidFirstNameLength, invalidFirstNameCharacter, emptyAddress, emptyEmail, 
  emptyFirstName, emptyLastName, undefinedLastName, invalidLastNameLength, invalidAddressLength,
  invalidLastNameCharacter, undefinedEmail, invalidEmailLength,
  invalidEmailCharacter, existingEmail, undefinedPassword,
  invalidPasswordLength, whitespacePassword, correctLogin, undefinedEmailLogin,
  nonExistingEmail, undefinedPasswordLogin, emptyPasswordField, emptyEmailField, correctEmailIncorrectPassword,
};
