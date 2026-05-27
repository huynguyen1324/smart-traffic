package com.example.smarttraffic.network

import com.example.smarttraffic.dto.LawCategoryDto
import com.example.smarttraffic.dto.LawDto
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

/**
 * Định nghĩa các cổng giao tiếp API Retrofit kết nối tới máy chủ Backend cho dịch vụ Law.
 */
interface LawApiService {

    @GET("api/law-categories")
    fun getCategories(): Call<List<LawCategoryDto>>

    @GET("api/laws")
    fun getAllLaws(): Call<List<LawDto>>

    @GET("api/laws/{id}")
    fun getLawById(@Path("id") id: Int): Call<LawDto>

    @GET("api/laws/category/{category_id}")
    fun getLawsByCategory(@Path("category_id") categoryId: Int): Call<List<LawDto>>
}