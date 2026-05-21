require('dotenv').config();
const usersService = require('../src/services/UsersService');

async function testLogin() {
  try {
    console.log('\n=== Test login with phone ===');
    const user1 = await usersService.login('0123456701', '123456');
    console.log('Result:', user1 ? 'SUCCESS ✓' : 'FAILED ✗');
    if (user1) {
      console.log('User:', user1.full_name, '(' + user1.email + ')');
    }
    
    console.log('\n=== Test login with email ===');
    const user2 = await usersService.login('duytb@gmail.com', '123456');
    console.log('Result:', user2 ? 'SUCCESS ✓' : 'FAILED ✗');
    if (user2) {
      console.log('User:', user2.full_name, '(' + user2.phone + ')');
    }
    
    console.log('\n=== Test login with wrong password ===');
    const user3 = await usersService.login('0123456701', 'wrongpassword');
    console.log('Result:', user3 ? 'SUCCESS ✓' : 'FAILED ✗ (expected)');
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

testLogin();
