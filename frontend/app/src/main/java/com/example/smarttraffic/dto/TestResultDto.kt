package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể TestResult.
 */
data class TestResultDto(
    val id: Int? = null,
    val user_id: Int?,
    val test_id: Int?,
    val created_at: String? = null, // Mới thêm
    val license: String,
    val total: Int,
    val correct: Int,
    val wrong: Int,
    val unanswered: Int
)
