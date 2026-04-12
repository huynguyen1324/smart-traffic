package com.example.smarttraffic.network

import com.example.smarttraffic.dto.FavoriteDto
import retrofit2.Call
import retrofit2.http.*

interface FavoriteApiService {
    @GET("api/favourites")
    fun getAllFavorites(): Call<List<FavoriteDto>>

    @GET("api/favourites/check")
    fun checkFavorite(
        @Query("user_id") userId: Int,
        @Query("type") type: String,
        @Query("type_id") typeId: Int
    ): Call<FavoriteDto>

    @POST("api/favourites")
    fun addFavorite(@Body favorite: FavoriteDto): Call<com.example.smarttraffic.dto.FavoriteResponse>

    @DELETE("api/favourites/{id}")
    fun removeFavorite(@Path("id") id: Int): Call<Void>
}
