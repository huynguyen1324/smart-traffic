package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể QuizSubmitResponse.
 */
data class QuizSubmitData(
    val test_result_id: Int,
    val total_answers: Int
)

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể QuizSubmitResponse.
 */
data class QuizSubmitResponse(
    val message: String,
    val data: QuizSubmitData
)