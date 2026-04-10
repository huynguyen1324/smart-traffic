const testResultDetailRepository = require('../repositories/TestResultDetailRepository');

class TestResultDetailService {
    async getAll() {
        return await testResultDetailRepository.findAll();
    }

    async getById(id) {
        return await testResultDetailRepository.findById(id);
    }

    async create(data) {
        return await testResultDetailRepository.save(data);
    }

    async update(id, data) {
        return await testResultDetailRepository.update(id, data);
    }

    async delete(id) {
        return await testResultDetailRepository.delete(id);
    }
}
module.exports = new TestResultDetailService();
