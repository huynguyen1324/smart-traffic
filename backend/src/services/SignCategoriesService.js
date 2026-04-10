const signCategoriesRepository = require('../repositories/SignCategoriesRepository');

class SignCategoriesService {
    async getAll() {
        return await signCategoriesRepository.findAll();
    }

    async getById(id) {
        return await signCategoriesRepository.findById(id);
    }

    async create(data) {
        return await signCategoriesRepository.save(data);
    }

    async update(id, data) {
        return await signCategoriesRepository.update(id, data);
    }

    async delete(id) {
        return await signCategoriesRepository.delete(id);
    }
}
module.exports = new SignCategoriesService();
