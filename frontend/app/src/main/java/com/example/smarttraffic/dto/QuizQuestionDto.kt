package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể QuizQuestion.
 */
data class QuizQuestionDto(
    val id: Int,
    val type: String?,
    val type_category_id: Int?,
    val image_url: String?,
    val description_text: String?,
    val option_a: String?,
    val option_b: String?,
    val option_c: String?,
    val option_d: String?,
    val correct_option: String?,
    val explanation: String?
)