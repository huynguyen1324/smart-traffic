package com.example.smarttraffic.network

import com.example.smarttraffic.dto.QuizQuestionDto
import com.example.smarttraffic.dto.QuizSubmitRequest
import com.example.smarttraffic.dto.QuizSubmitResponse
import com.example.smarttraffic.dto.QuizDetailSaveRequest
import com.example.smarttraffic.dto.QuizStatsDto
import com.example.smarttraffic.dto.QuizDetailResponse
import com.example.smarttraffic.dto.TestResultDto
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path

/**
 * Định nghĩa các cổng giao tiếp API Retrofit kết nối tới máy chủ Backend cho dịch vụ Quiz.
 */
interface QuizApiService {

    @GET("api/quizzes/{license}/questions/type/{type}")
    fun getQuestionsByType(
        @Path("license") license: String,
        @Path("type") type: String
    ): Call<List<QuizQuestionDto>>

    @GET("api/quizzes/{license}/questions/type/{type}/category/{category_id}")
    fun getQuestionsByTypeAndCategory(
        @Path("license") license: String,
        @Path("type") type: String,
        @Path("category_id") category_id: Int
    ): Call<List<QuizQuestionDto>>

    @POST("api/quizzes/details")
    fun saveQuizDetail(@Body request: QuizDetailSaveRequest): Call<Void>

    @GET("api/quizzes/stats/{user_id}")
    fun getQuizStats(@Path("user_id") user_id: Int): Call<QuizStatsDto>

    @GET("api/quizzes/details/{user_id}")
    fun getQuizDetails(@Path("user_id") user_id: Int): Call<List<QuizDetailResponse>>

    @POST("api/test-results")
    fun saveTestResult(@Body request: TestResultDto): Call<Void>

    @GET("api/test-results/user/{user_id}")
    fun getTestResultsByUser(@Path("user_id") user_id: Int): Call<List<TestResultDto>>

    @GET("api/quizzes/{license}/tests")
    fun getTestList(@Path("license") license: String): Call<List<com.example.smarttraffic.dto.TestDto>>

    @GET("api/quizzes/{license}/test/{test_id}")
    fun getQuestionsByTest(
        @Path("license") license: String,
        @Path("test_id") test_id: Int
    ): Call<List<QuizQuestionDto>>

    @GET("api/streaks/{user_id}")
    fun getStreak(@Path("user_id") user_id: Int): Call<com.example.smarttraffic.dto.StreakDto>

    @POST("api/streaks/{user_id}/tick")
    fun tickStreak(@Path("user_id") user_id: Int): Call<com.example.smarttraffic.dto.StreakDto>
}