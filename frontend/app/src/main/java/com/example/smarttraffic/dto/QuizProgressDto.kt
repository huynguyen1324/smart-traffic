package com.example.smarttraffic.dto

data class QuizDetailSaveRequest(
    val user_id: Int,
    val license: String,
    val question_id: Int,
    val chosen_option: String,
    val correct: Int // Chuyển từ Boolean sang Int (1: Đúng, 0: Sai)
)

data class QuizStatsDto(
    val total_done: Int,
    val total_correct: Int,
    val accuracy_rate: Double,
    val total_questions: Int
)

data class QuizDetailResponse(
    val question_id: Int,
    val correct: Int // Chuyển từ Boolean sang Int (1: Đúng, 0: Sai)
)
