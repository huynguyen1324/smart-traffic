const pool = require('../config/db');

class DrivingTestCentersRepository {
    async findAll() {
        const [rows] = await pool.query('SELECT * FROM `driving_test_centers`');
        return rows;
    }
}
module.exports = new DrivingTestCentersRepository();
