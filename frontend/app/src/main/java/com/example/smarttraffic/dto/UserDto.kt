package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể User.
 */
data class UserDto(
    val id: Int? = null,
    val full_name: String? = null,
    val email: String? = null,
    val phone: String? = null,
    val password: String? = null,
    val avatar_url: String? = null,
    val gender: String? = null,
    val learning_goal: String? = null
)
