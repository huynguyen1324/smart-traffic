const b2600QuestionsRepository = require('../repositories/B2600QuestionsRepository');

class B2600QuestionsService {
    async getAll() {
        return await b2600QuestionsRepository.findAll();
    }

    async getById(id) {
        return await b2600QuestionsRepository.findById(id);
    }

    async create(data) {
        return await b2600QuestionsRepository.save(data);
    }

    async update(id, data) {
        return await b2600QuestionsRepository.update(id, data);
    }

    async delete(id) {
        return await b2600QuestionsRepository.delete(id);
    }
}
module.exports = new B2600QuestionsService();
