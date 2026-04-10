const chatbotHistoryRepository = require('../repositories/ChatbotHistoryRepository');

class ChatbotHistoryService {
    async getAll() {
        return await chatbotHistoryRepository.findAll();
    }

    async getById(id) {
        return await chatbotHistoryRepository.findById(id);
    }

    async create(data) {
        return await chatbotHistoryRepository.save(data);
    }

    async update(id, data) {
        return await chatbotHistoryRepository.update(id, data);
    }

    async delete(id) {
        return await chatbotHistoryRepository.delete(id);
    }
}
module.exports = new ChatbotHistoryService();
