const quizService = require('../src/services/QuizService');
const pool = require('../src/config/db');

async function verify() {
    try {
        console.log('--- STARTING QUIZ SERVICE VERIFICATION ---');
        
        // 1. Get test list for A1
        console.log('Fetching test list for A1...');
        const a1Tests = await quizService.getTestList('a1');
        console.log(`✅ Success! A1 has ${a1Tests.length} tests.`);
        if (a1Tests.length === 0) throw new Error('A1 test list is empty');
        
        // 2. Get questions for A1 Test 1
        console.log('Fetching questions for A1 Test 1...');
        const a1Questions = await quizService.getQuestionsByTest('a1', 1);
        console.log(`✅ Success! A1 Test 1 has ${a1Questions.length} questions.`);
        if (a1Questions.length === 0) throw new Error('A1 Test 1 questions list is empty');
        
        // 3. Save quiz detail
        console.log('Saving quiz detail...');
        const saveResult = await quizService.saveQuizDetail(1, 'a1', 10, 'A', 1);
        console.log('✅ Quiz detail saved successfully:', saveResult);
        
        // 4. Get quiz stats
        console.log('Fetching quiz stats for user_id = 1...');
        const stats = await quizService.getQuizStats(1);
        console.log('✅ Quiz stats:', stats);
        if (stats.total_done !== 1) throw new Error(`Expected total_done to be 1, got ${stats.total_done}`);
        
        // 5. Get quiz details
        console.log('Fetching quiz details for user_id = 1...');
        const details = await quizService.getQuizDetails(1);
        console.log('✅ Quiz details:', details);
        if (details.length !== 1) throw new Error(`Expected details length to be 1, got ${details.length}`);
        
        // Clean up
        await pool.query('DELETE FROM `quiz_results_detail` WHERE user_id = 1');
        console.log('✅ Cleaned up quiz_results_detail successfully');
        
        console.log('🎉 ALL QUIZ SERVICES VERIFIED SUCCESSFULLY!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Quiz verification failed:', err.message);
        process.exit(1);
    }
}

verify();
