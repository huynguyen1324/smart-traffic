// File này phụ trách quản lý chuỗi ngày học liên tục (streak) của người dùng.
// Tạo động lực học tập mỗi ngày như Duolingo luôn nha!

const userStreaksRepository = require('../repositories/UserStreaksRepository');

// Lớp dịch vụ tính toán và cập nhật streak cho người học
class UserStreaksService {
    // Hàm này giúp lấy thông tin streak hiện tại của người dùng
    async getStreak(userId) {
        let streak = await userStreaksRepository.findByUserId(userId);
        
        // Nếu user này chưa từng có hoạt động nào trong database, trả về 0 luôn cho nhanh
        if (!streak) {
            return { current_streak: 0, longest_streak: 0 };
        }
        
        // Bắt đầu tính toán xem streak có bị đứt hay không nhé
        const now = new Date();
        // Lấy ngày hôm nay dưới dạng chuỗi định dạng YYYY-MM-DD (dùng 'en-CA' để ra chuẩn này cực tiện)
        const today = now.toLocaleDateString('en-CA');
        // Lấy ngày hoạt động cuối cùng của người dùng
        const lastDate = new Date(streak.last_activity_date).toLocaleDateString('en-CA');
        
        // Tính toán ngày hôm qua là ngày nào
        const yesterdayObj = new Date(now);
        yesterdayObj.setDate(yesterdayObj.getDate() - 1);
        const yesterday = yesterdayObj.toLocaleDateString('en-CA');

        // Nếu ngày học cuối cùng không phải hôm nay và cũng chẳng phải hôm qua (tức là bị ngắt quãng quá 1 ngày rồi)
        if (lastDate !== today && lastDate !== yesterday) {
            // Tiếc quá, mất streak rồi! Trả về streak hiện tại bằng 0, nhưng vẫn giữ lại chuỗi dài nhất lịch sử (longest_streak) nhé
            return { current_streak: 0, longest_streak: streak.longest_streak };
        }

        // Còn nếu vẫn chăm chỉ học hôm qua hoặc hôm nay thì cứ trả về dữ liệu streak đầy đủ nha
        return streak;
    }

    // Mỗi khi người dùng hoàn thành một hoạt động học tập (như làm quiz, học luật...), gọi hàm này để duy trì/tăng streak nhé
    async tickStreak(userId) {
        return await userStreaksRepository.updateStreak(userId);
    }
}

module.exports = new UserStreaksService();
