package com.example.smarttraffic.repository

import com.example.smarttraffic.dto.LawCategoryDto
import com.example.smarttraffic.dto.LawDto
import com.example.smarttraffic.network.LawApiService
import com.example.smarttraffic.network.RetrofitClient
import retrofit2.Call

class LawApiRepository {

    private val api = RetrofitClient.retrofit.create(LawApiService::class.java)

    fun getCategories(): Call<List<LawCategoryDto>> {
        return api.getCategories()
    }

    fun getAllLaws(): Call<List<LawDto>> {
        return api.getAllLaws()
    }

    fun getLawById(id: Int): Call<LawDto> {
        return api.getLawById(id)
    }
}