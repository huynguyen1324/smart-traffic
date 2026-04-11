const userStreaksService = require('../services/UserStreaksService');

class UserStreaksController {
    async get(req, res) {
        try {
            const data = await userStreaksService.getStreak(req.params.user_id);
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async update(req, res) {
        try {
            const data = await userStreaksService.tickStreak(req.params.user_id);
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }
}

module.exports = new UserStreaksController();
