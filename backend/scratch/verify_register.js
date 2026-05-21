const usersService = require('../src/services/UsersService');
const pool = require('../src/config/db');

async function verify() {
    try {
        console.log('--- STARTING VERIFICATION ---');
        
        // Let's create a unique dummy user
        const timestamp = Date.now();
        const testUser = {
            full_name: 'Test Antigravity',
            email: `test_anti_${timestamp}@example.com`,
            phone: `0999${String(timestamp).slice(-6)}`,
            password: 'superpassword123',
            gender: 'Nam', // this field doesn't exist in DB and should be successfully filtered out!
            learning_goal: 'A1',
            avatar_url: 'default-male.png'
        };
        
        console.log('Attempting to create test user:', testUser);
        const insertId = await usersService.create(testUser);
        console.log(`✅ Success! Created user with ID: ${insertId}`);
        
        // Clean up: delete test user
        await pool.query('DELETE FROM `users` WHERE id = ?', [insertId]);
        console.log('✅ Cleaned up test user successfully');
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Verification failed:', err.message);
        process.exit(1);
    }
}

verify();
