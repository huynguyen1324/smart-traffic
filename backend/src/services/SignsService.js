const signsRepository = require('../repositories/SignsRepository');

class SignsService {
    async getAll() {
        return await signsRepository.findAll();
    }

    async getById(id) {
        return await signsRepository.findById(id);
    }

    async create(data) {
        return await signsRepository.save(data);
    }

    async update(id, data) {
        return await signsRepository.update(id, data);
    }

    async delete(id) {
        return await signsRepository.delete(id);
    }
}
module.exports = new SignsService();
