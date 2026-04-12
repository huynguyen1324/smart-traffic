const b2600QuestionsService = require('../services/B2600QuestionsService');

class B2600QuestionsController {
    async getAll(req, res) {
        try {
            const data = await b2600QuestionsService.getAll();
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async getById(req, res) {
        try {
            const data = await b2600QuestionsService.getById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

}
module.exports = new B2600QuestionsController();
