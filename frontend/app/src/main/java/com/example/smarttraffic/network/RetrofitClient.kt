package com.example.smarttraffic.network

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

/**
 * Định nghĩa các cổng giao tiếp API Retrofit kết nối tới máy chủ Backend cho dịch vụ RetrofitClient.
 */
object RetrofitClient {

    private const val BASE_URL = "http://10.0.2.2:5000/" // Dùng cho Android Emulator
    const val IMAGE_URL_BASE = BASE_URL

    fun getFullImageUrl(path: String?): String {
        if (path.isNullOrBlank()) return ""
        if (path.startsWith("http")) return path // Already a full URL
        
        if (path.startsWith("/images/")) {
            return BASE_URL.trimEnd('/') + path
        }
        
        return IMAGE_URL_BASE.trimEnd('/') + "/" + path.trimStart('/')
    }

    private val okHttpClient = okhttp3.OkHttpClient.Builder()
        .connectTimeout(60, java.util.concurrent.TimeUnit.SECONDS)
        .readTimeout(60, java.util.concurrent.TimeUnit.SECONDS)
        .writeTimeout(60, java.util.concurrent.TimeUnit.SECONDS)
        .build()

    val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl(BASE_URL)
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    val chatbotApi: ChatbotApiService by lazy { 
        retrofit.create(ChatbotApiService::class.java) 
    }
}