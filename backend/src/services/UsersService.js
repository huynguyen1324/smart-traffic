const usersRepository = require('../repositories/UsersRepository');

class UsersService {
    async login(identifier, password) {
        const user = await usersRepository.findByEmailOrPhone(identifier);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }

    async getAll() {
        return await usersRepository.findAll();
    }

    async getById(id) {
        return await usersRepository.findById(id);
    }

    async create(data) {
        return await usersRepository.save(data);
    }

    async update(id, data) {
        return await usersRepository.update(id, data);
    }

    async delete(id) {
        return await usersRepository.delete(id);
    }
}
module.exports = new UsersService();
