package com.example.smarttraffic.dto

data class QuizSubmitRequest(
    val user_id: Int,
    val answers: List<QuizAnswerRequest>
)