/**
 * @file DrivingTestCenters.js
 * @description Model định nghĩa cấu trúc thực thể dữ liệu của DrivingTestCenters.
 * @module Backend
 */

/**
 * Lớp DrivingTestCenters
 * Model định nghĩa cấu trúc thực thể dữ liệu của DrivingTestCenters.
 */
class DrivingTestCenters {
    constructor(id, name, address, latitude, longitude) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
module.exports = DrivingTestCenters;
