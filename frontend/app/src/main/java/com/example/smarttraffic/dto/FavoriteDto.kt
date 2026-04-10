package com.example.smarttraffic.dto

data class FavoriteDto(
    val id: Int? = null,
    val user_id: Int,
    val type: String, // 'Sign', 'Law', 'Scenario'
    val type_id: Int
)
