package com.example.smarttraffic.network

import com.example.smarttraffic.dto.QuizQuestionDto
import com.example.smarttraffic.dto.QuizSubmitRequest
import com.example.smarttraffic.dto.QuizSubmitResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

interface QuizApiService {

    @GET("api/quizzes/{license}/questions")
    fun getAllQuestions(@Path("license") license: String): Call<List<QuizQuestionDto>>

    @GET("api/quizzes/{license}/questions/type/{type}")
    fun getQuestionsByType(
        @Path("license") license: String,
        @Path("type") type: String
    ): Call<List<QuizQuestionDto>>

    @GET("api/quizzes/{license}/questions/type/{type}/category/{categoryId}")
    fun getQuestionsByTypeAndCategory(
        @Path("license") license: String,
        @Path("type") type: String,
        @Path("categoryId") categoryId: Int
    ): Call<List<QuizQuestionDto>>

    @GET("api/quizzes/{license}/questions/{id}")
    fun getQuestionById(
        @Path("license") license: String,
        @Path("id") id: Int
    ): Call<QuizQuestionDto>

    @POST("api/quizzes/results")
    fun submitQuizResult(@Body request: QuizSubmitRequest): Call<QuizSubmitResponse>
}