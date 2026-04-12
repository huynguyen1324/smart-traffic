package com.example.smarttraffic.network

import okhttp3.MultipartBody
import okhttp3.RequestBody
import okhttp3.ResponseBody
import retrofit2.Call
import retrofit2.http.Multipart
import retrofit2.http.POST
import retrofit2.http.Part

interface ChatbotApiService {
    @Multipart
    @POST("api/chatbot/ask")
    fun askChatbot(
        @Part("message") message: RequestBody,
        @Part("userId") userId: RequestBody?,
        @Part("history") history: RequestBody?,
        @Part image: MultipartBody.Part?
    ): Call<okhttp3.ResponseBody>
}
