package com.example.smarttraffic.network

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object RetrofitClient {

//    private const val BASE_URL = "http://172.18.125.70:5000/" // Dùng cho điện thoại thật cùng Wi-Fi
//    private const val BASE_URL = "http://10.0.2.2:5000/" // Dùng cho Android Emulator
    private const val BASE_URL = "https://smart-traffic-j4ej.onrender.com" // Server mọi máy truy cập được
    const val IMAGE_URL_BASE = BASE_URL + "images/"

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