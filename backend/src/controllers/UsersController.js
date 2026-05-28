// File này xử lý các yêu cầu liên quan đến người dùng (đăng ký, đăng nhập, sửa đổi thông tin cá nhân và quản lý tài khoản).
// Nhận request từ frontend, gọi tới Service xử lý database rồi trả về phản hồi thích hợp cho client.

const usersService = require('../services/UsersService');

class UsersController {
    // Hàm xử lý việc đăng nhập của người dùng.
    // Client gửi lên body chứa identifier (có thể là email hoặc username) và password.
    async login(req, res) {
        const { identifier, password } = req.body || {};
        try {
            console.log(`Đang cố gắng đăng nhập cho tài khoản: ${identifier}`);
            const user = await usersService.login(identifier, password);
            // Nếu thông tin đăng nhập sai hoặc không tìm thấy user, trả về mã 401 Unauthorized
            if (!user) {
                console.log(`Đăng nhập thất bại cho tài khoản: ${identifier}`);
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            console.log(`Đăng nhập thành công rực rỡ cho tài khoản: ${identifier}`);
            res.json(user); // Trả về thông tin người dùng kèm token (nếu có) dưới dạng JSON
        } catch (err) {
            console.error(`Lỗi đăng nhập cho tài khoản ${identifier}:`, err.stack || err.message);
            res.status(500).json({ error: err.message }); // Báo lỗi 500 nếu gặp sự cố hệ thống
        }
    }

    // Hàm lấy toàn bộ danh sách người dùng trong hệ thống (dành cho Admin)
    async getAll(req, res) {
        try {
            const data = await usersService.getAll();
            res.json(data); // Trả về danh sách user
        } catch (err) { 
            res.status(500).json({ error: err.message }); 
        }
    }

    // Lấy thông tin chi tiết của một người dùng thông qua ID
    // ID được truyền qua URL params (req.params.id)
    async getById(req, res) {
        try {
            const data = await usersService.getById(req.params.id);
            // Không tìm thấy user nào khớp ID thì trả về lỗi 404
            if (!data) return res.status(404).json({ message: 'Not found' });
            res.json(data); // Trả về thông tin user tìm thấy
        } catch (err) { 
            res.status(500).json({ error: err.message }); 
        }
    }

    // Tạo mới tài khoản người dùng (Đăng ký tài khoản)
    // Client gửi thông tin qua body của request (req.body)
    async create(req, res) {
        try {
            const id = await usersService.create(req.body);
            // Trả về mã 201 Created cùng với ID của user vừa được lưu vào database
            res.status(201).json({ message: 'Created', id });
        } catch (err) { 
            res.status(500).json({ error: err.message }); 
        }
    }

    // Cập nhật thông tin tài khoản người dùng theo ID (Ví dụ: Đổi tên, đổi mật khẩu...)
    // ID nhận từ URL params, thông tin cập nhật nằm trong body
    async update(req, res) {
        try {
            const updated = await usersService.update(req.params.id, req.body);
            // Nếu không tìm thấy user cần sửa thì báo lỗi 404
            if (!updated) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Updated' }); // Báo cập nhật thành công
        } catch (err) { 
            res.status(500).json({ error: err.message }); 
        }
    }

    // Xóa tài khoản người dùng theo ID
    // ID nhận qua URL params (req.params.id)
    async delete(req, res) {
        try {
            const deleted = await usersService.delete(req.params.id);
            // Không tìm thấy user để xóa thì trả về 404
            if (!deleted) return res.status(404).json({ message: 'Not found' });
            res.json({ message: 'Deleted' }); // Báo xóa tài khoản thành công
        } catch (err) { 
            res.status(500).json({ error: err.message }); 
        }
    }
}
module.exports = new UsersController(); // Xuất instance ra để các routes bên ngoài import nhé
