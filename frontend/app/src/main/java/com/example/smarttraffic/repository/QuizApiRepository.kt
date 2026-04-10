package com.example.smarttraffic.repository

import com.example.smarttraffic.dto.QuizQuestionDto
import com.example.smarttraffic.dto.QuizSubmitRequest
import com.example.smarttraffic.dto.QuizSubmitResponse
import com.example.smarttraffic.network.QuizApiService
import com.example.smarttraffic.network.RetrofitClient
import retrofit2.Call

class QuizApiRepository {

    private val api = RetrofitClient.retrofit.create(QuizApiService::class.java)

    fun getQuestionsByTypeAndCategory(
        license: String,
        type: String,
        categoryId: Int
    ): Call<List<QuizQuestionDto>> {
        return api.getQuestionsByTypeAndCategory(license, type, categoryId)
    }

    fun getQuestionsByType(
        license: String,
        type: String
    ): Call<List<QuizQuestionDto>> {
        return api.getQuestionsByType(license, type)
    }

    fun getAllQuestions(license: String): Call<List<QuizQuestionDto>> {
        return api.getAllQuestions(license)
    }

    fun submitQuizResult(request: QuizSubmitRequest): Call<QuizSubmitResponse> {
        return api.submitQuizResult(request)
    }
}