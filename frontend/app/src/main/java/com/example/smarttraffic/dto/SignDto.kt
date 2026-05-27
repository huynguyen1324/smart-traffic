package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể Sign.
 */
data class SignDto(
    val id: Int,
    val category_id: Int?,
    val image_url: String?,
    val title: String?,
    val sign_code: String?,
    val description: String?,
    val category_name: String?
)