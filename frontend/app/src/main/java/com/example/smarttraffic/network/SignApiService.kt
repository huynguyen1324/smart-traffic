package com.example.smarttraffic.network

import com.example.smarttraffic.dto.SignCategoryDto
import com.example.smarttraffic.dto.SignDto
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

/**
 * Định nghĩa các cổng giao tiếp API Retrofit kết nối tới máy chủ Backend cho dịch vụ Sign.
 */
interface SignApiService {

    @GET("api/sign-categories")
    fun getCategories(): Call<List<SignCategoryDto>>

    @GET("api/signs")
    fun getAllSigns(): Call<List<SignDto>>

    @GET("api/signs/{id}")
    fun getSignById(@Path("id") id: Int): Call<SignDto>
}