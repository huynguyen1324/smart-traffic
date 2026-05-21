package com.example.smarttraffic.network

import com.example.smarttraffic.dto.DrivingTestCenterDto
import retrofit2.Call
import retrofit2.http.GET

interface MapApiService {

    @GET("api/driving-test-centers")
    fun getDrivingTestCenters(): Call<List<DrivingTestCenterDto>>
}
