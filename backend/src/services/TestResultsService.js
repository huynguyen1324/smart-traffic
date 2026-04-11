const testResultsRepository = require('../repositories/TestResultsRepository');

class TestResultsService {
    async getAll() {
        return await testResultsRepository.findAll();
    }

    async getById(id) {
        return await testResultsRepository.findById(id);
    }

    async getByUserId(userId) {
        return await testResultsRepository.findByUserId(userId);
    }

    async create(data) {
        return await testResultsRepository.save(data);
    }

    async update(id, data) {
        return await testResultsRepository.update(id, data);
    }

    async delete(id) {
        return await testResultsRepository.delete(id);
    }
}
module.exports = new TestResultsService();
