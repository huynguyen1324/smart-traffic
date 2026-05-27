package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể QuizAnswerRequest.
 */
data class QuizAnswerRequest(
    val question_id: Int,
    val chosen_option: String,
    val correct: Boolean
)