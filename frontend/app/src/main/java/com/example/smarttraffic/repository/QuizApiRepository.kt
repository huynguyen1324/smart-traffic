package com.example.smarttraffic.repository

import com.example.smarttraffic.dto.QuizQuestionDto
import com.example.smarttraffic.network.QuizApiService
import com.example.smarttraffic.network.RetrofitClient
import retrofit2.Call

/**
 * Repository trung gian điều phối dữ liệu từ API cục bộ hoặc mạng cho các ViewModel/Activity.
 */
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
}