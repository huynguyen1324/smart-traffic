package com.example.smarttraffic.dto

data class StreakDto(
    val user_id: Int,
    val current_streak: Int,
    val longest_streak: Int,
    val last_activity_date: String?
)
