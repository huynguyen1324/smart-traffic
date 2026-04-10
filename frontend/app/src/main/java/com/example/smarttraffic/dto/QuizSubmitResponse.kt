package com.example.smarttraffic.dto

data class QuizSubmitData(
    val test_result_id: Int,
    val total_answers: Int
)

data class QuizSubmitResponse(
    val message: String,
    val data: QuizSubmitData
)