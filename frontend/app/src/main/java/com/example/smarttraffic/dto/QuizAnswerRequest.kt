package com.example.smarttraffic.dto

data class QuizAnswerRequest(
    val question_id: Int,
    val chosen_option: String,
    val correct: Boolean
)