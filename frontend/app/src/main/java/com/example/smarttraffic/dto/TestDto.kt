package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể Test.
 */
data class TestDto(
    val id: Int,
    val name: String? = null,
    val total: Int? = null,
    var isCompleted: Boolean = false,
    var highSubScore: String? = null
)
