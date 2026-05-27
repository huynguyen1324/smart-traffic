package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể QuizProgress.
 */
data class QuizDetailSaveRequest(
    val user_id: Int,
    val license: String,
    val question_id: Int,
    val chosen_option: String,
    val correct: Int // Chuyển từ Boolean sang Int (1: Đúng, 0: Sai)
)

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể QuizProgress.
 */
data class QuizStatsDto(
    val total_done: Int,
    val total_correct: Int,
    val accuracy_rate: Double,
    val total_questions: Int
)

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể QuizProgress.
 */
data class QuizDetailResponse(
    val question_id: Int,
    val correct: Int // Chuyển từ Boolean sang Int (1: Đúng, 0: Sai)
)
