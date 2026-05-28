// File này xử lý các nghiệp vụ cốt lõi liên quan đến người dùng (Users).
// Bao gồm đăng nhập, đăng ký tài khoản, sửa đổi thông tin cá nhân và quản lý dữ liệu người dùng.

const usersRepository = require('../repositories/UsersRepository');

// Lớp dịch vụ quản lý thông tin và tài khoản của người dùng
class UsersService {
    // Hàm xử lý đăng nhập: Nhận email hoặc số điện thoại cùng mật khẩu rồi so khớp
    async login(identifier, password) {
        // Tìm xem có user nào khớp với email hoặc số điện thoại này không
        const user = await usersRepository.findByEmailOrPhone(identifier);
        
        // Nếu tìm thấy và mật khẩu khớp thì trả về thông tin user đó luôn
        if (user && user.password_hash === password) {
            return user;
        }
        // Sai tên đăng nhập hoặc mật khẩu thì trả về null
        return null;
    }

    // Lấy ra danh sách toàn bộ người dùng có trên hệ thống
    async getAll() {
        return await usersRepository.findAll();
    }

    // Tìm thông tin chi tiết của một user cụ thể bằng ID
    async getById(id) {
        return await usersRepository.findById(id);
    }

    // Hàm tạo tài khoản mới (đăng ký) cho người dùng
    async create(data) {
        const userData = {};
        
        // Lọc lấy các trường thông tin cần thiết từ dữ liệu client gửi lên
        if (data.full_name !== undefined) userData.full_name = data.full_name;
        if (data.email !== undefined) userData.email = data.email;
        if (data.phone !== undefined) userData.phone = data.phone;
        if (data.password !== undefined) userData.password_hash = data.password;
        if (data.password_hash !== undefined) userData.password_hash = data.password_hash;
        if (data.avatar_url !== undefined) userData.avatar_url = data.avatar_url;
        if (data.learning_goal !== undefined) userData.learning_goal = data.learning_goal;

        // Kiểm tra xem email này đã có ai đăng ký chưa nhé
        if (userData.email) {
            const existing = await usersRepository.findByEmailOrPhone(userData.email);
            if (existing) {
                throw new Error('Email already registered'); // Trùng rồi thì báo lỗi ngay
            }
        }
        
        // Tương tự, kiểm tra xem số điện thoại này đã có ai xài chưa
        if (userData.phone) {
            const existing = await usersRepository.findByEmailOrPhone(userData.phone);
            if (existing) {
                throw new Error('Phone number already registered'); // Trùng số điện thoại cũng không cho đăng ký
            }
        }

        // Lưu thông tin người dùng mới vào cơ sở dữ liệu
        return await usersRepository.save(userData);
    }

    // Hàm cập nhật (sửa đổi) thông tin cá nhân của người dùng
    async update(id, data) {
        const userData = {};
        
        // Lọc các trường dữ liệu được cập nhật
        if (data.full_name !== undefined) userData.full_name = data.full_name;
        if (data.email !== undefined) userData.email = data.email;
        if (data.phone !== undefined) userData.phone = data.phone;
        if (data.password !== undefined) userData.password_hash = data.password;
        if (data.password_hash !== undefined) userData.password_hash = data.password_hash;
        if (data.avatar_url !== undefined) userData.avatar_url = data.avatar_url;
        if (data.learning_goal !== undefined) userData.learning_goal = data.learning_goal;

        // Nếu cập nhật email mới, phải kiểm tra xem email đó có bị trùng với người khác không
        if (userData.email) {
            const existing = await usersRepository.findByEmailOrPhone(userData.email);
            // Email đã có người dùng và ID người đó khác ID của user hiện tại
            if (existing && existing.id !== Number(id)) {
                throw new Error('Email already in use');
            }
        }
        
        // Tương tự cho số điện thoại mới
        if (userData.phone) {
            const existing = await usersRepository.findByEmailOrPhone(userData.phone);
            // Số điện thoại đã có người khác dùng mất tiêu rồi
            if (existing && existing.id !== Number(id)) {
                throw new Error('Phone number already in use');
            }
        }

        // Tiến hành cập nhật thông tin mới vào database
        return await usersRepository.update(id, userData);
    }

    // Xoá tài khoản người dùng theo ID (chức năng quyền lực thường dành cho Admin)
    async delete(id) {
        return await usersRepository.delete(id);
    }
}
module.exports = new UsersService();
