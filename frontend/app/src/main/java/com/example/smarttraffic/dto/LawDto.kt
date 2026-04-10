package com.example.smarttraffic.dto

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