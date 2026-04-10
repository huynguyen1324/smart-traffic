package com.example.smarttraffic.repository

import com.example.smarttraffic.dto.SignCategoryDto
import com.example.smarttraffic.dto.SignDto
import com.example.smarttraffic.network.RetrofitClient
import com.example.smarttraffic.network.SignApiService
import retrofit2.Call

class SignApiRepository {

    private val api = RetrofitClient.retrofit.create(SignApiService::class.java)

    fun getCategories(): Call<List<SignCategoryDto>> {
        return api.getCategories()
    }

    fun getAllSigns(): Call<List<SignDto>> {
        return api.getAllSigns()
    }

    fun getSignById(id: Int): Call<SignDto> {
        return api.getSignById(id)
    }
}