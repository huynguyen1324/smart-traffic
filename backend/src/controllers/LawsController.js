const lawsService = require('../services/LawsService');

class LawsController {
    async getAll(req, res) {
        try {
            const data = await lawsService.getAll();
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async getById(req, res) {
        try {
            const data = await lawsService.getById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async getByCategory(req, res) {
        try {
            const data = await lawsService.getByCategory(req.params.category_id);
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async getByCategory(req, res) {
        try {
            const data = await lawsService.getByCategory(req.params.category_id);
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }
}
module.exports = new LawsController();
