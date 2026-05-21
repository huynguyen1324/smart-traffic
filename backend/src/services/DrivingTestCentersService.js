const drivingTestCentersRepository = require('../repositories/DrivingTestCentersRepository');

class DrivingTestCentersService {
    async getAllCenters() {
        return await drivingTestCentersRepository.findAll();
    }
}
module.exports = new DrivingTestCentersService();
