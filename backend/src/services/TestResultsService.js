// File này lưu trữ và quản lý kết quả các bài thi thử của người dùng.
// Giúp lưu lại điểm số, trạng thái Đạt hay Không Đạt của các đề thi mà người dùng đã làm.

const testResultsRepository = require('../repositories/TestResultsRepository');

// Lớp dịch vụ quản lý kết quả thi thử
class TestResultsService {
    // Hàm này giúp lấy toàn bộ danh sách kết quả thi thử của một người dùng dựa vào ID của họ
    async getByUserId(userId) {
        return await testResultsRepository.findByUserId(userId);
    }

    // Khi người dùng làm xong bài thi thử, hàm này sẽ được gọi để lưu kết quả bài thi đó vào database
    async create(data) {
        return await testResultsRepository.save(data);
    }
}
module.exports = new TestResultsService();
