const testResultsService = require('../services/TestResultsService');

class TestResultsController {
    async getByUserId(req, res) {
        try {
            const data = await testResultsService.getByUserId(req.params.user_id);
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async create(req, res) {
        try {
            const id = await testResultsService.create(req.body);
            res.status(201).json({ message: 'Created', id });
        } catch (err) { res.status(500).json({ error: err.message }); }
    }
}
module.exports = new TestResultsController();
