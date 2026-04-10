const testResultsService = require('../services/TestResultsService');

class TestResultsController {
    async getAll(req, res) {
        try {
            const data = await testResultsService.getAll();
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async getById(req, res) {
        try {
            const data = await testResultsService.getById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async create(req, res) {
        try {
            const id = await testResultsService.create(req.body);
            res.status(201).json({ message: 'Created', id });
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async update(req, res) {
        try {
            const updated = await testResultsService.update(req.params.id, req.body);
            if (!updated) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Updated' });
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async delete(req, res) {
        try {
            const deleted = await testResultsService.delete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Deleted' });
        } catch (err) { res.status(500).json({ error: err.message }); }
    }
}
module.exports = new TestResultsController();
