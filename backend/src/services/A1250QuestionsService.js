const a1250QuestionsRepository = require('../repositories/A1250QuestionsRepository');

class A1250QuestionsService {
    async getAll() {
        return await a1250QuestionsRepository.findAll();
    }

    async getById(id) {
        return await a1250QuestionsRepository.findById(id);
    }

    async create(data) {
        return await a1250QuestionsRepository.save(data);
    }

    async update(id, data) {
        return await a1250QuestionsRepository.update(id, data);
    }

    async delete(id) {
        return await a1250QuestionsRepository.delete(id);
    }
}
module.exports = new A1250QuestionsService();
