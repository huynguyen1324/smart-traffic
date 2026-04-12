const usersService = require('../services/UsersService');

class UsersController {
    async login(req, res) {
        try {
            const { identifier, password } = req.body;
            console.log(`Attempting login for: ${identifier}`);
            const user = await usersService.login(identifier, password);
            if (!user) {
                console.log(`Login failed for: ${identifier}`);
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            console.log(`Login successful for: ${identifier}`);
            res.json(user);
        } catch (err) { 
            console.error(`Login error for ${identifier}:`, err.message);
            res.status(500).json({ error: err.message }); 
        }
    }

    async getAll(req, res) {
        try {
            const data = await usersService.getAll();
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async getById(req, res) {
        try {
            const data = await usersService.getById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data);
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async create(req, res) {
        try {
            const id = await usersService.create(req.body);
            res.status(201).json({ message: 'Created', id });
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async update(req, res) {
        try {
            const updated = await usersService.update(req.params.id, req.body);
            if (!updated) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Updated' });
        } catch (err) { res.status(500).json({ error: err.message }); }
    }

    async delete(req, res) {
        try {
            const deleted = await usersService.delete(req.params.id);
            if (!deleted) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Deleted' });
        } catch (err) { res.status(500).json({ error: err.message }); }
    }
}
module.exports = new UsersController();
