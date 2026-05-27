package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể Law.
 */
data class LawDto(
    val id: Int,
    val category_id: Int?,
    val image_url: String?,
    val title: String?,
    val description: String?,
    val rules: String?,
    val warnings: String?,
    val category_name: String?
)