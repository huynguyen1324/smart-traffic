package com.example.smarttraffic.network

import com.example.smarttraffic.dto.DrivingTestCenterDto
import retrofit2.Call
import retrofit2.http.GET

/**
 * Định nghĩa các cổng giao tiếp API Retrofit kết nối tới máy chủ Backend cho dịch vụ Map.
 */
interface MapApiService {

    @GET("api/driving-test-centers")
    fun getDrivingTestCenters(): Call<List<DrivingTestCenterDto>>
}
