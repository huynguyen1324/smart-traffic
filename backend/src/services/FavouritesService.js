const favouritesRepository = require('../repositories/FavouritesRepository');

class FavouritesService {
    async getAll() {
        return await favouritesRepository.findAll();
    }

    async getById(id) {
        return await favouritesRepository.findById(id);
    }

    async create(data) {
        return await favouritesRepository.save(data);
    }

    async update(id, data) {
        return await favouritesRepository.update(id, data);
    }

    async delete(id) {
        return await favouritesRepository.delete(id);
    }
}
module.exports = new FavouritesService();
