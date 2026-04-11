package com.example.smarttraffic.dto

data class TestDto(
    val id: Int,
    val name: String? = null,
    val total: Int? = null,
    var isCompleted: Boolean = false,
    var highSubScore: String? = null
)
