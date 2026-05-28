// File này chứa toàn bộ định nghĩa các đường dẫn (Routes) liên quan đến quản lý thông tin tài khoản người dùng.
// Giúp chuyển hướng các request về đúng hàm tương ứng trong UsersController để xử lý.

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/UsersController');

// Đường dẫn: GET /api/users/
// Dùng để lấy toàn bộ danh sách người dùng trong hệ thống (dành riêng cho Admin)
router.get('/', usersController.getAll.bind(usersController));

// Đường dẫn: POST /api/users/login
// Chức năng đăng nhập tài khoản người dùng
router.post('/login', usersController.login.bind(usersController));

// Đường dẫn: GET /api/users/:id
// Lấy chi tiết thông tin một người dùng cụ thể bằng ID
router.get('/:id', usersController.getById.bind(usersController));

// Đường dẫn: POST /api/users/
// Đăng ký tài khoản người dùng mới
router.post('/', usersController.create.bind(usersController));

// Đường dẫn: PUT /api/users/:id
// Cập nhật thông tin cá nhân của người dùng dựa theo ID
router.put('/:id', usersController.update.bind(usersController));

// Đường dẫn: DELETE /api/users/:id
// Xoá tài khoản người dùng khỏi hệ thống thông qua ID
router.delete('/:id', usersController.delete.bind(usersController));

module.exports = router; // Xuất router ra ngoài để file server.js import vào sử dụng
