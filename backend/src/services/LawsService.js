const lawsRepository = require('../repositories/LawsRepository');

class LawsService {
    async getAll() {
        return await lawsRepository.findAll();
    }

    async getById(id) {
        return await lawsRepository.findById(id);
    }

    async getByCategory(categoryId) {
        return await lawsRepository.findByCategory(categoryId);
    }
}
module.exports = new LawsService();
