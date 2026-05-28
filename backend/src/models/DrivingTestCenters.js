// File này định nghĩa cấu trúc dữ liệu của các Trung tâm sát hạch/thi lái xe nè các bạn ơi.
// Nó giúp lưu trữ thông tin cơ bản kèm theo cả tọa độ GPS để sau này vẽ lên bản đồ cho người dùng dễ tìm đường đi học và thi đó!

class DrivingTestCenters {
    // Hàm khởi tạo này giúp tụi mình đúc ra một đối tượng trung tâm thi sát hạch chuẩn chỉ nhất
    constructor(id, name, address, latitude, longitude) {
        this.id = id; // ID duy nhất của trung tâm thi này trong hệ thống dữ liệu
        this.name = name; // Tên đầy đủ của trung tâm sát hạch (ví dụ: Trung tâm sát hạch lái xe Thành Công)
        this.address = address; // Địa chỉ cụ thể ngoài đời thực để người dùng biết đường mà mò tới thi
        this.latitude = latitude; // Vĩ độ (tọa độ GPS trục đứng, dùng để chấm điểm trên Google Maps)
        this.longitude = longitude; // Kinh độ (tọa độ GPS trục ngang, đi cùng vĩ độ để xác định vị trí chính xác)
    }
}

// Xuất class ra ngoài để các phần backend khác lôi về sử dụng nha
module.exports = DrivingTestCenters;
