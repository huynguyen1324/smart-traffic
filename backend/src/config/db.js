// Chào các bạn, đây là file cấu hình kết nối database MySQL nhé. 
// File này sẽ giúp server của chúng ta "nói chuyện" được với cơ sở dữ liệu.

const mysql = require("mysql2/promise"); // Dùng thư viện mysql2 phiên bản hỗ trợ Promise để viết code async/await cho mượt mà
require("dotenv").config(); // Nạp các biến môi trường từ file .env để bảo mật thông tin tài khoản mật khẩu

// Tạo một "hồ chứa kết nối" (Connection Pool) để dùng đi dùng lại các kết nối, đỡ phải tạo mới liên tục cho đỡ nặng máy
const pool = mysql.createPool({
  host: process.env.DB_HOST, // Địa chỉ IP hoặc tên miền của máy chủ database (ví dụ: localhost)
  port: process.env.DB_PORT, // Cổng kết nối của database (mặc định MySQL thường là 3306)
  user: process.env.DB_USER, // Tên đăng nhập vào database
  password: process.env.DB_PASSWORD, // Mật khẩu của tài khoản trên
  database: process.env.DB_NAME, // Tên của database mà ứng dụng của mình muốn dùng
  waitForConnections: true, // Nếu hết cổng kết nối rảnh thì ráng xếp hàng đợi chứ đừng báo lỗi liền nha
  connectionLimit: 10, // Cho phép tối đa 10 kết nối chạy cùng một lúc thôi
  queueLimit: 0 // Giới hạn hàng đợi (để là 0 nghĩa là hàng đợi vô hạn, cứ xếp hàng thoải mái)
});

// Xuất cái pool kết nối này ra ngoài để mấy file khác trong dự án có thể import vào sử dụng luôn
module.exports = pool;
