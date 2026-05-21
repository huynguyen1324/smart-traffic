const usersRepository = require('../repositories/UsersRepository');

class UsersService {
    async login(identifier, password) {
        const user = await usersRepository.findByEmailOrPhone(identifier);
        if (user && user.password_hash === password) {
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
        const userData = {};
        if (data.full_name !== undefined) userData.full_name = data.full_name;
        if (data.email !== undefined) userData.email = data.email;
        if (data.phone !== undefined) userData.phone = data.phone;
        if (data.password !== undefined) userData.password_hash = data.password;
        if (data.password_hash !== undefined) userData.password_hash = data.password_hash;
        if (data.avatar_url !== undefined) userData.avatar_url = data.avatar_url;
        if (data.learning_goal !== undefined) userData.learning_goal = data.learning_goal;

        if (userData.email) {
            const existing = await usersRepository.findByEmailOrPhone(userData.email);
            if (existing) {
                throw new Error('Email already registered');
            }
        }
        if (userData.phone) {
            const existing = await usersRepository.findByEmailOrPhone(userData.phone);
            if (existing) {
                throw new Error('Phone number already registered');
            }
        }

        return await usersRepository.save(userData);
    }

    async update(id, data) {
        const userData = {};
        if (data.full_name !== undefined) userData.full_name = data.full_name;
        if (data.email !== undefined) userData.email = data.email;
        if (data.phone !== undefined) userData.phone = data.phone;
        if (data.password !== undefined) userData.password_hash = data.password;
        if (data.password_hash !== undefined) userData.password_hash = data.password_hash;
        if (data.avatar_url !== undefined) userData.avatar_url = data.avatar_url;
        if (data.learning_goal !== undefined) userData.learning_goal = data.learning_goal;

        if (userData.email) {
            const existing = await usersRepository.findByEmailOrPhone(userData.email);
            if (existing && existing.id !== Number(id)) {
                throw new Error('Email already in use');
            }
        }
        if (userData.phone) {
            const existing = await usersRepository.findByEmailOrPhone(userData.phone);
            if (existing && existing.id !== Number(id)) {
                throw new Error('Phone number already in use');
            }
        }

        return await usersRepository.update(id, userData);
    }

    async delete(id) {
        return await usersRepository.delete(id);
    }
}
module.exports = new UsersService();
