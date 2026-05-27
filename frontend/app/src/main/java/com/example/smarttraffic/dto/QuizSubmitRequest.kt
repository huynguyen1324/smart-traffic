package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể QuizSubmitRequest.
 */
data class QuizSubmitRequest(
    val user_id: Int,
    val answers: List<QuizAnswerRequest>
)