const lawCategoriesRepository = require('../repositories/LawCategoriesRepository');

class LawCategoriesService {
    async getAll() {
        return await lawCategoriesRepository.findAll();
    }

    async getById(id) {
        return await lawCategoriesRepository.findById(id);
    }

    async create(data) {
        return await lawCategoriesRepository.save(data);
    }

    async update(id, data) {
        return await lawCategoriesRepository.update(id, data);
    }

    async delete(id) {
        return await lawCategoriesRepository.delete(id);
    }
}
module.exports = new LawCategoriesService();
