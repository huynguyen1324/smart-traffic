package com.example.smarttraffic.network

import com.example.smarttraffic.dto.FavoriteDto
import retrofit2.Call
import retrofit2.http.*

interface FavoriteApiService {
    @GET("api/favourites")
    fun getAllFavorites(): Call<List<FavoriteDto>>

    @POST("api/favourites")
    fun addFavorite(@Body favorite: FavoriteDto): Call<com.example.smarttraffic.dto.FavoriteResponse>

    @DELETE("api/favourites/{id}")
    fun removeFavorite(@Path("id") id: Int): Call<Void>
}
