// File này dùng để quản lý toàn bộ tài khoản người dùng trong hệ thống
// Hỗ trợ từ việc lấy danh sách, đăng ký (thêm mới), cập nhật thông tin cá nhân cho đến đăng nhập và xoá tài khoản nhé!

const pool = require('../config/db');
const Users = require('../models/Users');

// Lớp UsersRepository chứa các lệnh SQL để thao tác với bảng users
class UsersRepository {
    // Hàm này giúp lấy ra danh sách của tất cả tài khoản người dùng có trong hệ thống
    async findAll() {
        // SELECT toàn bộ thông tin từ bảng users
        const [rows] = await pool.query('SELECT * FROM `users`');
        return rows;
    }

    // Hàm này giúp tìm kiếm một người dùng cụ thể bằng ID (ví dụ: khi xem trang cá nhân)
    async findById(id) {
        // Tìm tài khoản có id khớp với id được truyền vào
        const [rows] = await pool.query('SELECT * FROM `users` WHERE id = ?', [id]);
        // Trả về thông tin user đầu tiên tìm được, nếu không tìm thấy thì trả về null
        return rows[0] || null;
    }

    // Hàm này cực kỳ quan trọng cho tính năng Đăng nhập! Giúp tìm user bằng Email hoặc Số điện thoại
    async findByEmailOrPhone(identifier) {
        console.log(`Repository seeking user with identifier: "${identifier}"`);
        // Thực hiện SELECT trong database xem email hoặc số điện thoại có trùng khớp với thông tin đăng nhập không
        const [rows] = await pool.query('SELECT * FROM `users` WHERE email = ? OR phone = ?', [identifier, identifier]);
        console.log(`Repository found ${rows.length} matches`);
        // Nếu tìm thấy tài khoản hợp lệ thì trả về, không thấy thì trả về null
        return rows[0] || null;
    }

    // Hàm này dùng khi có người dùng mới Đăng ký tài khoản
    async save(data) {
        // Thêm dữ liệu tài khoản mới vào bảng users
        const [result] = await pool.query('INSERT INTO `users` SET ?', [data]);
        // Trả về ID của tài khoản vừa mới được tạo ra
        return result.insertId;
    }

    // Hàm này dùng khi người dùng muốn Thay đổi thông tin cá nhân (như đổi tên, đổi mật khẩu...)
    async update(id, data) {
        // Thực hiện cập nhật dữ liệu của user theo id tương ứng
        const [result] = await pool.query('UPDATE `users` SET ? WHERE id = ?', [data, id]);
        // Trả về true nếu có ít nhất một dòng trong database được sửa đổi thành công
        return result.affectedRows > 0;
    }

    // Hàm này dùng để Xoá tài khoản người dùng khỏi hệ thống
    async delete(id) {
        // Thực hiện DELETE tài khoản có id trùng khớp
        const [result] = await pool.query('DELETE FROM `users` WHERE id = ?', [id]);
        // Trả về true nếu xoá thành công, false nếu không tìm thấy user đó để xoá
        return result.affectedRows > 0;
    }
}
module.exports = new UsersRepository();
