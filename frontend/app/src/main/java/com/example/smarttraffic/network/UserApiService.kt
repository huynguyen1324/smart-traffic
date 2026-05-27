package com.example.smarttraffic.network

import com.example.smarttraffic.dto.UserDto
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.PUT
import retrofit2.http.Path

/**
 * Định nghĩa các cổng giao tiếp API Retrofit kết nối tới máy chủ Backend cho dịch vụ User.
 */
data class RegisterResponse(val message: String, val id: Int)
/**
 * Định nghĩa các cổng giao tiếp API Retrofit kết nối tới máy chủ Backend cho dịch vụ User.
 */
data class UpdateResponse(val message: String)
/**
 * Định nghĩa các cổng giao tiếp API Retrofit kết nối tới máy chủ Backend cho dịch vụ User.
 */
data class LoginRequest(val identifier: String, val password: String)

/**
 * Định nghĩa các cổng giao tiếp API Retrofit kết nối tới máy chủ Backend cho dịch vụ User.
 */
interface UserApiService {
    @GET("api/users")
    fun getAllUsers(): Call<List<UserDto>>

    @POST("api/users/login")
    fun loginUser(@Body request: LoginRequest): Call<UserDto>

    @GET("api/users/{id}")
    fun getUserById(@Path("id") id: Int): Call<UserDto>

    @POST("api/users")
    fun registerUser(@Body user: UserDto): Call<RegisterResponse>

    @PUT("api/users/{id}")
    fun updateUser(@Path("id") id: Int, @Body user: UserDto): Call<UpdateResponse>

    @retrofit2.http.DELETE("api/users/{id}")
    fun deleteUser(@Path("id") id: Int): Call<UpdateResponse>
}
