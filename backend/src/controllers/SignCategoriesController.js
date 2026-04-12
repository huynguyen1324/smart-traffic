const signCategoriesService = require('../services/SignCategoriesService');

class SignCategoriesController {
    async getAll(req, res) {
        try {
            const data = await signCategoriesService.getAll();
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async getById(req, res) {
        try {
            const data = await signCategoriesService.getById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

}
module.exports = new SignCategoriesController();
