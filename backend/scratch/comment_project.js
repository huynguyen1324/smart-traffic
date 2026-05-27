/**
 * comment_project.js
 * Kịch bản tự động thêm bình luận tiếng Việt chuẩn JSDoc/KDoc cho toàn bộ dự án Smart Traffic.
 */
const fs = require('fs');
const path = require('path');

const BACKEND_SRC = path.join(__dirname, '../src');
const FRONTEND_SRC = path.join(__dirname, '../../frontend/app/src/main/java/com/example/smarttraffic');

console.log('=== KHỞI ĐỘNG HỆ THỐNG BÌNH LUẬN TỰ ĐỘNG ===');
console.log('Backend src:', BACKEND_SRC);
console.log('Frontend src:', FRONTEND_SRC);

// Hàm đệ quy quét tất cả tập tin trong thư mục
function getFiles(dir, ext) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(filePath, ext));
        } else {
            if (filePath.endsWith(ext)) {
                results.push(filePath);
            }
        }
    });
    return results;
}

// -------------------------------------------------------------
// XỬ LÝ BACKEND (JAVASCRIPT)
// -------------------------------------------------------------
function commentBackendFile(filePath) {
    const relativePath = path.relative(BACKEND_SRC, filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Nếu file đã có comment JSDoc lớn đầu trang, bỏ qua không ghi đè để bảo toàn dữ liệu cũ
    if (content.includes('/**') && (content.includes('@file') || content.includes('@description'))) {
        console.log(`[Backend] Bỏ qua (đã được comment): ${relativePath}`);
        return;
    }

    let commentedContent = content;
    const baseName = path.basename(filePath, '.js');

    // 1. Phân loại theo thư mục và chèn Header File
    let fileDesc = 'Thành phần xử lý nghiệp vụ dự án Smart Traffic.';
    if (filePath.includes('/config/') || filePath.includes('\\config\\')) {
        fileDesc = 'Cấu hình kết nối cơ sở dữ liệu và môi trường ứng dụng.';
    } else if (filePath.includes('/controllers/') || filePath.includes('\\controllers\\')) {
        fileDesc = `Controller điều phối yêu cầu HTTP API liên quan đến ${baseName.replace('Controller', '')}.`;
    } else if (filePath.includes('/models/') || filePath.includes('\\models\\')) {
        fileDesc = `Model định nghĩa cấu trúc thực thể dữ liệu của ${baseName}.`;
    } else if (filePath.includes('/repositories/') || filePath.includes('\\repositories\\')) {
        fileDesc = `Repository thực thi các truy vấn SQL trực tiếp liên quan đến ${baseName.replace('Repository', '')}.`;
    } else if (filePath.includes('/routes/') || filePath.includes('\\routes\\')) {
        fileDesc = `Định nghĩa các luồng định tuyến (Router) HTTP API cho ${baseName.replace('Routes', '')}.`;
    } else if (filePath.includes('/services/') || filePath.includes('\\services\\')) {
        fileDesc = `Service cung cấp các nghiệp vụ logic trung gian liên quan đến ${baseName.replace('Service', '')}.`;
    } else if (baseName === 'server') {
        fileDesc = 'Tập tin khởi chạy chính của ứng dụng Backend Node.js Express server.';
    }

    const header = `/**\n * @file ${path.basename(filePath)}\n * @description ${fileDesc}\n * @module Backend\n */\n\n`;

    // 2. Chèn Class Comment
    const classRegex = /class\s+(\w+)\s*\{/g;
    commentedContent = commentedContent.replace(classRegex, (match, className) => {
        return `/**\n * Lớp ${className}\n * ${fileDesc}\n */\nclass ${className} {`;
    });

    // 3. Chèn JSDoc cho các standard methods
    const methods = [
        {
            name: 'getAll',
            regex: /async\s+getAll\s*\(\s*req\s*,\s*res\s*\)/g,
            comment: `    /**\n     * Lấy toàn bộ danh sách dữ liệu\n     * @param {Object} req - Đối tượng Express Request\n     * @param {Object} res - Đối tượng Express Response\n     * @returns {Promise<void>} Trả về JSON danh sách dữ liệu hoặc thông báo lỗi\n     */\n    async getAll(req, res)`
        },
        {
            name: 'getById',
            regex: /async\s+getById\s*\(\s*req\s*,\s*res\s*\)/g,
            comment: `    /**\n     * Lấy chi tiết bản ghi theo mã định danh (ID)\n     * @param {Object} req - Đối tượng Express Request (yêu cầu params.id)\n     * @param {Object} res - Đối tượng Express Response\n     * @returns {Promise<void>} Trả về JSON bản ghi hoặc lỗi 404/500\n     */\n    async getById(req, res)`
        },
        {
            name: 'create',
            regex: /async\s+create\s*\(\s*req\s*,\s*res\s*\)/g,
            comment: `    /**\n     * Tạo mới một bản ghi\n     * @param {Object} req - Đối tượng Express Request (chứa dữ liệu trong body)\n     * @param {Object} res - Đối tượng Express Response\n     * @returns {Promise<void>} Trả về JSON thông báo tạo thành công và ID mới\n     */\n    async create(req, res)`
        },
        {
            name: 'update',
            regex: /async\s+update\s*\(\s*req\s*,\s*res\s*\)/g,
            comment: `    /**\n     * Cập nhật thông tin bản ghi theo mã định danh (ID)\n     * @param {Object} req - Đối tượng Express Request (chứa params.id và body mới)\n     * @param {Object} res - Đối tượng Express Response\n     * @returns {Promise<void>} Trả về trạng thái cập nhật\n     */\n    async update(req, res)`
        },
        {
            name: 'delete',
            regex: /async\s+delete\s*\(\s*req\s*,\s*res\s*\)/g,
            comment: `    /**\n     * Xóa bản ghi theo mã định danh (ID)\n     * @param {Object} req - Đối tượng Express Request (yêu cầu params.id)\n     * @param {Object} res - Đối tượng Express Response\n     * @returns {Promise<void>} Trả về trạng thái xóa thành công\n     */\n    async delete(req, res)`
        },
        // Cho Service
        {
            name: 'service_getAll',
            regex: /async\s+getAll\s*\(\s*\)/g,
            comment: `    /**\n     * Lấy danh sách tất cả các bản ghi\n     * @returns {Promise<Array>} Danh sách thực thể dữ liệu\n     */\n    async getAll()`
        },
        {
            name: 'service_getById',
            regex: /async\s+getById\s*\(\s*id\s*\)/g,
            comment: `    /**\n     * Tìm bản ghi theo mã định danh (ID)\n     * @param {number|string} id - Mã định danh\n     * @returns {Promise<Object|null>} Thực thể dữ liệu hoặc null\n     */\n    async getById(id)`
        },
        {
            name: 'service_create',
            regex: /async\s+create\s*\(\s*data\s*\)/g,
            comment: `    /**\n     * Tạo mới một thực thể dữ liệu\n     * @param {Object} data - Dữ liệu thực thể\n     * @returns {Promise<number>} ID của bản ghi vừa được tạo\n     */\n    async create(data)`
        },
        {
            name: 'service_update',
            regex: /async\s+update\s*\(\s*id\s*,\s*data\s*\)/g,
            comment: `    /**\n     * Cập nhật thông tin thực thể dữ liệu theo ID\n     * @param {number|string} id - Mã định danh\n     * @param {Object} data - Dữ liệu cần cập nhật\n     * @returns {Promise<boolean>} Trạng thái thành công\n     */\n    async update(id, data)`
        },
        {
            name: 'service_delete',
            regex: /async\s+delete\s*\(\s*id\s*\)/g,
            comment: `    /**\n     * Xóa thực thể dữ liệu theo ID\n     * @param {number|string} id - Mã định danh của phần tử cần xóa\n     * @returns {Promise<boolean>} Trạng thái xóa thành công\n     */\n    async delete(id)`
        },
        // Cho Repository
        {
            name: 'repo_findAll',
            regex: /async\s+findAll\s*\(\s*\)/g,
            comment: `    /**\n     * Truy vấn lấy tất cả các dòng từ bảng CSDL tương ứng\n     * @returns {Promise<Array>} Danh sách thô từ CSDL\n     */\n    async findAll()`
        },
        {
            name: 'repo_findById',
            regex: /async\s+findById\s*\(\s*id\s*\)/g,
            comment: `    /**\n     * Truy vấn dòng cụ thể trong CSDL dựa trên khóa chính ID\n     * @param {number|string} id - Khóa chính\n     * @returns {Promise<Object|null>} Bản ghi thô từ CSDL hoặc null\n     */\n    async findById(id)`
        },
        {
            name: 'repo_save',
            regex: /async\s+save\s*\(\s*data\s*\)/g,
            comment: `    /**\n     * Thêm mới dữ liệu một dòng vào bảng CSDL tương ứng\n     * @param {Object} data - Dữ liệu cần lưu\n     * @returns {Promise<number>} ID của bản ghi vừa lưu (insertId)\n     */\n    async save(data)`
        },
        {
            name: 'repo_update',
            regex: /async\s+update\s*\(\s*id\s*,\s*data\s*\)/g,
            comment: `    /**\n     * Cập nhật dữ liệu dòng trong CSDL dựa theo ID\n     * @param {number|string} id - Khóa chính\n     * @param {Object} data - Cập nhật tương ứng\n     * @returns {Promise<boolean>} Có dòng nào được cập nhật thành công hay không\n     */\n    async update(id, data)`
        },
        {
            name: 'repo_delete',
            regex: /async\s+delete\s*\(\s*id\s*\)/g,
            comment: `    /**\n     * Thực hiện xóa dòng khỏi bảng CSDL dựa vào khóa chính ID\n     * @param {number|string} id - Khóa chính\n     * @returns {Promise<boolean>} Trạng thái xóa thành công\n     */\n    async delete(id)`
        }
    ];

    methods.forEach(m => {
        commentedContent = commentedContent.replace(m.regex, m.comment);
    });

    // 4. Các bình luận inline cụ thể cho các logic phức tạp
    if (baseName === 'ChatbotController') {
        commentedContent = commentedContent
            .replace('async ask(req, res) {', `    /**\n     * Hàm ask nhận tin nhắn người dùng và ảnh (nếu có), gọi API OpenAI / OpenRouter để nhận câu trả lời dạng JSON\n     * @param {Object} req - Request chứa body { message, userId, history } và file upload ảnh\n     * @param {Object} res - Response phản hồi về app dưới dạng JSON\n     */\n    async ask(req, res) {`)
            .replace('if (!openai) {', '            // Kiểm tra xem khóa API OpenAI đã được cấu hình thành công hay chưa\n            if (!openai) {')
            .replace('historyArray.slice(-5).forEach', '            // Lấy tối đa 5 câu hội thoại trước đó trong lịch sử để giữ ngữ cảnh\n            historyArray.slice(-5).forEach')
            .replace('if (req.file) {', '            // Nếu người dùng tải kèm ảnh chụp (ví dụ biển báo), mã hóa sang Base64 để gửi cho AI thị giác\n            if (req.file) {')
            .replace('openai.chat.completions.create', '            // Gọi API tạo câu trả lời từ AI tích hợp\n            const completion = await openai.chat.completions.create')
            .replace('const jsonObj = JSON.parse(text);', '            // Phân tích cú pháp chuỗi JSON trả về từ AI để phản hồi chuẩn giao thức\n            const jsonObj = JSON.parse(text);');
    }

    if (baseName === 'QuizService') {
        commentedContent = commentedContent
            .replace('async getQuizStats(userId) {', `    /**\n     * Tính toán thống kê học tập (số câu đã làm, tỉ lệ chính xác, số câu đúng) của người dùng\n     * @param {number} userId - Mã người dùng\n     * @returns {Promise<Object>} Trả về tổng quan thống kê học tập\n     */\n    async getQuizStats(userId) {`)
            .replace('const stats = await quizRepository.findStats', '        // Lấy thống kê số câu đã làm và số câu trả lời đúng từ repository\n        const stats = await quizRepository.findStats')
            .replace('const accuracyRate = totalDone > 0', '        // Tính tỷ lệ chính xác (đơn vị phần trăm %)\n        const accuracyRate = totalDone > 0');
    }

    if (baseName === 'UserStreaksRepository') {
        commentedContent = commentedContent
            .replace('async updateStreak(userId) {', `    /**\n     * Cập nhật chuỗi ngày học liên tục (Streak) của người dùng\n     * Nếu chưa từng học, khởi tạo chuỗi học liên tiếp bằng 1.\n     * Nếu học tiếp ngày hôm sau, tăng Streak hiện tại.\n     * Nếu đã làm bài hôm nay rồi thì không tăng nữa.\n     * @param {number} userId - Mã người dùng\n     * @returns {Promise<Object>} Streak hiện tại và dài nhất\n     */\n    async updateStreak(userId) {`)
            .replace('if (lastDate === today) {', '        // Đã tham gia học ngày hôm nay, giữ nguyên Streak để tránh cộng dồn trong 1 ngày\n        if (lastDate === today) {')
            .replace('if (lastDate === yesterday) {', '        // Ngày học cuối cùng trùng với hôm qua, người dùng đang duy trì chuỗi học tốt\n        if (lastDate === yesterday) {');
    }

    // Ghi file
    fs.writeFileSync(filePath, header + commentedContent, 'utf8');
    console.log(`[Backend] Đã thêm bình luận thành công: ${relativePath}`);
}

// -------------------------------------------------------------
// XỬ LÝ FRONTEND (KOTLIN)
// -------------------------------------------------------------
function commentFrontendFile(filePath) {
    const relativePath = path.relative(FRONTEND_SRC, filePath).replace(/\\/g, '/');
    const content = fs.readFileSync(filePath, 'utf8');

    // Tránh comment lặp
    if (content.includes('/**') && (content.includes('DTO') || content.includes('Activity') || content.includes('Adapter') || content.includes('Service') || content.includes('Helper'))) {
        console.log(`[Frontend] Bỏ qua (đã được comment): ${relativePath}`);
        return;
    }

    let commentedContent = content;
    const baseName = path.basename(filePath, '.kt');

    // 1. Bình luận đầu trang và giải thích Class chính
    let fileDesc = 'Thành phần cấu trúc của ứng dụng Android Smart Traffic.';
    if (filePath.includes('/dto/') || filePath.includes('\\dto\\')) {
        fileDesc = `Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể ${baseName.replace('Dto', '')}.`;
    } else if (filePath.includes('/network/') || filePath.includes('\\network\\')) {
        fileDesc = `Định nghĩa các cổng giao tiếp API Retrofit kết nối tới máy chủ Backend cho dịch vụ ${baseName.replace('ApiService', '')}.`;
    } else if (filePath.includes('/repository/') || filePath.includes('\\repository\\')) {
        fileDesc = `Repository trung gian điều phối dữ liệu từ API cục bộ hoặc mạng cho các ViewModel/Activity.`;
    } else if (filePath.includes('/util/') || filePath.includes('\\util\\')) {
        fileDesc = `Lớp tiện ích (Utility) cung cấp các phương thức dùng chung như ${baseName}.`;
    } else if (filePath.includes('/ui/adapter/') || filePath.includes('\\ui\\adapter\\')) {
        fileDesc = `Adapter RecyclerView quản lý danh sách hiển thị và liên kết dữ liệu cho giao diện ${baseName.replace('Adapter', '')}.`;
    } else if (filePath.includes('/ui/') || filePath.includes('\\ui\\')) {
        fileDesc = `Màn hình giao diện điều khiển (Activity/Fragment) quản lý các luồng tương tác của ${baseName.replace('Activity', '')}.`;
    }

    // Chèn KDoc ngay trước phần khai báo class/interface
    const classRegex = /((?:data\s+)?class|interface|object)\s+(\w+)/g;
    commentedContent = commentedContent.replace(classRegex, (match, keyword, className) => {
        if (className === 'ViewHolder') return match; // Bỏ qua ViewHolder phụ
        return `/**\n * ${fileDesc}\n */\n${match}`;
    });

    // 2. Chèn KDoc cho các hàm tiêu chuẩn trong Activity và Adapter
    commentedContent = commentedContent
        .replace(/override\s+fun\s+onCreate\s*\(\s*savedInstanceState\s*:\s*Bundle\?\s*\)/g, 
            `    /**\n     * Khởi tạo màn hình và cài đặt giao diện người dùng (layout, view bindings, sự kiện nhấn).\n     * @param savedInstanceState Bộ lưu trữ trạng thái trước đó của màn hình\n     */\n    override fun onCreate(savedInstanceState: Bundle?)`)
        
        .replace(/override\s+fun\s+onCreateViewHolder\s*\(\s*parent\s*:\s*ViewGroup\s*,\s*viewType\s*:\s*Int\s*\)/g,
            `    /**\n     * Tạo và khởi tạo một ViewHolder mới đại diện cho giao diện phần tử danh sách.\n     * @param parent Nhóm View cha chứa phần tử\n     * @param viewType Kiểu giao diện phần tử\n     * @return ViewHolder mới chứa view\n     */\n    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int)`)
            
        .replace(/override\s+fun\s+onBindViewHolder\s*\(\s*holder\s*:\s*ViewHolder\s*,\s*position\s*:\s*Int\s*\)/g,
            `    /**\n     * Kết nối dữ liệu cụ thể từ danh sách vào các thành phần View của ViewHolder tương ứng.\n     * @param holder ViewHolder chứa các ánh xạ view cần cập nhật\n     * @param position Vị trí hiện tại của phần tử dữ liệu\n     */\n    override fun onBindViewHolder(holder: ViewHolder, position: Int)`)
            
        .replace(/override\s+fun\s+getItemCount\s*\(\s*\)/g,
            `    /**\n     * Trả về tổng số lượng phần tử có trong danh sách hiển thị.\n     */\n    override fun getItemCount()`);

    // 3. Các bình luận đặc thù cho các hàm nghiệp vụ phức tạp
    if (baseName === 'AssistantActivity') {
        commentedContent = commentedContent
            .replace('private fun handleSendMessage(text: String, imageUri: Uri? = null) {',
                `    /**\n     * Xử lý gửi tin nhắn của người dùng đi kèm ảnh đính kèm (nếu có) lên trợ lý ảo AI.\n     * Đồng thời quản lý lịch sử trò chuyện và cập nhật UI trạng thái "Đang xử lý...".\n     * @param text Nội dung tin nhắn dạng chữ\n     * @param imageUri Địa chỉ Uri dẫn đến file ảnh đính kèm\n     */\n    private fun handleSendMessage(text: String, imageUri: Uri? = null) {`)
            .replace('private fun handleAICommand(command: String?, params: org.json.JSONObject?) {',
                `    /**\n     * Nhận lệnh từ trợ lý thông minh để thực hiện điều hướng mở chức năng tương ứng của app.\n     * Ví dụ lệnh: OPEN_LAWS, OPEN_SIGNS, OPEN_MAP, SEARCH_LAW,...\n     * @param command Mã lệnh từ AI trả về\n     * @param params Bộ tham số mở rộng như từ khóa tìm kiếm (keyword)\n     */\n    private fun handleAICommand(command: String?, params: org.json.JSONObject?) {`);
    }

    if (baseName === 'SessionManager') {
        commentedContent = commentedContent
            .replace('fun saveLogin(id: Int, name: String, goal: String) {',
                `    /**\n     * Lưu trữ phiên đăng nhập của người dùng vào SharedPreferences cục bộ của thiết bị.\n     * @param id Mã định danh người dùng\n     * @param name Tên đầy đủ hiển thị\n     * @param goal Mục tiêu bằng lái (a1 hoặc b2)\n     */\n    fun saveLogin(id: Int, name: String, goal: String) {`)
            .replace('fun logout() {',
                `    /**\n     * Thực hiện đăng xuất tài khoản, xóa toàn bộ thông tin phiên làm việc khỏi bộ nhớ.\n     */\n    fun logout() {`);
    }

    // Ghi đè file
    fs.writeFileSync(filePath, commentedContent, 'utf8');
    console.log(`[Frontend] Đã thêm bình luận thành công: ${relativePath}`);
}

// -------------------------------------------------------------
// KHỞI CHẠY TIẾN TRÌNH
// -------------------------------------------------------------
try {
    console.log('\n--- BẮT ĐẦU DUYỆT FILE BACKEND (JAVASCRIPT) ---');
    const backendFiles = getFiles(BACKEND_SRC, '.js');
    console.log(`Tìm thấy ${backendFiles.length} files JavaScript.`);
    backendFiles.forEach(commentBackendFile);

    console.log('\n--- BẮT ĐẦU DUYỆT FILE FRONTEND (KOTLIN) ---');
    const frontendFiles = getFiles(FRONTEND_SRC, '.kt');
    console.log(`Tìm thấy ${frontendFiles.length} files Kotlin.`);
    frontendFiles.forEach(commentFrontendFile);

    console.log('\n=== HOÀN THÀNH CHÈN BÌNH LUẬN TOÀN BỘ DỰ ÁN THÀNH CÔNG ===\n');
} catch (error) {
    console.error('Đã xảy ra lỗi khi thực thi kịch bản bình luận:', error);
}
