package com.example.smarttraffic.dto

/**
 * Data Transfer Object (DTO) dùng để ánh xạ và truyền tải dữ liệu của thực thể MapSearchLogRequest.
 */
data class MapSearchLogRequest(
    val center_id: Int?,
    val search_query: String?
)
