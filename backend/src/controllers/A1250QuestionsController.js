const a1250QuestionsService = require('../services/A1250QuestionsService');

class A1250QuestionsController {
    async getAll(req, res) {
        try {
            const data = await a1250QuestionsService.getAll();
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async getById(req, res) {
        try {
            const data = await a1250QuestionsService.getById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

}
module.exports = new A1250QuestionsController();
