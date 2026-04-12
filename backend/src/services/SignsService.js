const signsRepository = require('../repositories/SignsRepository');

class SignsService {
    async getAll() {
        return await signsRepository.findAll();
    }

    async getById(id) {
        return await signsRepository.findById(id);
    }
}
module.exports = new SignsService();
