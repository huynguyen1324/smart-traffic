require('dotenv').config();
const usersService = require('../src/services/UsersService');

async function testLogin() {
  const email = 'duytb@gmail.com';
  const password = '123456'; 
  try {
    const user = await usersService.login(email, password);
    console.log('Login result:', user ? 'SUCCESS' : 'FAILED');
    if (user) console.log('User found:', user.email);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

testLogin();
