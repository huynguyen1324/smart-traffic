package com.example.smarttraffic.dto

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