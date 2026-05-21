const testResultsService = require('../src/services/TestResultsService');
const pool = require('../src/config/db');

async function verify() {
    try {
        console.log('--- STARTING TEST RESULTS VERIFICATION ---');
        
        // 1. Insert a dummy test result
        const testResult = {
            user_id: 1,
            test_id: 99,
            license: 'B2',
            total: 35,
            correct: 32,
            wrong: 2,
            unanswered: 1
        };
        
        console.log('Inserting test result:', testResult);
        const insertId = await testResultsService.create(testResult);
        console.log(`✅ Test result inserted successfully with ID: ${insertId}`);
        
        // 2. Query test results by user ID
        console.log('Querying test results for user_id = 1...');
        const results = await testResultsService.getByUserId(1);
        console.log(`✅ Query returned ${results.length} results.`);
        
        const found = results.find(r => r.id === insertId);
        if (found) {
            console.log('✅ Found newly inserted test result in query!');
            console.log(found);
        } else {
            throw new Error('Newly inserted test result not found in query results.');
        }
        
        // 3. Clean up
        await pool.query('DELETE FROM \`test_results\` WHERE id = ?', [insertId]);
        console.log('✅ Cleaned up test result successfully');
        
        process.exit(0);
    } catch (err) {
        console.error('❌ Verification failed:', err.message);
        process.exit(1);
    }
}

verify();
