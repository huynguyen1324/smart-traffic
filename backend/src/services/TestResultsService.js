const testResultsRepository = require('../repositories/TestResultsRepository');

class TestResultsService {
    async getByUserId(userId) {
        return await testResultsRepository.findByUserId(userId);
    }

    async create(data) {
        return await testResultsRepository.save(data);
    }
}
module.exports = new TestResultsService();
