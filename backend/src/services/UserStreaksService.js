const userStreaksRepository = require('../repositories/UserStreaksRepository');

class UserStreaksService {
    async getStreak(userId) {
        let streak = await userStreaksRepository.findByUserId(userId);
        if (!streak) {
            return { current_streak: 0, longest_streak: 0 };
        }
        
        const now = new Date();
        const today = now.toLocaleDateString('en-CA');
        const lastDate = new Date(streak.last_activity_date).toLocaleDateString('en-CA');
        
        const yesterdayObj = new Date(now);
        yesterdayObj.setDate(yesterdayObj.getDate() - 1);
        const yesterday = yesterdayObj.toLocaleDateString('en-CA');

        if (lastDate !== today && lastDate !== yesterday) {
            return { current_streak: 0, longest_streak: streak.longest_streak };
        }

        return streak;
    }

    async tickStreak(userId) {
        return await userStreaksRepository.updateStreak(userId);
    }
}

module.exports = new UserStreaksService();
