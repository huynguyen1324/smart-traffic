const drivingTestCentersService = require('../services/DrivingTestCentersService');

class DrivingTestCentersController {
    async getAll(req, res) {
        try {
            const data = await drivingTestCentersService.getAllCenters();
            res.json(data);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}
module.exports = new DrivingTestCentersController();
