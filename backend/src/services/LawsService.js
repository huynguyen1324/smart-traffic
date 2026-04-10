const lawsRepository = require('../repositories/LawsRepository');

class LawsService {
    async getAll() {
        return await lawsRepository.findAll();
    }

    async getById(id) {
        return await lawsRepository.findById(id);
    }

    async create(data) {
        return await lawsRepository.save(data);
    }

    async update(id, data) {
        return await lawsRepository.update(id, data);
    }

    async delete(id) {
        return await lawsRepository.delete(id);
    }
}
module.exports = new LawsService();
