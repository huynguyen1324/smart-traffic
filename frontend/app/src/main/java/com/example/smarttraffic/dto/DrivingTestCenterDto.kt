package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể DrivingTestCenter.
 */
data class DrivingTestCenterDto(
    val id: Int,
    val name: String,
    val address: String,
    val latitude: Double,
    val longitude: Double
)
