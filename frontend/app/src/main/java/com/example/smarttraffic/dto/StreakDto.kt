package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể Streak.
 */
data class StreakDto(
    val user_id: Int,
    val current_streak: Int,
    val longest_streak: Int,
    val last_activity_date: String?
)
